from fastapi import APIRouter
from app.services.ai_service import analyze_receipt

router = APIRouter()


@router.get("/analyze")
async def get_receipt_analysis():
    return analyze_receipt("receipt01.jpg")
