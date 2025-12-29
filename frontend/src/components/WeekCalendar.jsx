import dayjs from "dayjs";
import { useState } from "react";

export default function WeekCalendar({selected,onSelect}){

  const [weekStart,setWeekStart] = useState(dayjs().startOf("week"));

  const nextWeek = ()=> setWeekStart(weekStart.add(1,"week"));
  const prevWeek = ()=> setWeekStart(weekStart.subtract(1,"week"));

  const days = [...Array(7)].map((_,i)=> weekStart.add(i,"day"));
  const today = dayjs().format("YYYY-MM-DD");

  return(
    <div className="bg-white rounded-xl shadow p-4 space-y-3">

      {/* navigation */}
      <div className="flex justify-between text-lg font-medium px-2">
        <button onClick={prevWeek}>← Prev</button>
        <p>{weekStart.format("MMM DD")} - {weekStart.add(6,"day").format("MMM DD")}</p>
        <button onClick={nextWeek}>Next →</button>
      </div>

      {/* week row */}
      <div className="grid grid-cols-7 text-center gap-2">
        {days.map(d=>{
          const id=d.format("YYYY-MM-DD");

          const active = id===selected;
          const isToday = id===today;

          return(
            <div key={id}>
              
              <button 
                onClick={()=>onSelect(id)}
                className={`w-full py-2 rounded-xl transition
                  ${active ? "bg-blue-600 text-white shadow" : "hover:bg-blue-50"}
                `}
              >
                <div className="text-sm">{d.format("ddd")}</div>
                <div className={`text-xl font-semibold 
                    ${isToday && !active?"text-blue-600":""}`}>
                  {d.format("D")}
                </div>
              </button>

            </div>
          );
        })}
      </div>
    </div>
  );
}
