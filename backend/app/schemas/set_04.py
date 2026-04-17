from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# -------------------------
# CREATE MODEL
# -------------------------
class FreelancerCreate(BaseModel):
    title: str
    bio: Optional[str] = None

    skills: Optional[List[str]] = None
    hourly_rate: Optional[int] = None
    expected_salary: Optional[int] = None


# -------------------------
# RESPONSE MODEL
# -------------------------
class FreelancerResponse(BaseModel):
    ref: int
    user_id: int

    title: str
    bio: Optional[str]

    skills: Optional[List[str]]
    hourly_rate: Optional[int]
    expected_salary: Optional[int]

    posted_at: datetime

    class Config:
        from_attributes = True