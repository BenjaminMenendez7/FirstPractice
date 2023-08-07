import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

async function getVentas(filtro) {
    let response = [];
    try {
        response = await axios.get(`${API_BASE_URL}/ventas`);
    } catch (error) {
        console.error("🚀 ~ file: ventas.service.js:9 ~ getVentas ~ error:", error)
        return [];
    }
    if (!filtro) {
        return response.data ?? [];
    }
    else {
        return (response?.data ?? []).filter(x => x.descVenta.includes(filtro))
    }
}

// async function (pelicula) {
//     console.log("🚀 ~ file: peliculas.serviceBE.js:19 ~ addPelicula ~ pelicula:", pelicula)
//     if (pelicula)
//         try {
//             const response = await axios.post(`${API_BASE_URL}/peliculas`, pelicula);
//             console.log("🚀 ~ file: peliculas.serviceBE.js:11 ~ addPelicula ~ response:", response.data)
//             return response.data

//         } catch (error) {
//             console.error("🚀 ~ file: peliculas.serviceBE.js:23 ~ addPelicula ~ error:", error);
//             throw error;
//         }
// }
async function getVentasPorId (ventaId){
    console.log("🚀 ~ file: ventas.service.js:35 ~ getVentasPorId ~ ventaId:", ventaId)
    let response = null;
    try {
        response = await axios.get(`${API_BASE_URL}/venta/${ventaId}`);
    } catch (error) {
        console.error("🚀 ~ file: ventas.service.js:9 ~ getVentas ~ error:", error)
        return null;
    }
    return response?.data ?? null;
}

async function saveVenta(payload){
    let response = null;
    if (payload.idVenta) {
        try {
            response = await axios.put(`${API_BASE_URL}/venta`, payload);
            console.log("🚀 ~ file: ventas.service.js:51 ~ saveVenta ~ response:", response)
        } catch (error) {
            console.error("🚀 ~ file: ventas.service.js:51 ~ saveVenta ~ error:", error)
            return false;
        }
    }
    else {
        try {
            response = await axios.post(`${API_BASE_URL}/venta`, payload);
            console.log("🚀 ~ file: ventas.service.js:51 ~ saveVenta ~ response:", response)
        } catch (error) {
            console.error("🚀 ~ file: ventas.service.js:51 ~ saveVenta ~ error:", error)
            return false;
        }
    }

}
async function deleteVenta(idVenta){
console.log("🚀 ~ file: ventas.service.js:69 ~ deleteVenta ~ idVenta:", idVenta)
try {
    const response = await axios.delete(`${API_BASE_URL}/venta/${idVenta}`);
    console.log("🚀 ~ file: ventas.service.js:51 ~ deleteVenta ~ response:", response)
} catch (error) {
    console.error("🚀 ~ file: ventas.service.js:51 ~ saveVenta ~ error:", error)
    return false;
}
}


export { getVentas,getVentasPorId,saveVenta,deleteVenta,API_BASE_URL }