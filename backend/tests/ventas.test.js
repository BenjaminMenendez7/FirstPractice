const request = require("supertest");
const app = "http://localhost:3001/api";

//todos los escenarios de prueba asociados al endpoint de Ventas
describe("Test Ventas", () => {
    let ventasList = [];
    let idVentaToTest = null;
    it("Deberia devolver todas las ventas.", async () => {
        const res = await request(app)
            .get("/ventas")
            .set("Accept", "application/json");

        expect(res.statusCode).toEqual(200);
        expect(res?.body?.length ?? 0).toBeGreaterThan(0);
        expect(res?.body ?? null).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    idVenta: expect.any(Number),
                    descVenta: expect.any(String),
                    fechaVenta: expect.any(String),
                    idProveedor: expect.any(Number),
                    idCliente: expect.any(Number),
                    idEmpleado: expect.any(Number),
                    idProducto: expect.any(Number),
                })
            ])
        )
        ventasList = res.body;
        idVentaToTest = ventasList[0].idVenta ?? null;

    })
    if (idVentaToTest) return;
    it("Deberia devolver la venta con el id que suministramos.", async () => {
        const res = await request(app) // request inicializa la solicitud
            .get(`/venta/${idVentaToTest ?? ""}`) // Ruta del endpoint
            .set("Accept", "application/json"); // Tipo de respuesta


        expect(res.statusCode).toEqual(200); // es equivalente a 200, preguntando por el codigo de estado de la respuesta.
        expect(res.body).toEqual(
            expect.objectContaining({
                idVenta: expect.any(Number),
                descVenta: expect.any(String),
                fechaVenta: expect.any(String),
                idProveedor: expect.any(Number),
                idCliente: expect.any(Number),
                idEmpleado: expect.any(Number),
                idProducto: expect.any(Number),
            })
        )
    })
    it("Deberia devolver mensaje que no encontro la venta con el id que suministramos.", async () => {
        const ultimoId = (ventasList[ventasList.length - 1].idVenta) + 2;

        const res = await request(app) // request inicializa la solicitud
            .get(`/venta/${ultimoId ?? ""}`) // Ruta del endpoint
            .set("Accept", "application/json"); // Tipo de respuesta


        expect(res.statusCode).toEqual(404); // es equivalente a 200, preguntando por el codigo de estado de la respuesta.
        expect(res.body).toEqual( // pregunta que el body de la respuesta sea igual a un objeto con una propiedad de tipo string llamada message.
            expect.objectContaining({
                message: expect.any(String),
            })
        )
    })
    it("Deberia crear un nuevo registro de venta.", async () => {
        const ventaPayload = {
            descVenta: "String Prueba Descripcion Venta",
            idProveedor: 99,
            idCliente: 99,
            idEmpleado: 99,
            idProducto: 99,
        }
        const res = await request(app)
            .post("/venta")
            .set("Accept", "application/json")
            .send(ventaPayload)


        expect(res.statusCode).toEqual(200);
        expect(res?.body ?? null).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            })
        )
    })
    it("Deberia no crear un nueva venta por falta de campo obligatorio", async () => {
        const venta = {
            descVenta: "String Prueba Descripcion Venta",
            idProveedor: 99,
            //idCliente: 99,
            idEmpleado: 99,
            idProducto: 99,
        }
        const res = await request(app)
            .post("/venta")
            .set("Accept", "application/json")
            .send(venta)

        expect(res.statusCode).toEqual(404);
        expect(res?.body ?? null).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            })
        )
    })
    it("Deberia poder Modificar una venta cambiandole la descripción", async () => {
        ventasList = (await request(app)
            .get("/ventas")
            .set("Accept", "application/json")).body

        const ventaPayload = {
            idVenta: ventasList[ventasList.length -1].idVenta,
            descVenta: ("String Prueba Modificacion Venta " + (ventasList[ventasList.length -1].idVenta + 1)),
        }
        const res = await request(app)
            .put("/venta")
            .set("Accept", "application/json")
            .send(ventaPayload)

        expect(res.statusCode).toEqual(200);
        expect(res?.body ?? null).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            })
        )
    })
    it("Deberia poder eliminar una venta", async () => {
        const idVentaABorrar = ventasList[ventasList.length -1].idVenta
        const res = await request(app)
            .delete(`/venta/${idVentaABorrar ?? ""}`)
            .set("Accept", "application/json")

        expect(res.statusCode).toEqual(200);
        expect(res?.body ?? null).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            })
        )
    })
})