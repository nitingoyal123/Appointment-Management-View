export default function TimelineCalendar({appointments,onSelect}){

  const hours = Array.from({length:12},(_,i)=>i+7); //7AM-6PM

  const position =(time,d)=>{
    const[h,m]=time.split(":").map(Number)
    return{
      top:(h-7)*80+(m/60*80),
      height:(d/60)*80,
    }
  };

  return(
    <div className="bg-white shadow rounded-2xl p-6 h-[75vh] overflow-hidden relative">

      {/* time column */}
      <div className="absolute w-20 left-0 top-0 bottom-0 border-r bg-gray-50 p-2">
        {hours.map(h=> <div key={h} className="h-20 text-sm text-gray-600">{h}:00</div>)}
      </div>

      {/* appointment blocks */}
      <div className="ml-24 relative h-full">
        {appointments.map(a=>
          <div key={a.id}
            style={{...position(a.time,a.duration)}}
            onClick={()=>onSelect(a)}
            className={`
              absolute left-5 w-60 px-3 py-2 rounded-lg shadow text-white cursor-pointer
              ${a.status==="Confirmed"?"bg-green-500":
                a.status==="Upcoming"?"bg-orange-500":
                a.status==="Cancelled"?"bg-red-500":"bg-blue-500"}
            `}
          >
            <p className="font-semibold">{a.patientName}</p>
            <p className="text-xs">{a.doctorName}</p>
          </div>
        )}
      </div>

    </div>
  );
}
