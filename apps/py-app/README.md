# TTS Backend

A FastAPI-based Text-to-Speech backend application using Microsoft Edge TTS.

## Features

- 🎙️ High-quality Text-to-Speech conversion using Microsoft Edge TTS
- 🎵 Multiple voice options with different languages and genders
- 🔊 Configurable speech rate and volume
- 📡 RESTful API with OpenAPI documentation
- 🚀 Fast and async processing
- 🐳 Docker support for easy deployment
- 📊 Health check endpoints

## API Endpoints

- `GET /api/` - API root information
- `GET /api/voices` - List available TTS voices
- `POST /api/tts` - Convert text to speech (returns WAV file)
- `POST /api/tts/stream` - Convert text to speech (returns MP3 stream)
- `GET /api/health` - Health check endpoint

## Quick Start

### Using uv (recommended)

```bash
# Install dependencies
uv sync

# Run development server
uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Using pip

```bash
# Install dependencies
pip install -r requirements.txt

# Run development server
python main.py
```

### Using Docker

```bash
# Build the image
docker build -t tts-backend .

# Run the container
docker run -p 8000:8000 tts-backend
```

## Usage Examples

### Basic TTS Request

```bash
curl -X POST "http://localhost:8000/api/tts" \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello, world!"}' \
  --output speech.wav
```

### Advanced TTS Request

```bash
curl -X POST "http://localhost:8000/api/tts" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, world!",
    "voice": "en-US-AriaNeural",
    "rate": "+20%",
    "volume": "+10%"
  }' \
  --output speech.wav
```

### Get Available Voices

```bash
curl "http://localhost:8000/api/voices"
```

## API Documentation

Once the server is running, visit:
- http://localhost:8000/docs - Interactive API documentation (Swagger UI)
- http://localhost:8000/redoc - Alternative API documentation

## Voice Options

The API supports multiple voices from Microsoft Edge TTS, including:
- Various languages (English, Spanish, French, German, etc.)
- Different genders (Male, Female, Neutral)
- Regional variations

Use the `/voices` endpoint to get the complete list of available voices.

## Configuration

The application can be configured through environment variables:

- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 8000)
- `LOG_LEVEL`: Logging level (default: info)

## Dependencies

- FastAPI: Web framework
- edge-tts: Microsoft Edge TTS engine
- pydub: Audio processing
- aiofiles: Async file handling
- uvicorn: ASGI server
- gunicorn: Production WSGI server

## Development

### Running Tests

```bash
uv run pytest
```

### Code Formatting

```bash
uv run black .
uv run isort .
```

### Linting

```bash
uv run flake8 .
```

## License

This project is licensed under the MIT License.