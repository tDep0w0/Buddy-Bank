from fastapi import APIRouter, Header, HTTPException, Query, Depends
from app.services.user import search_user
import jwt
from app.db.models import t_friend, User, UserGroup, Group
from app.db.deps import get_db
from sqlalchemy import select
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import supabase

router = APIRouter(tags=["users"])


@router.post("/")
async def search(q: str = Query(..., min_length=1), authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid Authorization header")

    jwt = authorization.replace("Bearer ", "")

    try:
        user_response = supabase.auth.get_user(jwt)
        if not user_response or not user_response.user:
            raise HTTPException(status_code=401, detail="Invalid or expired token")
        user_id = user_response.user.id
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return search_user(user_id=user_id, q=q)


@router.post("/")
async def add_friend(token: str, sender_id: str, db: AsyncSession = Depends(get_db)):
    user_id = jwt.decode(token, options={"verify_signature": False})
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user_id == sender_id:
        raise HTTPException(status_code=400, detail="You cannot add yourself")

    u1, u2 = sorted([user_id, sender_id])

    async with db.begin():
        stmt = select(t_friend).where(
            t_friend.c.user1_id == u1, t_friend.c.user2_id == u2
        )
        result = await db.execute(stmt)
        if result.scalar_one_or_none():
            raise HTTPException(status_code=400, detail="You are already friends")
        await db.execute(t_friend.insert().values(user1_id=u1, user2_id=u2))

    return {"message": "Friend added successfully"}


@router.post("/")
async def create_group(
    token: str,
    member_ids: list[str] | set[str],
    db: AsyncSession = Depends(get_db),
    image_url: str = "",
    group_name: str = "",
):
    groupId = uuid.uuid4()
    user_id = jwt.decode(token, options={"verify_signature": False})
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    member_ids = set(member_ids)
    member_ids.add(user_id)

    group = Group(
        id=groupId,
        name=group_name,
        image_url=image_url,
    )
    db.add(group)

    for id in member_ids:
        db.add(UserGroup(user_id=id, group_id=groupId))

    await db.commit()
    return {"message": "Group created successfully"}


@router.post("/")
async def update_group(
    group_id: str,
    name: str,
    image_url: str,
    member_ids: list[str] | set[str],
    db: AsyncSession = Depends(get_db),
):
    member_ids = set(member_ids)

    result = await db.execute(select(Group).where(Group.id == group_id))
    group = result.scalar_one_or_none()

    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    group.name = name
    group.image_url = image_url

    result = await db.execute(select(UserGroup).where(UserGroup.group_id == group_id))
    members = result.scalars().all()

    for member in members:
        await db.delete(member)

    for id in member_ids:
        db.add(UserGroup(user_id=id, group_id=group_id))

    await db.commit()
    return {"message": "Group updated successfully"}
