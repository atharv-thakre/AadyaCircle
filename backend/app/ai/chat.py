#app/ai/ai.py

def process_chat(message: str, history: list):
    # 1. safety first
    if check_crisis(message):
        return {
            "reply": "I'm really sorry you're feeling this way. You're not alone. Please consider reaching out to someone you trust or a helpline.",
            "tools": ["helpline"]
        }

    # 2. generate reply
    reply = generate_reply(message, history)

    # 3. simple tool suggestion (optional lightweight logic)
    tools = suggest_tools(message)

    return {
        "reply": reply,
        "tools": tools
    }


def generate_reply(message: str, history: list) -> str:

    prompt = f"""
You are a calm, empathetic AI therapist.

Guidelines:
- Be supportive and non-judgmental
- Do not give harmful advice
- Keep responses human and warm
- Ask gentle follow-up questions

Conversation history:
{history}

User: {message}

Respond naturally.
"""

    # TODO: replace with actual LLM
    return "That sounds really difficult. I'm here with you — do you want to share more about what's making you feel this way?"


def suggest_tools(message: str):
    text = message.lower()

    if "anxious" in text or "panic" in text:
        return ["breathing_exercise"]

    if "sad" in text or "lonely" in text:
        return ["journaling"]

    if "angry" in text or "frustrated" in text:
        return ["grounding"]

    return []


def check_crisis(text: str):
    text = text.lower()

    triggers = [
        "suicide",
        "kill myself",
        "end my life",
        "want to die"
    ]

    for t in triggers:
        if t in text:
            return True

    return False