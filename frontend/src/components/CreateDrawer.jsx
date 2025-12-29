import { FiUser, FiCalendar, FiClock, FiUserCheck, FiX } from "react-icons/fi";
import { createAppointment } from "../services/api";

export default function CreateDrawer({ open , close , refresh }){

  if(!open) return null;

  async function submit(e){
    e.preventDefault();
    const body=Object.fromEntries(new FormData(e.target));
    body.duration = Number(body.duration);
    await createAppointment(body);
    refresh();
    close();
  }

  return (
    <div className="fixed right-0 top-0 w-100 h-full bg-white shadow-2xl p-6 overflow-y-auto animate-slideLeft z-50">

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Create Appointment</h2>
        <button onClick={close}><FiX size={22}/></button>
      </div>

      <form onSubmit={submit} className="mt-8 space-y-4">
        
        <Field icon={<FiUser/>} label="Patient Name">
          <input name="patientName" required className="input"/>
        </Field>

        <Field icon={<FiUserCheck/>} label="Doctor Name">
          <input name="doctorName" required className="input"/>
        </Field>

        <Field icon={<FiCalendar/>} label="Date">
          <input type="date" name="date" required className="input"/>
        </Field>

        <Field icon={<FiClock/>} label="Time">
          <input type="time" name="time" required className="input"/>
        </Field>

        <Field label="Duration (min)">
          <input type="number" name="duration" required className="input"/>
        </Field>

        <Field label="Mode">
          <select name="mode" required className="input">
            <option>Online</option>
            <option>Offline</option>
          </select>
        </Field>

        <button className="bg-blue-600 text-white w-full p-3 rounded-xl text-md hover:bg-blue-700">
          Create Appointment
        </button>
      </form>
    </div>
  );
}

function Field({label, icon, children}){
  return(
    <div>
      <label className="text-gray-500 text-sm">{label}</label>
      <div className="flex items-center gap-2 mt-1 border p-2 rounded-xl input">
        {icon && <span className="text-gray-500">{icon}</span>}
        {children}
      </div>
    </div>
  )
}
