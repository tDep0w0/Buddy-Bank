import supabase
import os
from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException
import json
import requests


load_dotenv()



#-------------GETTING URL IMAGE--------------#

dataBase = supabase.create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    
    )  

def get_signed_image_url(path: str, bucket: str = "Receipts", expires_in: int = 60):
    res = dataBase.storage.from_(bucket).create_signed_url(
        path,
        expires_in
    )
    return res["signedURL"]

#-------------ANALYZING THE RECEIPT--------------#

def analyze_receipt(image_path: str) -> dict:
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise RuntimeError("Missing OPENROUTER_API_KEY")

    image_url = get_signed_image_url(image_path)

    payload = {
        "model": "openai/gpt-4o-mini",  
        "messages": [
            {
                "role": "system",
                "content": "You analyze receipts and return JSON only."
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": (
                            "Analyze the receipt and return a JSON dictionary where "
                            "keys are item names and values are prices. "
                            "Return ONLY valid JSON."
                        )
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image_url
                        }
                    }
                ]
            }
        ]
    }

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost",
            "X-Title": "Receipt Analyzer"
        },
        json=payload,
        timeout=60
    )

    response.raise_for_status()
    data = response.json()

    raw_text = data["choices"][0]["message"]["content"]

    try:
        return json.loads(raw_text)
    except json.JSONDecodeError:
        raise ValueError(f"Model returned invalid JSON:\n{raw_text}")

