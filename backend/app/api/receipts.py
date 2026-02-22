from fastapi import APIRouter, Header, HTTPException
from app.services.ai_service import analyze_receipt
from app.core.config import supabase

router = APIRouter(tags=["receipts"])


@router.post("/")
async def get_receipt_analysis(image_url: str):
    # # Extract token
    # if not authorization.startswith("Bearer "):
    #     raise HTTPException(status_code=401, detail="Invalid Authorization header")

    # jwt = authorization.replace("Bearer ", "")

    # # Verify JWT with Supabase
    # try:
    #     user_response = supabase.auth.get_user(jwt)
    #     user = user_response.user
    # except Exception:
    #     raise HTTPException(status_code=401, detail="Invalid or expired token")

    # Token is valid → proceed
    return analyze_receipt(image_url)
