# api/admin.py

from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from app.schemas.models import AdminCreateUser, AdminUpdateRequest
from control import admin as admin
from app.auth.deps import require_role


router = APIRouter(prefix="/admin", tags=["Admin"])

#===============================ADMIN ROUTES==============================


@router.post("/users")
def create_user_route(
    data: AdminCreateUser,
    current_user: dict = Depends(require_role("admin"))
):
    return admin.create_user(data.dict())

@router.get("/users")
def list_users_route(current_user: dict = Depends(require_role("admin"))):
    return admin.get_all_users()

@router.get("/users/{uid}")   
def get_user_route(uid: int, current_user: dict = Depends(require_role("admin"))):
    return admin.get_user(uid)

@router.put("/users/{uid}")
def update_user_route(
    uid: int,
    data: AdminUpdateRequest,
    current_user: dict = Depends(require_role("admin"))
):
    return admin.update_user(uid, data.dict(exclude_unset=True))

@router.delete("/users/{uid}")    
def delete_user_route(
    uid: int,
    current_user: dict = Depends(require_role("admin"))
):
    return admin.delete_user(uid)