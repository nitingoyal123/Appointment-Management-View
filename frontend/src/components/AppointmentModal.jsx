export default function AppointmentModal({ appt, close, onStatusChange }) {

  if(!appt) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-96 space-y-3 shadow-lg">

        <h2 className="text-xl font-semibold">{appt.patientName}</h2>
        <p><b>Date:</b> {appt.date}</p>
        <p><b>Time:</b> {appt.time}</p>
        <p><b>Duration:</b> {appt.duration} mins</p>
        <p><b>Doctor:</b> {appt.doctorName}</p>
        <p><b>Mode:</b> {appt.mode}</p>
        <p><b>Status:</b> {appt.status}</p>

        <div className="flex gap-3 pt-2">
          <button onClick={()=>onStatusChange(appt.id,"Completed")}
              className="flex-1 bg-green-600 text-white p-2 rounded">
              Mark Completed
          </button>
          <button onClick={close}
              className="flex-1 bg-gray-300 p-2 rounded">
              Close
          </button>
        </div>
      </div>
    </div>
  );
}
