"""
API routes for the TTS backend application.
"""
import asyncio
import tempfile
import os
from typing import Optional
from fastapi import APIRouter, HTTPException, Response
from pydantic import BaseModel
import edge_tts
import aiofiles
from pydub import AudioSegment
import io

router = APIRouter()

class TTSRequest(BaseModel):
    text: str
    voice: Optional[str] = "en-US-AriaNeural"
    rate: Optional[str] = "+0%"
    volume: Optional[str] = "+0%"

class VoiceInfo(BaseModel):
    name: str
    short_name: str
    gender: str
    locale: str

@router.get("/")
async def root():
    """Root endpoint for API."""
    return {"message": "TTS API is running", "version": "1.0.0"}

@router.get("/voices")
async def get_voices():
    """Get available TTS voices."""
    try:
        voices = await edge_tts.list_voices()
        voice_list = []
        for voice in voices:
            voice_list.append(VoiceInfo(
                name=voice["FriendlyName"],
                short_name=voice["ShortName"],
                gender=voice["Gender"],
                locale=voice["Locale"]
            ))
        return {"voices": voice_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get voices: {str(e)}")

@router.post("/tts")
async def text_to_speech(request: TTSRequest):
    """Convert text to speech and return audio file."""
    try:
        if not request.text.strip():
            raise HTTPException(status_code=400, detail="Text cannot be empty")
        
        # Create a temporary file to store the audio
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
            temp_path = temp_file.name
        
        try:
            # Generate speech using edge-tts
            communicate = edge_tts.Communicate(
                text=request.text,
                voice=request.voice,
                rate=request.rate,
                volume=request.volume
            )
            
            # Save to temporary file
            await communicate.save(temp_path)
            
            # Read the audio file
            async with aiofiles.open(temp_path, "rb") as audio_file:
                audio_data = await audio_file.read()
            
            # Convert to WAV format using pydub for better compatibility
            audio = AudioSegment.from_mp3(io.BytesIO(audio_data))
            wav_buffer = io.BytesIO()
            audio.export(wav_buffer, format="wav")
            wav_data = wav_buffer.getvalue()
            
            # Clean up temporary file
            os.unlink(temp_path)
            
            return Response(
                content=wav_data,
                media_type="audio/wav",
                headers={
                    "Content-Disposition": "attachment; filename=speech.wav",
                    "Content-Length": str(len(wav_data))
                }
            )
            
        except Exception as e:
            # Clean up temporary file in case of error
            if os.path.exists(temp_path):
                os.unlink(temp_path)
            raise e
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS conversion failed: {str(e)}")

@router.post("/tts/stream")
async def text_to_speech_stream(request: TTSRequest):
    """Convert text to speech and return streaming audio."""
    try:
        if not request.text.strip():
            raise HTTPException(status_code=400, detail="Text cannot be empty")
        
        # Create a temporary file to store the audio
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
            temp_path = temp_file.name
        
        try:
            # Generate speech using edge-tts
            communicate = edge_tts.Communicate(
                text=request.text,
                voice=request.voice,
                rate=request.rate,
                volume=request.volume
            )
            
            # Save to temporary file
            await communicate.save(temp_path)
            
            # Read and stream the audio file
            async with aiofiles.open(temp_path, "rb") as audio_file:
                audio_data = await audio_file.read()
            
            # Clean up temporary file
            os.unlink(temp_path)
            
            return Response(
                content=audio_data,
                media_type="audio/mpeg",
                headers={
                    "Content-Disposition": "inline; filename=speech.mp3",
                    "Content-Length": str(len(audio_data))
                }
            )
            
        except Exception as e:
            # Clean up temporary file in case of error
            if os.path.exists(temp_path):
                os.unlink(temp_path)
            raise e
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS streaming failed: {str(e)}")

@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "TTS API"}