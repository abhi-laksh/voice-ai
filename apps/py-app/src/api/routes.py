"""
API routes for the FastAPI backend
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import datetime

# Create router instance
router = APIRouter()

# Pydantic models
class User(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime.datetime

class UserCreate(BaseModel):
    name: str
    email: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None

# In-memory storage for demo purposes
users_db = [
    User(
        id=1,
        name="John Doe",
        email="john@example.com",
        created_at=datetime.datetime.now()
    ),
    User(
        id=2,
        name="Jane Smith",
        email="jane@example.com",
        created_at=datetime.datetime.now()
    )
]

@router.get("/users", response_model=List[User])
async def get_users():
    """Get all users"""
    return users_db

@router.get("/users/{user_id}", response_model=User)
async def get_user(user_id: int):
    """Get a specific user by ID"""
    user = next((user for user in users_db if user.id == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/users", response_model=User)
async def create_user(user: UserCreate):
    """Create a new user"""
    new_id = max(user.id for user in users_db) + 1 if users_db else 1
    new_user = User(
        id=new_id,
        name=user.name,
        email=user.email,
        created_at=datetime.datetime.now()
    )
    users_db.append(new_user)
    return new_user

@router.put("/users/{user_id}", response_model=User)
async def update_user(user_id: int, user_update: UserUpdate):
    """Update a user"""
    user = next((user for user in users_db if user.id == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user_update.name is not None:
        user.name = user_update.name
    if user_update.email is not None:
        user.email = user_update.email
    
    return user

@router.delete("/users/{user_id}")
async def delete_user(user_id: int):
    """Delete a user"""
    user_index = next((i for i, user in enumerate(users_db) if user.id == user_id), None)
    if user_index is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    deleted_user = users_db.pop(user_index)
    return {"message": f"User {deleted_user.name} deleted successfully"}

@router.get("/hello")
async def hello():
    """Simple hello endpoint"""
    return {"message": "Hello from FastAPI!", "timestamp": datetime.datetime.now()}