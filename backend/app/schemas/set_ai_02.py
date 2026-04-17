from pydantic import BaseModel
from typing import List, Dict


class TherapistRequest(BaseModel):
    message: str
    history: List[Dict[str, str]] = []


class TherapistResponse(BaseModel):
    reply: str
    mood: str
    tools: List[str]

class AIRequest(BaseModel):
    message: str

class SentimentRequest(BaseModel):
    question_1: str
    question_2: str
    question_3: str
    question_4: str
    question_5: str
    question_6: str

class EmotionResponse(BaseModel):
    anger: int
    joy: int
    sadness: int
    fear: int
    anxiety: int
    frustration: int
    mood: str
    Stress_Anxiety: str
    LevelPressure: str
    Mood_History: str
    Motivation_Level: str
    recommendations: str