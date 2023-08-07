import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

async function getClientes(filtro) {
    let response = [];
    try {
        response = await axios.get(`${API_BASE_URL}/clientes`);
    } catch (error) {
        return [];
    }
    if (!filtro) {
        return response.data ?? [];
    }
    else {
        //return (response?.data ?? []).filter(x => x.cliente.includes(filtro))
        return (response?.data ?? []).filter(x => x.nombre.includes(filtro))
    }
}

async function getClientePorId(idCliente){
    let response = null;
    try {
        response = await axios.get(`${API_BASE_URL}/clientes/${idCliente}`);
    } catch (error) {
        return null;
    }
    return response?.data ?? null;
}

async function saveCliente(payload){
    if (payload.idCliente) {
        try {
            await axios.put(`${API_BASE_URL}/clientes`, payload);
        } catch (error) {
            console.error("🚀 ~ file: ventas.service.js:51 ~ saveVenta ~ error:", error)
            return false;
        }
    }
    else {
        try {
            await axios.post(`${API_BASE_URL}/clientes`, payload);
        } catch (error) {
            return false;
        }
    }

}
async function deleteCliente(idCliente){
try {
    await axios.delete(`${API_BASE_URL}/clientes/${idCliente}`);
} catch (error) {
    return false;
}
}


export { getClientes, getClientePorId, saveCliente, deleteCliente }