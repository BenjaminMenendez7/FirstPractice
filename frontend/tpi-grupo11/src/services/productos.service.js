import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

async function getProductos(filtro) {
    let response = [];
    try {
        response = await axios.get(`${API_BASE_URL}/productos`);
    } catch (error) {
        console.error(error)
        return [];
    }
    if (!filtro) {
        return response.data ?? [];
    }
    else {
        return (response?.data ?? []).filter(x => x.Nombre.includes(filtro.toUpperCase()))
    }
}


async function getProductoPorId(id) {
    let response = [];
    try {
        console.log(id)
        response = await axios.get(`${API_BASE_URL}/producto/${id}`);
        return response?.data;
    } catch (error) {
        console.error(error)
        return [];
    }
}

async function deleteProducto(id) {
    let response = [];
    try {
        response = await axios.delete(`${API_BASE_URL}/producto/${id}`);
    } catch (error) {
        console.error(error)
        return false;
    }
}

async function saveProducto(payload) {
    let response = [];
    if(payload.IdProducto){
        try {
            response = await axios.put(`${API_BASE_URL}/producto`, payload);
            return response;
        } catch (error) {
            console.error(error)
            return false;
        }
    }else{
        try {
            response = await axios.post(`${API_BASE_URL}/producto`, payload);
            return response;
        } catch (error) {
            console.error(error)
            return false;
        }
    }
}

export { getProductos, getProductoPorId, deleteProducto, saveProducto}