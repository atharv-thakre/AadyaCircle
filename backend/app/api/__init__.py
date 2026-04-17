# app/api/__init__.py

from fastapi import APIRouter

from app.api.ai_route import router as ai_router
from app.api.login_route import router as login_router
from app.api.job_route import router as job_router
from app.api.freelancer_routes import router as freelancer_router


api_router = APIRouter()

# Include routers
api_router.include_router(ai_router)
api_router.include_router(login_router)
api_router.include_router(job_router)
api_router.include_router(freelancer_router)
