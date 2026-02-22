from fastapi import APIRouter, Header, HTTPException, Query
from app.services.user import search_user
from app.core.config import supabase

router = APIRouter()


@router.post("/search")
async def search_endpoint(
    q: str = Query(..., min_length=1), authorization: str = Header(...)
):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid Authorization header")

    jwt = authorization.replace("Bearer ", "")

    try:
        user_response = supabase.auth.get_user(jwt)
        user_id = user_response.user.id
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return search_user(user_id=user_id, q=q)
