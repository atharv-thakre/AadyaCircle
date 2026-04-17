# app/routes/jobs.py

from fastapi import APIRouter, Depends
from app.auth.deps import get_current_user
from typing import List

from app.schemas.set_03 import JobResponse, JobCreate
from app.database.service import get_all_jobs, create_job

router = APIRouter(prefix="/jobs", tags=["Jobs"])


from typing import List
from fastapi import APIRouter, Depends
from app.schemas.set_04 import FreelancerCreate, FreelancerResponse
from app.database.service import create_freelancer, get_all_freelancers
from app.auth.deps import get_current_user  # adjust path if needed

from fastapi import APIRouter, Depends
from typing import List


router = APIRouter(prefix="/freelancer", tags=["Freelancer"])


# -------------------------
# GET ALL FREELANCERS
# -------------------------
@router.get("/show", response_model=List[FreelancerResponse])
def fetch_all_freelancers(current_user: dict = Depends(get_current_user)):
    return get_all_freelancers()


# -------------------------
# CREATE FREELANCER PROFILE
# -------------------------
@router.post("/create", response_model=FreelancerResponse)
def create_freelancer_api(
    freelancer: FreelancerCreate,
    current_user: dict = Depends(get_current_user)
):
    return create_freelancer(freelancer, current_user["id"])

