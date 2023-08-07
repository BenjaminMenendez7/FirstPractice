const request = require("supertest");
const app = "http://localhost:3001/api";

describe("/api/empleados", () => {
    it("Deberia devolver todos los empleados.", async () => {
        const res = await request(app)
            .get("/empleados")
            .set("Accept", "application/json");


        expect(res.statusCode).toEqual(200);
        expect(res?.body?.length ?? 0).toBeGreaterThan(0)
        res?.body.forEach(element => expect.objectContaining({
            idEmpleado: expect.any(Number),
            nombre: expect.any(String),
            legajo: expect.any(Number),
            fechaDeAlta: expect.any(Date),
            dni: expect.any(Number),
            direccion: expect.any(String)
        })
        );
    })

    it("Deberia devolver un empleado con id 3.", async () => {
        const res = await request(app)
            .get("/empleados/3")
            .set("Accept", "application/json");


        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                idEmpleado: 3
            })
        )
    })
    it("Deberia crear un nuevo empleado.", async () => {
        const empleado = {
            nombre: "Ramona",
            dni: 29000000,
            legajo: 600,
            direccion: "montevideo 12"
        }
        const res = await request(app)
            .post("/empleados")
            .set("Accept", "application/json")
            .send(empleado)


        expect(res.statusCode).toEqual(200);
    })
    it("Deberia no crear un nuevo empleado por falta de campo obligatorio", async () => {
        const empleado = {
            nombre: "Temistocles",
            dni: null,
            legajo: 100,
            direccion: "av siempre viva 45"
        }
        const res = await request(app)
            .post("/empleados")
            .set("Accept", "application/json")
            .send(empleado)


        expect(res.statusCode).toEqual(404);
        expect(res?.body ?? null).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            })
        )
    })
    it("Deberia modificar un empleado que ya existe.", async () => {
        const empleados = {
            nombre: "Ramona",
            dni: 29000000,
            legajo: 400,
            direccion: "montevido 1000"
        }
        const res = await request(app)
            .put("/empleados")
            .set("Accept", "application/json")
            .send(empleados)


        expect(res.statusCode).toEqual(200);
    })
    it("Deberia borrar un empleado de la db.", async () => {
        const dniEmpleado = 29000000
        let res = await request(app)
            .get("/empleados")
            .set("Accept", "application/json");
        let cantidadAntesDeBorrado = res?.body?.length

        res = await request(app)
            .delete("/empleados/" + dniEmpleado)
            .set("Accept", "application/json")

        expect(res.statusCode).toEqual(200);

        res = await request(app)
            .get("/empleados")
            .set("Accept", "application/json");

        expect(res?.body?.length).toBeLessThan(cantidadAntesDeBorrado)
    })
})