import supabase
import os
from fastapi import FastAPI, Header, HTTPException, APIRouter, Query
from dotenv import load_dotenv
import json
import re
import requests

load_dotenv()
dataBase = supabase.create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    
    )


def authentication(email: str, password: str):
    try:
        supabase.auth.sign_in_with_password({
            "email": email,
            "password": password,
        })
        return True
    except Exception:
        return False

    
def search_user(user_id: str,
                  q: str = Query(..., min_length = 1),  
                  table: str = "user"):
    query = q.lower()
    users = (
        dataBase
        .table(table)
        .select("id, realname, username, image_url")
        .or_(
            f"username.ilike.%{query}%,realname.ilike.%{query}%"
        )
        .limit(20)
        .execute()
        .data or []
    )

    friends = (
        dataBase
        .table("friend")
        .select("user2_id, user1_id")
        .eq("user1_id", user_id)
        .execute()
        .data or []
    )

    friend_ids = set()
    for f in friends:
        friend_ids.add(f["user1_id"])
        friend_ids.add(f["user2_id"])
    friend_ids.discard(user_id)

    requests = (
        dataBase
        .table("friend_request")
        .select("sender_id, receiver_id")
        .eq("sender_id", user_id)
        .execute()
        .data or []
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


    