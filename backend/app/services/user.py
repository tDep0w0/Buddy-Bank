from app.core.config import supabase


async def authentication(email: str, password: str):
    try:
        supabase.auth.sign_in_with_password(
            {
                "email": email,
                "password": password,
            }
        )
        return True
    except Exception:
        return False


async def search_user(user_id: str, q: str, table: str = "user"):
    query = q.lower()
    users = (
        supabase.table(table)
        .select("id, realname, username, image_url")
        .or_(f"username.ilike.%{query}%,realname.ilike.%{query}%")
        .limit(20)
        .execute()
        .data
        or []
    )

    friends = (
        supabase.table("friend")
        .select("user1_id, user2_id")
        .or_(f"user1_id.eq.{user_id},user2_id.eq.{user_id}")
        .execute()
        .data
        or []
    )

    friend_ids = set()
    for f in friends:
        friend_ids.add(f["user1_id"])
        friend_ids.add(f["user2_id"])
    friend_ids.discard(user_id)

    requests = (
        supabase.table("friend_request")
        .select("sender_id, receiver_id")
        .eq("is_pending", True)
        .or_(f"sender_id.eq.{user_id},receiver_id.eq.{user_id}")
        .execute()
        .data
        or []
    )

    requested_ids = set()
    for r in requests:
        requested_ids.add(r["sender_id"])
        requested_ids.add(r["receiver_id"])
    requested_ids.discard(user_id)

    for user in users:
        uid = user["id"]

        if uid in friend_ids:
            user["status"] = "friend"
        elif uid in requested_ids:
            user["status"] = "requested"
        else:
            user["status"] = "normal"

    return users
