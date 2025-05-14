from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
import uuid
from database import get_db
from models import Container as ContainerModel

router = APIRouter()

class Container(BaseModel):
    id: str
    name: str
    owner: str

    class Config:
        orm_mode = True

@router.post("/create", response_model=Container)
def create_container(name: str, owner: str, db: Session = Depends(get_db)):
    container_id = str(uuid.uuid4())
    container = ContainerModel(id=container_id, name=name, owner=owner)
    db.add(container)
    db.commit()
    db.refresh(container)
    return container

@router.get("/{container_id}", response_model=Container)
def get_container(container_id: str, db: Session = Depends(get_db)):
    container = db.query(ContainerModel).filter(ContainerModel.id == container_id).first()
    if not container:
        raise HTTPException(status_code=404, detail="Container not found")
    return container