#app/database/service.py
import hashlib
from app.schemas.set_03 import JobCreate
from app.schemas.set_04 import FreelancerCreate
from app.database.models import User , Job , Freelancer

from app.database.db import SessionLocal
from fastapi import HTTPException
from app.database.getuser import get_user , get_user_v2

def simple_hash(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

def verify_hash(password: str, stored_hash: str) -> bool:
    return simple_hash(password) == stored_hash

def create_user(email: str, password: str, handle: str, role :str ,name: str = None, phone: str = None ) :
    with SessionLocal() as db:
        user = User(
            email=email,
            handle = handle.strip().lower(),
            name=name,
            phone=phone,
            password_hash=simple_hash(password),
            role=role
        )
        db.add(user)
        db.commit()
        return True
    
def authenticate_user(password: str , id : int = None,email : str = None , handle: str =None):
    with SessionLocal() as db:
        if id :
            user = get_user(id=id)
        elif email:
            user = get_user_v2(email=email)
        elif handle:
            user = get_user_v2(handle=handle)

        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        if not verify_hash(password, user["password_hash"]):
            raise HTTPException(status_code=401, detail="Invalid password")
        
        return user
    
def activate_user(id: int, status: bool):
    with SessionLocal() as db:
        user = get_user(id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        db.query(User).filter(User.id == id).update({"is_active": status})
        db.commit()
        return {"Status": "Success"}

def suspend_user(id: int, status: bool):
    with SessionLocal() as db:
        user = get_user(id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        db.query(User).filter(User.id == id).update({"is_suspended": status})
        db.commit()
        return {"Status": "Success"}

def email_verified(id: int, status: bool):
    with SessionLocal() as db:
        user = get_user(id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        db.query(User).filter(User.id == id).update({"is_email_verified": status})
        db.commit()
        return {"Status": "Success"}
    
def phone_verified(id: int, status: bool):
    with SessionLocal() as db:
        user = get_user(id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        db.query(User).filter(User.id == id).update({"is_phone_verified": status})
        db.commit()
        return {"Status": "Success"}
    
def set_bio(id: int, bio: str):
    with SessionLocal() as db:
        user = get_user(id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        db.query(User).filter(User.id == id).update({"bio": bio})
        db.commit()
        return {"Status": "Success"}

def set_avatar(id: int, avatar_url: str):
    with SessionLocal() as db:
        user = get_user(id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        db.query(User).filter(User.id == id).update({"avatar_url": avatar_url})
        db.commit()
        return {"Status": "Success"}
    

# app/crud/job.py

def create_job(job_data: JobCreate, id: int):
    with SessionLocal() as db:

        job = Job(
            user_id=id,
            title=job_data.title,
            description=job_data.description,
            job_type=job_data.job_type,
            skills=job_data.skills,
            company=job_data.company,
            location=job_data.location,
            salary=job_data.salary,
        )

        db.add(job)
        db.commit()
        db.refresh(job)

        return job

def get_all_jobs():
    with SessionLocal() as db:
        jobs = db.query(Job).order_by(Job.posted_at.desc()).all()
        return jobs


def create_freelancer(freelancer_data : FreelancerCreate, id: int):
    with SessionLocal() as db:

        freelancer = Freelancer(
            user_id=id,
            title=freelancer_data.title,
            bio=freelancer_data.bio,
            skills=freelancer_data.skills,
            hourly_rate=freelancer_data.hourly_rate,
            expected_salary=freelancer_data.expected_salary,
        )

        db.add(freelancer)
        db.commit()
        db.refresh(freelancer)

        return freelancer
     

def get_all_freelancers():
    with SessionLocal() as db:
        freelancers = db.query(Freelancer).order_by(Freelancer.posted_at.desc()).all()
        return freelancers