from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from api.query import router as query_router
from api.youtube import router as youtube_router

import os
from pathlib import Path

# Load environment variables from .env file
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

# Create the FastAPI app instance
app = FastAPI(
    title="StatSmash API",
    description="NBA RAG engine powered by ColBERT",
    version="1.0.0"
)

# Debug: verify env loading
print(f"DEBUG: YOUTUBE_API_KEY detected: {'YES' if os.getenv('YOUTUBE_API_KEY') else 'NO'}")


# Allow the React frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# A simple health-check route to confirm the server is alive
@app.get("/")
def root():
    return {"status": "🏀 StatSmash API is live"}

@app.get("/health")
def health():
    return {"status": "ok", "engine": "ColBERT RAG", "version": "1.0.0"}

# Mount routers
app.include_router(query_router)
app.include_router(youtube_router)
