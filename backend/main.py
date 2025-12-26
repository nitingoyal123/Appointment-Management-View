from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
from datetime import datetime

app = FastAPI()

# CORS MIDDLEWARE
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from enum import Enum

class StatusEnum(str, Enum):
    Confirmed = "Confirmed"
    Scheduled = "Scheduled"
    Upcoming = "Upcoming"
    Cancelled = "Cancelled"


# DATABASE (Mock PostgreSQL)
appointments = []

class Appointment(BaseModel):
    patientName: str
    date: str
    time: str
    duration: int
    doctorName: str
    mode: str
    status: StatusEnum = StatusEnum.Scheduled   # default

class StatusUpdate(BaseModel):
    status: StatusEnum

# GET
@app.get("/appointments")
def get_appointments(date: str = None, 
                     status: StatusEnum = None,
                     doctor: str = None,
                     mode: str = None):

    result = appointments

    if date:   result = [a for a in result if a["date"] == date]
    if status: result = [a for a in result if a["status"] == status]
    if doctor: result = [a for a in result if a["doctorName"] == doctor]
    if mode:   result = [a for a in result if a["mode"] == mode]

    return result

# CREATE
@app.post("/appointments")
def create_appointment(data: Appointment):
    # Check time overlap
    for a in appointments:
        if a["doctorName"] == data.doctorName and a["date"] == data.date:
            old_start = datetime.strptime(a["time"], "%H:%M")
            old_end = old_start.replace(minute=old_start.minute + a["duration"])
            new_start = datetime.strptime(data.time, "%H:%M")
            new_end = new_start.replace(minute=new_start.minute + data.duration)

            if new_start < old_end and old_start < new_end:
                raise HTTPException(status_code=400, detail="Doctor time slot already booked")

    newAppt = data.dict()
    newAppt["id"] = str(uuid.uuid4())
    appointments.append(newAppt)
    return newAppt

# UPDATE
@app.put("/appointments/{id}")
def update_status(id: str, body: StatusUpdate):
    for a in appointments:
        if a["id"] == id:
            a["status"] = body.status
            return a
    raise HTTPException(status_code=404, detail="Appointment not found")

# DELETE
@app.delete("/appointments/{id}")
def delete_appointment(id: str):
    global appointments
    before = len(appointments)
    appointments = [a for a in appointments if a["id"] != id]
    return {"deleted": before != len(appointments)}
