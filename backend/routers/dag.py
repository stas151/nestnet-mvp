from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Dict
from sqlalchemy.orm import Session
import uuid
from database import get_db
from models import DAGNode as DAGModel

router = APIRouter()

class DAGNode(BaseModel):
    id: str
    data: str
    parents: List[str] = []
    class Config:
        orm_mode = True

@router.post("/add", response_model=DAGNode)
def add_node(data: str, parents: List[str] = [], db: Session = Depends(get_db)):
    node_id = str(uuid.uuid4())
    parents_str = ",".join(parents)
    node = DAGModel(id=node_id, data=data, parents=parents_str)
    db.add(node)
    db.commit()
    db.refresh(node)
    return DAGNode(id=node.id, data=node.data, parents=node.parents.split(",") if node.parents else [])

@router.get("/all", response_model=List[DAGNode])
def get_all_nodes(db: Session = Depends(get_db)):
    nodes = db.query(DAGModel).all()
    return [DAGNode(id=n.id, data=n.data, parents=n.parents.split(",") if n.parents else []) for n in nodes]

@router.get("/{node_id}", response_model=DAGNode)
def get_node(node_id: str, db: Session = Depends(get_db)):
    node = db.query(DAGModel).filter(DAGModel.id == node_id).first()
    if not node:
        raise HTTPException(status_code=404, detail="Node not found")
    return DAGNode(id=node.id, data=node.data, parents=node.parents.split(",") if node.parents else [])