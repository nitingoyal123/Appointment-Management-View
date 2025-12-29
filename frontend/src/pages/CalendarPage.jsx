import { useEffect, useState } from "react";
import { getAppointments } from "../services/api";
import WeekCalendar from "../components/WeekCalendar";
import TimelineCalendar from "../components/TimelineCalendar";
import AppointmentDrawer from "../components/AppointmentDrawer";
import CreateDrawer from "../components/CreateDrawer";
import dayjs from "dayjs";

export default function CalendarPage() {

  const [selectedDate,setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [appointments,setAppointments]=useState([]);
  const [openCreate,setOpenCreate]=useState(false);
  const [selected,setSelected]=useState(null);

  async function load(){
    const list = await getAppointments();
    setAppointments(list.filter(a => a.date === selectedDate && a.status !== "Cancelled"));
  }

  useEffect(()=>{ load(); },[selectedDate]);

  return(
    <div className="flex flex-col gap-4">

      {/* Week Selector */}
      <WeekCalendar selected={selectedDate} onSelect={setSelectedDate}/>

      {/* Timeline Calendar */}
      <TimelineCalendar 
        appointments={appointments} 
        onSelect={setSelected}
      />

      {/* Right Drawers */}
      <AppointmentDrawer 
        appt={selected}
        close={()=>setSelected(null)}
        refresh={load}
      />

      <CreateDrawer 
        open={openCreate}
        close={()=>setOpenCreate(false)}
        refresh={load}
      />

      <button 
        onClick={() => setOpenCreate(true)}
        className="fixed bottom-8 right-8 px-6 py-3 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700">
          + New Appointment
      </button>

    </div>
  );
}
