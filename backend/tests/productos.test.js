const request = require("supertest");
const app = "http://localhost:3001/api";

const productoAlta = {
  Nombre: "Producto " + (() => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Precio: 10.5,
  FechaAlta: new Date().toISOString(),
  Activo: true,
};
const productoModificacion = {
  IdProducto: null,
  Nombre: "Producto " + (() => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Precio: 10.5,
  FechaAlta: new Date().toISOString(),
  Activo: true,
};

let listaProductos = [];
let idUltimoProducto = null;

// test route/productos GET
describe("GET /api/productos", () => {
  it("Deberia retornar todos los productos", async () => {
    const res = await request(app).get("/productos").set("Accept", "application/json");
    listaProductos = (res?.body) ?? [];
    idUltimoProducto = listaProductos[listaProductos.length - 1].IdProducto;
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdProducto: expect.any(Number),
          Nombre: expect.any(String),
          Precio: expect.any(Number),
          FechaAlta: expect.any(String),
          Activo: expect.any(Boolean)
        })
      ]),
    );
  });
});

// test route/producto/:id GET
describe("GET /api/producto/:id", () => {
  it("Deberia devolver el producto que se le pasa por parámetro", async () => {
    const res = await request(app).get(`/producto/${idUltimoProducto}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdProducto: expect.any(Number),
        Nombre: expect.any(String),
        Precio: expect.any(Number),
        FechaAlta: expect.any(String),
        Activo: expect.any(Boolean)
      })
    );
  });
});

// test route/productos POST
describe("POST /api/producto", () => {
  it("Deberia devolver el producto que acabo de crear", async () => {
    const res = await request(app).post("/producto").send(productoAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String)
      })
    );
  });
});

// test route/producto/:id PUT
describe("PUT /api/producto", () => {
  it("Deberia devolver el producto modificado", async () => {
    productoModificacion.IdProducto = idUltimoProducto;
    const res = await request(app).put("/producto").set("Accept", "application/json").send(productoModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/producto/:id DELETE
describe("DELETE /api/producto/:id", () => {
  it("Deberia borrar el producto con el id pasado por parámetro", async () => {
    const res = await request(app).delete(`/producto/${idUltimoProducto}`);
    expect(res.statusCode).toEqual(200);
  });
});
