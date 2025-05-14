from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, dag, containers, ipfs, substrate
from database import Base, engine

app = FastAPI(title="NestNet API")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(dag.router, prefix="/dag", tags=["DAG"])
app.include_router(containers.router, prefix="/containers", tags=["Containers"])
app.include_router(ipfs.router, prefix="/ipfs", tags=["IPFS"])
app.include_router(substrate.router, prefix="/substrate", tags=["Substrate"])

@app.get("/")
def root():
    return {"message": "NestNet API is running"}