from fastapi import FastAPI
from prisma import Prisma
from pydantic import BaseModel
from contextlib import asynccontextmanager
import hashlib
import time


### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

prisma = Prisma()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await prisma.connect()
    yield
    await prisma.disconnect()


app = FastAPI(lifespan=lifespan)


class CreateUser(BaseModel):
    email: str
    password: str
    firstName: str
    lastName: str


class LoginUser(BaseModel):
    email: str
    password: str


class CreateRoom(BaseModel):
    email: str
    title: str


class FetchAllRooms(BaseModel):
    email: str


@app.post("/api/py/create-user")
async def create_user(user: CreateUser):
    try:
        # Email taken
        if await prisma.query_raw(
            'SELECT * FROM "User" WHERE "email" = $1', user.email
        ):
            # Return 404
            return {"status": 404}

        # Email doesn't have @
        if "@" not in user.email:
            # Return 405
            return {"status": 405}

        # Password length < 8
        if len(user.password) < 8:
            # Return 406
            return {"status": 406}

        # First name length < 1
        if len(user.firstName) < 1:
            # Return 407
            return {"status": 407}

        # Last name length < 1
        if len(user.lastName) < 1:
            # Return 408
            return {"status": 408}

        # Create user
        await prisma.user.create(
            data={
                "email": user.email,
                "password": user.password,
                "firstName": user.firstName,
                "lastName": user.lastName,
            }
        )
        # Return 200
        return {"status": 200}
    except Exception as error:
        print(error)
        # Return 400
        return {"status": 400}


@app.post("/api/py/login-user")
async def login_user(user: LoginUser):
    try:
        # User not found
        if not await prisma.query_raw(
            'SELECT * FROM "User" WHERE "email" = $1 AND "password" = $2',
            user.email,
            user.password,
        ):
            # Return 404
            return {"status": 404}
        # Return 200
        return {"status": 200}
    except Exception as error:
        print(error)
        # Return 400
        return {"status": 400}


@app.post("/api/py/create-room")
async def create_room(user: CreateRoom):
    try:
        # User not found
        userId = await prisma.query_first(
            'SELECT "userId" FROM "User" WHERE "email" = $1',
            user.email,
        )

        # If no user found
        if not userId:
            return {"status": 400}

        # Fetch the userId
        userId = userId["userId"]

        # Create random hash value
        hash_object = hashlib.sha1()
        hash_object.update(str(time.time() + userId).encode("utf-8"))
        roomId = hash_object.hexdigest()[:6]

        # Create a room
        await prisma.query_raw(
            'INSERT INTO "Room" ("roomId", "title", "adminId") VALUES ($1, $2, $3)',
            roomId,
            user.title,
            userId,
        )

        # Create a membership
        await prisma.query_raw(
            'INSERT INTO "Membership" ("userId", "roomId", "admin") VALUES ($1, $2, $3)',
            userId,
            roomId,
            True,
        )

        # Return 200
        return {"status": 200}
    except Exception as error:
        print(error)
        # Return 400
        return {"status": 400}


@app.post("/api/py/fetch-all-rooms")
async def fetch_all_rooms(user: FetchAllRooms):
    try:
        # User not found
        userId = await prisma.query_first(
            'SELECT "userId" FROM "User" WHERE "email" = $1',
            user.email,
        )

        # If no user found
        if not userId:
            return {"status": 400}

        # Fetch the userId
        userId = userId["userId"]

        # Fetch all rooms
        rooms = await prisma.query_raw(
            'SELECT "Room"."title", "Room"."roomId", "Room"."adminId", "User"."firstName", "User"."lastName", FROM "Room" JOIN "User" ON "Room"."adminId" = "User"."userId" WHERE "roomId" IN (SELECT "roomId" FROM "Membership" WHERE "userId" = $1)',
            userId,
        )

        # Return 200
        return {"status": 200, "rooms": rooms}
    except Exception as error:
        print(error)
        # Return 400
        return {"status": 400}


@app.get("/api/py/new-route")
async def new_route():
    return {"message": "This is a new route!"}
