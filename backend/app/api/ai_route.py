# api/ai_route.py

import ollama ,json
from app.ai.refine import get_valid_json
from app.auth.deps import get_current_user
from fastapi import APIRouter, Depends
from app.schemas.models import AIRequest
from app.schemas.set_ai_02 import EmotionResponse ,SentimentRequest, AIRequest
from app.ai.memory_store import get_history, add_message
from app.ai.prompt import SYSTEM_PROMPT
from app.ai.sentiment import generate_sentiment


router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/therapist/chat")
def ai_execute(req: AIRequest, user: str = Depends(get_current_user)):
    uid = user["uid"]

    history = get_history(uid)

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        *history,
        {"role": "user", "content": req.message}
    ]

    llm_response = ollama.chat(
        model="qwen2.5:7b",
        messages=messages
    )

    output = llm_response["message"]["content"]

    # store both sides
    add_message(uid, "user", req.message)
    add_message(uid, "assistant", output)

    return {
        "response": output
    }

@router.post("/sentiment")
def sentiment_route(
    data: SentimentRequest,
    user: str = Depends(get_current_user)
):
    msg = f"""
    question_1: {data.question_1}
    question_2: {data.question_2}
    question_3: {data.question_3}
    question_4: {data.question_4}
    question_5: {data.question_5}
    question_6: {data.question_6}
    """

    ai_response = generate_sentiment(msg)

    cleaned = get_valid_json(ai_response)

    return cleaned