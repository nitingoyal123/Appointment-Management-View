import { FiClock, FiUser, FiVideo, FiMapPin, FiX } from "react-icons/fi";
import { updateAppointmentStatus } from "../services/api";

export default function AppointmentDrawer({ appt , close , refresh }) {

  if (!appt) return null;

  async function update(status){
    await updateAppointmentStatus(appt.id,status);
    refresh();
    close();
  }

  return (
    <div className="fixed right-0 top-0 w-100 h-full bg-white shadow-2xl p-6 overflow-y-auto animate-slideLeft z-50">
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Appointment Details</h2>
        <button onClick={close}><FiX size={22}/></button>
      </div>

      <div className="mt-6 space-y-4">

        <div>
          <label className="text-gray-500 text-sm">Patient</label>
          <div className="flex items-center gap-2 text-lg font-medium mt-1">
            <FiUser/> {appt.patientName}
          </div>
        </div>

        <div>
          <label className="text-gray-500 text-sm">Doctor</label>
          <div className="flex items-center gap-2 text-lg mt-1">
            <FiUser/> {appt.doctorName}
          </div>
        </div>

        <div>
          <label className="text-gray-500 text-sm">Date & Time</label>
          <div className="flex gap-2 items-center mt-1">
            <FiClock/> {appt.date} • {appt.time}
          </div>
        </div>

        <div>
          <label className="text-gray-500 text-sm">Mode</label>
          <div className="flex gap-2 items-center mt-1">
            {appt.mode === "Online" ? <FiVideo/> : <FiMapPin/>} {appt.mode}
          </div>
        </div>

        <div className="pt-6 space-y-2">
          <button onClick={()=>update("Confirmed")} className="btn-green">Mark Confirmed</button>
          <button onClick={()=>update("Upcoming")} className="btn-yellow">Mark Upcoming</button>
          <button onClick={()=>update("Cancelled")} className="btn-red">Cancel Appointment</button>
        </div>
      </div>
    </div>
  );
}
