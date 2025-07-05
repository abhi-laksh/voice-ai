# Python Backend (py-app)

A FastAPI-based backend service for the monorepo project.

## 🚀 Features

- **FastAPI** - Modern, fast web framework for building APIs
- **uv** - Fast Python package manager
- **Gunicorn** - WSGI HTTP server for production
- **Docker** - Containerized deployment
- **CORS** - Cross-Origin Resource Sharing configured
- **Health Check** - Built-in health check endpoint

## 📋 Prerequisites

- Python 3.11+
- uv package manager
- Docker (optional, for containerized deployment)

## 🛠️ Installation

### Using uv (Recommended)

```bash
# Install uv if not already installed
pip install uv

# Install dependencies
uv sync

# Activate virtual environment
source .venv/bin/activate  # Linux/Mac
# or
.venv\Scripts\activate     # Windows
```

### Using pip

```bash
pip install -r requirements.txt
```

## 🏃 Running the Application

### Development Mode

```bash
# Using uv
uv run python main.py

# Or with uvicorn directly
uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode

```bash
# Using Gunicorn
uv run gunicorn --config gunicorn_config.py main:app

# Or with custom configuration
uv run gunicorn --bind 0.0.0.0:8000 --workers 4 --worker-class uvicorn.workers.UvicornWorker main:app
```

## 🐳 Docker

### Build and Run

```bash
# Build the Docker image
docker build -t py-app .

# Run the container
docker run -p 8000:8000 py-app
```

### Using Docker Compose

```bash
# From the root directory
docker-compose up py-app
```

## 📚 API Endpoints

### Health Check
- `GET /health` - Application health status

### Users API
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Utility
- `GET /api/hello` - Simple hello endpoint

## 📖 API Documentation

When the application is running, you can access:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

## 🧪 Testing

```bash
# Run tests
uv run pytest

# Run tests with coverage
uv run pytest --cov=src
```

## 🔧 Development

### Code Formatting

```bash
# Format code with black
uv run black src/

# Sort imports
uv run isort src/

# Lint code
uv run flake8 src/
```

### Environment Variables

Create a `.env` file in the project root:

```env
# Optional environment variables
DEBUG=true
LOG_LEVEL=info
```

## 📁 Project Structure

```
py-app/
├── src/
│   └── api/
│       ├── __init__.py
│       └── routes.py
├── main.py
├── gunicorn_config.py
├── pyproject.toml
├── Dockerfile
└── README.md
```

## 🌐 CORS Configuration

The application is configured to allow requests from:
- `http://localhost:3000` (Next.js development server)
- `http://web-app:3000` (Docker container)

## 🔗 Integration

This backend is designed to work with the Next.js frontend (`web-app`) in the monorepo structure. Both applications can be run together using Docker Compose from the root directory.