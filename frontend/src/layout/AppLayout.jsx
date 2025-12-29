import { FiCalendar, FiUsers, FiHome, FiPlus, FiActivity, FiSettings } from "react-icons/fi";

export default function AppLayout({ children }) {

  return (
    <div className="flex bg-[#F5F7FB] h-screen overflow-hidden">

      {/* Left Floating Sidebar */}
      <aside className="w-20 bg-white shadow-xl flex flex-col items-center py-6 gap-8 rounded-r-3xl">
        <NavIcon icon={<FiHome/>}/>
        <NavIcon icon={<FiCalendar/>} active/>
        <NavIcon icon={<FiActivity/>}/>
        <NavIcon icon={<FiUsers/>}/>
        <NavIcon icon={<FiSettings/>}/>

        <div className="mt-auto">
          <NavIcon icon={<FiPlus/>} big/>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="p-4 bg-white shadow flex justify-between items-center">
          <h1 className="text-2xl font-bold">Calendar</h1>
        </header>

        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>

    </div>
  );
}

function NavIcon({ icon, active, big }) {
  return (
    <button className={`p-3 rounded-xl text-xl transition 
      ${active ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-200"} 
      ${big ? "p-4 text-3xl bg-blue-600 text-white hover:bg-blue-700" : ""}`}>
      {icon}
    </button>
  );
}
