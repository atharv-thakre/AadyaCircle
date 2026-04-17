# app/schemas/job.py

from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# -------------------------
# CREATE MODEL
# -------------------------
class JobCreate(BaseModel):
    title: str
    description: str

    job_type: Optional[str] = None
    skills: Optional[List[str]] = None
    company: Optional[str] = None

    location: Optional[str] = None
    salary: Optional[int] = None


# -------------------------
# RESPONSE MODEL
# -------------------------
class JobResponse(BaseModel):
    ref: int
    user_id: Optional[int]

    title: str
    description: str

    job_type: Optional[str]
    skills: Optional[List[str]]
    company: Optional[str]

    location: Optional[str]
    salary: Optional[int]

    posted_at: datetime

    class Config:
        from_attributes = True