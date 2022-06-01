import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

let connection: Connection;

describe("List categories controller", () => {
  beforeAll(async () => {
    connection = await createConnection("localhost");
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    values ('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXX')
    `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com.br",
      password: "admin",
    });

    await request(app)
      .post("/categories")
      .set({ Authorization: `Bearer ${responseToken.body.token}` })
      .send({
        name: "Category integration",
        description: "Category integration desc",
      });
    
      const response = await request(app)
      .get("/categories")
      .set({ Authorization: `Bearer ${responseToken.body.token}` })
      .send({
        name: "Category integration",
        description: "Category integration desc",
      });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category integration");
  });
});
