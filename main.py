import supabase
import os
from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException
import json
import re
import requests


load_dotenv()
app = FastAPI()



#-------------GETTING URL IMAGE--------------#

dataBase = supabase.create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    
    )  

def get_signed_image_url(path: str,
                          bucket: str = "receipts", 
                          expires_in: int = 60):
    res = dataBase.storage.from_(bucket).create_signed_url(
        path,
        expires_in
    )
    return res["signedURL"]

#-------------ANALYZING THE RECEIPT--------------#

def analyze_receipt(image_path: str) -> dict:

    def safe_json_parse(text: str) -> dict:
        array_match = re.search(r"\[[\s\S]*\]", text)
        if array_match:
            return json.loads(array_match.group(0))

        # Fallback: single object
        obj_match = re.search(r"\{[\s\S]*\}", text)
        if obj_match:
            return json.loads(obj_match.group(0))

        raise ValueError("No valid JSON found")
        

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
                            "Analyze the receipt and return ONLY valid JSON in the following format:\n"
                            "[\n"
                            "  { \"item\": \"ITEM_NAME\", \"price\": NUMBER }\n"
                            "]\n"
                            "One object per receipt item. No extra text."
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
        return safe_json_parse(raw_text)
    except json.JSONDecodeError:
        raise ValueError(f"Model returned invalid JSON:\n{raw_text}")


@app.get("/receipt")
def get_receipt():
    return analyze_receipt("receipt01.jpg")





