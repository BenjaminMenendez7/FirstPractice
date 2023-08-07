import axios from "axios";
import { API_BASE_URL } from "./ventas.service.js"

async function getProveedores(filtro) {
    let response = []
    try {
        response = await axios.get(`${API_BASE_URL}/proveedores`) 
    } 
    catch (error) {
        console.log("Se produjo un error", error)
        throw error
    }
    if (!filtro) {
        return response.data
    }
    else {
        return response.data.filter(p => p.nombre.includes(filtro))
    }
}

async function getProveedorPorId(idProveedor) {
    let response = null
    try {
        response = await axios.get(`${API_BASE_URL}/proveedores/${idProveedor}`)
        return response.data
    } 
    catch (error) {
        console.log("Se produjo un error", error)
        throw error
    }
}

async function guardarProveedor(proveedor) {
    let response = null
    if(proveedor.id) {
        try {
            response = await axios.put(`${API_BASE_URL}/proveedores`, proveedor)
            return response.data
        } 
        catch (error) {
            console.log("Se produjo un error", error)
            throw error
        }
    }
    else {
        try {
            response = await axios.post(`${API_BASE_URL}/proveedores`, proveedor)
            return response.data
        } 
        catch (error) {
            console.log("Se produjo un error", error)
            throw error
        }
    }
}

async function eliminarProveedor(idProveedor) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/proveedor/${idProveedor}`)
        console.log("Proveedor Eliminado: ", response.data)
    } 
    catch (error) {
        console.log("Se produjo un error", error)
        throw error    
    }
}

export { getProveedores , getProveedorPorId , guardarProveedor , eliminarProveedor }