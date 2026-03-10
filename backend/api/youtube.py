from fastapi import APIRouter, HTTPException
import httpx
import os
from pydantic import BaseModel

router = APIRouter()

# Response model for our frontend
class YTStatsResponse(BaseModel):
    subscriberCount: str
    videoCount: str

@router.get("/youtube/stats", response_model=YTStatsResponse)
async def get_youtube_stats():
    api_key = os.getenv("YOUTUBE_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="YouTube API Key not configured in .env")

    # YouTube API URL (targeting your handle specifically)
    url = "https://www.googleapis.com/youtube/v3/channels"
    params = {
        "part": "statistics",
        "forHandle": "@notakid3106",
        "key": api_key
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, params=params)
            response.raise_for_status()
            data = response.json()

            if not data.get("items"):
                # Fallback in case handle lookup fails (rare)
                return YTStatsResponse(subscriberCount="--", videoCount="--")

            stats = data["items"][0]["statistics"]
            
            return YTStatsResponse(
                subscriberCount=stats.get("subscriberCount", "0"),
                videoCount=stats.get("videoCount", "0")
            )
        except Exception as e:
            print(f"Error fetching YT stats: {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch YouTube stats")
