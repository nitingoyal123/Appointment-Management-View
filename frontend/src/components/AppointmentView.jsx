import { useEffect, useState } from "react";
import { getAppointments, createAppointment, updateAppointmentStatus } from "../services/api";
import Calendar from "./Calendar";
import AppointmentModal from "./AppointmentModal";
import { FiCalendar, FiUser, FiPlus, FiFilter } from "react-icons/fi";

export default function AppointmentView() {

  const [appointments,setAppointments]=useState([]);
  const [openCreate,setOpenCreate]=useState(false);
  const [selected,setSelected]=useState(null);
  const [filter,setFilter]=useState("All");

  async function load(params={}){
    setAppointments(await getAppointments(params));
  }
  useEffect(()=>{ load(); },[]);

  async function submit(e){
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    data.duration = Number(data.duration);
    await createAppointment(data);
    setOpenCreate(false);
    load();
  }
  async function changeStatus(id,status){
    await updateAppointmentStatus(id,status);
    setSelected(null);
    load();
  }

  // Filter UI mapping
  const statusFilter = ["All","Scheduled","Confirmed","Upcoming","Cancelled"];

  return (
    <div className="h-screen bg-[#F6F8FB] flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl border-r flex flex-col p-6 space-y-8">
        <h1 className="text-2xl font-bold text-blue-600">Shanti.EMR</h1>

        <nav className="space-y-4 text-gray-600 font-medium">
          <button className="hover:text-blue-600 flex gap-2 items-center"><FiCalendar/> Calendar</button>
          <button className="hover:text-blue-600 flex gap-2 items-center"><FiUser/> Patients</button>
        </nav>

        <button 
          onClick={()=>setOpenCreate(true)}
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 shadow">
          <FiPlus/> New Appointment
        </button>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-8 overflow-y-auto">

        <header className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Appointments</h2>
            <p className="text-gray-500">Manage, track & schedule sessions</p>
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <details className="group relative">
              <summary className="cursor-pointer px-4 py-2 bg-white border shadow rounded-lg flex items-center gap-2 hover:bg-gray-50">
                <FiFilter/> Filter: {filter}
              </summary>
              <div className="absolute mt-2 w-40 bg-white shadow rounded-md z-10 p-2">
                {statusFilter.map(s=>(
                  <p key={s}
                    onClick={()=>{setFilter(s); s!=="All"?load({status:s}):load()}}
                    className="p-2 hover:bg-gray-100 cursor-pointer rounded">
                    {s}
                  </p>
                ))}
              </div>
            </details>
          </div>
        </header>

        {/* Calendar */}
        <Calendar appointments={appointments} onSelectAppt={setSelected}/>

        {/* Appointment Detail Modal */}
        <AppointmentModal 
          appt={selected}
          close={()=>setSelected(null)}
          onStatusChange={changeStatus}
        />

        {/* Create Appointment Modal */}
        {openCreate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <form onSubmit={submit} className="bg-white p-8 rounded-2xl shadow-xl w-105 space-y-4">
              <h3 className="text-2xl font-semibold mb-2">New Appointment</h3>

              <input required name="patientName" className="input" placeholder="Patient Name"/>
              <input required type="date" name="date" className="input"/>
              <input required type="time" name="time" className="input"/>
              <input required name="duration" type="number" placeholder="Duration (min)" className="input"/>
              <input required name="doctorName" placeholder="Doctor Name" className="input"/>

              <select name="mode" className="input" required>
                <option>Online</option>
                <option>Offline</option>
              </select>

              <button className="bg-blue-600 hover:bg-blue-700 text-white w-full p-3 rounded-xl font-medium">Create</button>
              <button type="button" onClick={()=>setOpenCreate(false)}
                className="bg-gray-200 w-full p-3 rounded-xl">Cancel</button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}