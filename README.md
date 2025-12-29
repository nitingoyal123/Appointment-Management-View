# 📅 EMR Appointment Scheduler

A modern calendar-based medical appointment scheduling system built using **React (Vite) + Tailwind CSS + FastAPI**.  
It provides a weekly calendar UI with timeline-based appointment visualization similar to EMR/clinic scheduling apps.

---

## 🚀 Features

### ✔ Calendar UI
- Week navigation (Prev / Next week)
- Click any date → view timeline for that day
- Appointment count indicator on each day
- Current day highlight

### ✔ Timeline Appointment View
- Scrollable time grid (6 AM → 10 PM)
- Appointment cards placed based on time & duration
- Color-coded status (Confirmed/Upcoming/Cancelled)
- Click appointment to view details

### ✔ Appointment Actions
- Create appointment drawer
- Appointment details drawer
- Update status → Confirm / Upcoming / Cancel
- Cancelled appointments auto-remove from calendar

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | FastAPI (Python) |
| Data Flow | REST API |
| UI Components | Custom Calendar + Drawer Panels |

---

## 📂 Project Structure

```bash
emr-assignment/
│
├── backend/
│   └── main.py                 # FastAPI backend with CRUD
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   └── CalendarPage.jsx
    │   ├── components/
    │   │   ├── WeekCalendar.jsx
    │   │   ├── TimelineCalendar.jsx
    │   │   ├── AppointmentDrawer.jsx
    │   │   └── CreateDrawer.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.css
    └── vite.config.js

```
---

## 🏃 How to Run Locally

### 1️⃣ Clone Repository
```bash
git clone <your-repo-link>
cd emr-assignment

cd backend
pip install fastapi uvicorn pydantic
uvicorn main:app --reload

cd ../frontend
npm install
npm run dev

