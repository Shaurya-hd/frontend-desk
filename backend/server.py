from fastapi import FastAPI, APIRouter, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from html import escape
from pathlib import Path
from typing import Annotated, Optional
from datetime import datetime, timezone
from bson import ObjectId
from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from emailer import notify_owner  # noqa: E402

client = AsyncIOMotorClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]

app = FastAPI()
api_router = APIRouter(prefix="/api")

PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if isinstance(v, ObjectId) else v)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self) -> dict:
        return self.model_dump(by_alias=True, exclude={"id"})

    @classmethod
    def from_mongo(cls, doc: dict):
        return cls.model_validate(doc)


class WaitlistIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    organisation: str = Field(default="", max_length=160)
    role: str = Field(default="", max_length=120)


class WaitlistEntry(BaseDocument, WaitlistIn):
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class EnterpriseIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    organisation: str = Field(min_length=1, max_length=160)
    role: str = Field(default="", max_length=120)
    team_size: str = Field(default="", max_length=40)
    message: str = Field(default="", max_length=2000)


class EnterpriseLead(BaseDocument, EnterpriseIn):
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


def _rows_html(title: str, rows: dict) -> str:
    cells = "".join(
        f'<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e5e0;color:#666;font-size:13px;width:140px">{escape(k)}</td>'
        f'<td style="padding:8px 12px;border-bottom:1px solid #e5e5e0;color:#111;font-size:14px">{escape(v or "-")}</td></tr>'
        for k, v in rows.items()
    )
    return (
        '<table role="presentation" width="100%" style="font-family:Arial,sans-serif;background:#fbfbf9">'
        f'<tr><td style="padding:24px"><h2 style="margin:0 0 16px;color:#0f0f0f">{escape(title)}</h2>'
        f'<table role="presentation" width="100%" style="border-collapse:collapse">{cells}</table>'
        f'<p style="font-size:12px;color:#888;margin-top:20px">Sent by {escape(EMAIL_FROM_NAME)} website notifications.</p>'
        '</td></tr></table>'
    )


@api_router.get("/")
async def root():
    return {"message": "Chople's Desk API"}


@api_router.post("/waitlist")
async def join_waitlist(data: WaitlistIn, background: BackgroundTasks):
    email = data.email.lower()
    existing = await db.waitlist.find_one({"email": email})
    if existing:
        return {"status": "exists", "id": str(existing["_id"])}
    entry = WaitlistEntry(**{**data.model_dump(), "email": email})
    res = await db.waitlist.insert_one(entry.to_mongo())
    background.add_task(
        notify_owner,
        f"New waitlist signup: {data.name}",
        _rows_html("New Chople's Desk waitlist signup", {
            "Name": data.name, "Email": email, "Organisation": data.organisation, "Role": data.role,
        }),
    )
    return {"status": "created", "id": str(res.inserted_id)}


@api_router.post("/enterprise")
async def enterprise_contact(data: EnterpriseIn, background: BackgroundTasks):
    lead = EnterpriseLead(**{**data.model_dump(), "email": data.email.lower()})
    res = await db.enterprise_leads.insert_one(lead.to_mongo())
    background.add_task(
        notify_owner,
        f"Enterprise sales enquiry: {data.organisation}",
        _rows_html("New enterprise sales enquiry", {
            "Name": data.name, "Email": lead.email, "Organisation": data.organisation,
            "Role": data.role, "Newsroom size": data.team_size, "Message": data.message,
        }),
    )
    return {"status": "created", "id": str(res.inserted_id)}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
