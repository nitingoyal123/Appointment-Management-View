import { useState } from "react";
import dayjs from "dayjs"; // npm install dayjs

export default function Calendar({ appointments, onSelectAppt }) {

  const [current, setCurrent] = useState(dayjs());

  const monthStart = current.startOf("month").startOf("week");
  const monthEnd   = current.endOf("month").endOf("week");

  const days = [];
  let day = monthStart;

  while(day.isBefore(monthEnd)) {
    days.push(day);
    day = day.add(1,"day");
  }

  const nextMonth = () => setCurrent(current.add(1,"month"));
  const prevMonth = () => setCurrent(current.subtract(1,"month"));

  return (
    <div className="bg-white shadow rounded-lg p-4">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <button onClick={prevMonth} className="px-2">◀</button>
        <h2 className="text-lg font-bold">{current.format("MMMM YYYY")}</h2>
        <button onClick={nextMonth} className="px-2">▶</button>
      </div>

      {/* Week Names */}
      <div className="grid grid-cols-7 text-center font-medium text-gray-600">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>
          <div key={d} className="py-1">{d}</div>
        )}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map(date=> {
          const appts = appointments.filter(a => a.date === date.format("YYYY-MM-DD"));
          return (
            <div key={date} className={`border h-28 p-1 rounded overflow-y-auto 
              ${date.month() !== current.month() ? "bg-gray-100 text-gray-400" : "bg-white"}`}
            >
              <div className="text-xs font-bold">{date.date()}</div>

              {appts.map(a => (
                <div key={a.id}
                  onClick={()=>onSelectAppt(a)}
                  className="mt-1 text-xs p-1 rounded cursor-pointer bg-blue-200 hover:bg-blue-300">
                  {a.patientName}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  );
}
