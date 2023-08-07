const request = require("supertest");
const app = "http://localhost:3001/api";

describe("/api/clientes", () => {
    it("Deberia devolver todos los clientes.", async () => {
        const res = await request(app)
            .get("/clientes")
            .set("Accept", "application/json");


        expect(res.statusCode).toEqual(200);
        expect(res?.body?.length ?? 0).toBeGreaterThan(0)
        res?.body.forEach(element => expect.objectContaining({
            idCliente: expect.any(Number),
            nombre: expect.any(String),
            fechaDeAlta: expect.any(Date),
            dni: expect.any(Number),
            direccion: expect.any(String)
        })
        );
    })
    it("Deberia devolver un cliente con id 5.", async () => {
        const res = await request(app)
            .get("/clientes/5")
            .set("Accept", "application/json");


        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                idCliente: 5
            })
        )
    })
    it("Deberia crear un nuevo cliente.", async () => {
        const cliente = {
            nombre: "Ramiro",
            dni: 29092544,
            direccion: "Tapalque 3251"
        }
        const res = await request(app)
            .post("/clientes")
            .set("Accept", "application/json")
            .send(cliente)


        expect(res.statusCode).toEqual(200);
    })
    it("Deberia no crear un nuevo cliente por falta de campo obligatorio", async () => {
        const cliente = {
            nombre: "Ramiro",
            dni: null,
            direccion: "Tapalque 3251"
        }
        const res = await request(app)
            .post("/clientes")
            .set("Accept", "application/json")
            .send(cliente)


        expect(res.statusCode).toEqual(404);
        expect(res?.body ?? null).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            })
        )
    })
    it("Deberia modificar un cliente que ya existe.", async () => {
        const cliente = {
            nombre: "Ramiro",
            dni: 29092544,
            direccion: "Tapalque 2000"
        }
        const res = await request(app)
            .put("/clientes")
            .set("Accept", "application/json")
            .send(cliente)


        expect(res.statusCode).toEqual(200);
    })
    it("Deberia borrar un cliente de la base de datos.", async () => {
        const dniCliente = 29092544
        let res = await request(app)
            .get("/clientes")
            .set("Accept", "application/json");
        let cantidadAntesDeBorrado = res?.body?.length

        res = await request(app)
            .delete("/clientes/" + dniCliente)
            .set("Accept", "application/json")

        expect(res.statusCode).toEqual(200);

        res = await request(app)
            .get("/clientes")
            .set("Accept", "application/json");

        expect(res?.body?.length).toBeLessThan(cantidadAntesDeBorrado)
    })
})