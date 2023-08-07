const { INTEGER } = require('sequelize');
const request = require('supertest');
const app = "http://localhost:3001/api";

const modificacionProveedor = {
    id: null,
    nombre: 'Proveedor Modificado',
    email: 'proveedormodificado@gmail.com',
    telefono: 3517654321,
    fechaIng: new Date().toISOString(),
}

let listaProveedores = [];

describe('GET /api/proveedores', () => {
    it('Debería devolver cod 200 con un listado de proveedores no vacío', async () => {
        const res = await request(app)
            .get('/proveedores')
            .set('Accept', 'application/json')
        listaProveedores = res?.body;
        expect(res.status).toEqual(200)
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    nombre: expect.any(String),
                    email: expect.any(String),
                    telefono: expect.any(Number),
                    fechaIng: expect.any(String)
                })
            ])
        )
    })
})


describe("GET /api/proveedores/:id", function () {
    it("Respuesta OK codigo 200 con un proveedor encontrado ", async () => {
        const res = await request("localhost:3001").get(
            `/api/proveedores/${listaProveedores[0].id}`
        )
        expect(res.statusCode).toEqual(200)
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
        expect(res.body).toEqual(
            expect.objectContaining({
                id: 1,
                nombre: expect.any(String),
                email: expect.any(String),
                telefono: expect.any(Number),
                fechaIng: expect.any(String)
            })
        );
    }
    )
    it("Respuesta código 404 con mensaje proveedor no encontrado", async () => {
        const res = await request(app).get(
            "/proveedores/99"
        );
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual(
            expect.objectContaining(
                { mensaje: 'Proveedor inexistente!' }
            )
        );
    }
    )
});

describe('POST /proveedores', () => {
    it("Respuesta código 200 con proveedor creado", async () => {
        const res = await request(app).post(
            "/proveedores"
        )
            .set('Accept', 'application/json')
            .send({ nombre: 'Proveedor Supertest', email: 'proveedor_supertest1@gmail.com', telefono: 3511234567, fechaIng: new Date().toISOString() })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
            expect.objectContaining(
                {
                    id: expect.any(Number)
                }
            )
        )
    }
    )
})

describe("PUT /api/proveedores", () => {
    it("Deberia modificar el proveedor con éxito", async () => {
        modificacionProveedor.id = listaProveedores[0].id
        const res = await request(app).put("/proveedores").set('Accept', 'application/json').send(modificacionProveedor);
        console.log("🚀 ~ file: proveedores.test.js:109 ~ it ~ res:", res)
        expect(res.statusCode).toEqual(200);
    });
});

describe("DELETE /api/proveedor/:id", () => {
    it("Deberia borrar el proveedor con el id pasado por parámetro", async () => {
        const res = await request(app).delete(`/proveedor/${listaProveedores[listaProveedores.length - 1].id}`)
        console.log("🚀 ~ file: proveedores.test.js:118 ~ it ~ res:", res)
        expect(res.statusCode).toEqual(200)
    })
})