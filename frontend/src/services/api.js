const API = "http://localhost:8000";

export async function getAppointments(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    const res = await fetch(`${API}/appointments?${params}`);
    return res.json();
}

export async function createAppointment(data) {
    const res = await fetch(`${API}/appointments`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function updateAppointmentStatus(id,status){
    const res = await fetch(`${API}/appointments/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({status})
    });
    return res.json();
}
