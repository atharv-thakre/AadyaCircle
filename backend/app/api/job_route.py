# app/routes/jobs.py

from fastapi import APIRouter, Depends
from app.auth.deps import get_current_user
from typing import List

from app.schemas.set_03 import JobResponse, JobCreate
from app.database.service import get_all_jobs, create_job

router = APIRouter(prefix="/jobs", tags=["Jobs"])


from typing import List
from fastapi import APIRouter, Depends
from app.schemas.set_03 import JobCreate, JobResponse
from app.database.service import create_job, get_all_jobs
from app.auth.deps import get_current_user  # adjust path if needed

router = APIRouter(prefix="/jobs", tags=["Jobs"])


@router.get("/show", response_model=List[JobResponse])
def fetch_all_jobs(current_user: dict = Depends(get_current_user)):
    return get_all_jobs()


@router.post("/create", response_model=JobResponse)
def create_job_api(
    job: JobCreate,
    current_user: dict = Depends(get_current_user)
):
    return create_job(job, current_user["id"])

