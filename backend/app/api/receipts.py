from fastapi import APIRouter, Header, HTTPException, Query
from app.services.ai_service import analyze_receipt
from supabase import create_client
import os

router = APIRouter()

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_ROLE_KEY")  
)

@router.post("/analyze")
async def get_receipt_analysis(
    image_url: str,
    authorization: str = Header(...)
):
    #Extract token
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid Authorization header")

    jwt = authorization.replace("Bearer ", "")

    #Verify JWT with Supabase
    try:
        user_response = supabase.auth.get_user(jwt)
        user = user_response.user
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    #Token is valid → proceed
    return analyze_receipt(image_url)
