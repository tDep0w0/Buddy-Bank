import re
import json
import requests
from app.core.config import settings, supabase


def get_signed_image_url(path: str, bucket: str = "receipts", expires_in: int = 60):
    res = supabase.storage.from_(bucket).create_signed_url(path, expires_in)
    return res["signedURL"]


def safe_json_parse(text: str) -> dict:
    array_match = re.search(r"\[[\s\S]*\]", text)
    if array_match:
        return json.loads(array_match.group(0))
    obj_match = re.search(r"\{[\s\S]*\}", text)
    if obj_match:
        return json.loads(obj_match.group(0))
    raise ValueError("No valid JSON found")


def analyze_receipt(image_path: str) -> dict:
    image_url = get_signed_image_url(image_path)

    payload = {
        "model": "openai/gpt-4o-mini",
        "messages": [
            {"role": "system", "content": "You analyze receipts and return JSON only."},
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": 'Analyze and return ONLY valid JSON: [{"item": "NAME", "price": NUMBER}]',
                    },
                    {"type": "image_url", "image_url": {"url": image_url}},
                ],
            },
        ],
    }

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={"Authorization": f"Bearer {settings.OPENROUTER_API_KEY}"},
        json=payload,
        timeout=60,
    )
    response.raise_for_status()
    raw_text = response.json()["choices"][0]["message"]["content"]
    return safe_json_parse(raw_text)
