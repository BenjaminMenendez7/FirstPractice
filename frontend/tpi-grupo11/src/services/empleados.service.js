import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

async function getEmpleados(filtro) {
    let response = [];
    try {
        response = await axios.get(`${API_BASE_URL}/empleados`);
    } catch (error) {
        return [];
    }
    if (!filtro) {
        return response.data ?? [];
    }
    else {
        return (response?.data ?? []).filter(x => x.nombre.includes(filtro))
    }
}

async function getEmpleadoPorId(idEmpleado){
    let response = null;
    try {
        response = await axios.get(`${API_BASE_URL}/empleados/${idEmpleado}`);
    } catch (error) {
        return null;
    }
    return response?.data ?? null;
}

async function saveEmpleado(payload){
    if (payload.idEmpleado && payload.legajo) {
        try {
            await axios.put(`${API_BASE_URL}/empleados`, payload);
        } catch (error) {
            console.error("Error al intentar guardar empleado, saveEmpleado ~ error:", error)
            return false;
        }
    }
    else {
        try {
            await axios.post(`${API_BASE_URL}/empleados`, payload);
        } catch (error) {
            return false;
        }
    }

}
async function deleteEmpleado(idEmpleado){
try {
    await axios.delete(`${API_BASE_URL}/empleados/${idEmpleado}`);
} catch (error) {
    return false;
}
}


export { getEmpleados, getEmpleadoPorId, saveEmpleado, deleteEmpleado }