from fastapi import FastAPI
from prisma import Prisma
from pydantic import BaseModel
from contextlib import asynccontextmanager


### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

prisma = Prisma()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await prisma.connect()
    yield
    await prisma.disconnect()


app = FastAPI(lifespan=lifespan)


class User(BaseModel):
    email: str
    password: str
    firstName: str
    lastName: str


@app.post("/api/py/create-user")
async def hello_fast_api(user: User):
    try:
        await prisma.user.create(
            data={
                "email": user.email,
                "password": user.password,  # Ensure you hash the password in production!
                "firstName": user.firstName,
                "lastName": user.lastName,
            }
        )
    except Exception as error:
        print(error)
    return {"message": "Hello from FastAPI"}
