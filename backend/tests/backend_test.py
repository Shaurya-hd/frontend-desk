"""Backend API tests for Chople's Desk marketing site."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://story-finder-8.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


# ---------- Health ----------
def test_root(s):
    r = s.get(f"{API}/")
    assert r.status_code == 200
    assert "message" in r.json()


# ---------- Waitlist ----------
def _wl_payload(email=None):
    return {
        "name": "TEST User",
        "email": email or f"test+{uuid.uuid4().hex[:10]}@example.com",
        "organisation": "TEST Org",
        "role": "Reporter",
    }


def test_waitlist_created(s):
    r = s.post(f"{API}/waitlist", json=_wl_payload())
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["status"] == "created"
    assert "id" in body


def test_waitlist_duplicate_returns_exists(s):
    email = f"test+{uuid.uuid4().hex[:10]}@example.com"
    r1 = s.post(f"{API}/waitlist", json=_wl_payload(email))
    assert r1.status_code == 200
    assert r1.json()["status"] == "created"
    r2 = s.post(f"{API}/waitlist", json=_wl_payload(email))
    assert r2.status_code == 200
    assert r2.json()["status"] == "exists"


def test_waitlist_duplicate_case_insensitive(s):
    email = f"MixedCase+{uuid.uuid4().hex[:8]}@Example.com"
    r1 = s.post(f"{API}/waitlist", json=_wl_payload(email))
    assert r1.json()["status"] == "created"
    r2 = s.post(f"{API}/waitlist", json=_wl_payload(email.lower()))
    assert r2.json()["status"] == "exists"


def test_waitlist_invalid_email(s):
    r = s.post(f"{API}/waitlist", json={"name": "x", "email": "not-an-email"})
    assert r.status_code == 422


def test_waitlist_missing_name(s):
    r = s.post(f"{API}/waitlist", json={"email": "a@b.com"})
    assert r.status_code == 422


def test_waitlist_optional_fields(s):
    r = s.post(f"{API}/waitlist", json={"name": "TEST Only", "email": f"only+{uuid.uuid4().hex[:8]}@example.com"})
    assert r.status_code == 200
    assert r.json()["status"] == "created"


# ---------- Enterprise ----------
def _ent_payload(email=None):
    return {
        "name": "TEST Enterprise",
        "email": email or f"ent+{uuid.uuid4().hex[:10]}@example.com",
        "organisation": "TEST Media",
        "role": "Editor",
        "team_size": "10-50",
        "message": "Please contact us",
    }


def test_enterprise_created(s):
    r = s.post(f"{API}/enterprise", json=_ent_payload())
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["status"] == "created"
    assert "id" in body


def test_enterprise_missing_organisation(s):
    payload = _ent_payload()
    payload.pop("organisation")
    r = s.post(f"{API}/enterprise", json=payload)
    assert r.status_code == 422


def test_enterprise_empty_organisation(s):
    payload = _ent_payload()
    payload["organisation"] = ""
    r = s.post(f"{API}/enterprise", json=payload)
    assert r.status_code == 422


def test_enterprise_invalid_email(s):
    payload = _ent_payload()
    payload["email"] = "bad-email"
    r = s.post(f"{API}/enterprise", json=payload)
    assert r.status_code == 422


def test_enterprise_duplicate_allowed(s):
    """Enterprise leads should allow duplicates (unlike waitlist)."""
    email = f"dupent+{uuid.uuid4().hex[:8]}@example.com"
    r1 = s.post(f"{API}/enterprise", json=_ent_payload(email))
    r2 = s.post(f"{API}/enterprise", json=_ent_payload(email))
    assert r1.json()["status"] == "created"
    assert r2.json()["status"] == "created"
