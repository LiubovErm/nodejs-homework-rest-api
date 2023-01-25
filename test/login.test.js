const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");
require("dotenv").config();
const { DB_HOST, PORT = 3000 } = process.env;

describe("test login controller", () => {
  let server;
  beforeAll(() => {
    mongoose
      .connect(DB_HOST)
      .then(() => {
        server = app.listen(PORT);
      })
      .catch((error) => {
        console.log(error.message);
        process.exit(1);
      });
  });

  afterAll((done) => {
    mongoose.disconnect(done);
    server.close();
  });

  test("login success", async () => {
    const {
      status,
      body: {
        data: { user, token },
      },
    } = await request(app)
      .post("/api/auth/login")
      .set("Content-type", "application/json")
      .send({
        email: "test@gmail.com",
        password: "123456789",
      });

    expect(status).toBe(200);
    expect(typeof user).toBe("object");
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
    expect(typeof token).toBe("string");
  });

  test("login without email", async () => {
    const {
      status,
      body: { message },
    } = await request(app)
      .post("/api/auth/login")
      .set("Content-type", "application/json")
      .send({
        password: "123456789",
      });

    expect(status).toBe(400);
    expect(message).toBe('"email" is required');
  });

  test("login without password", async () => {
    const {
      status,
      body: { message },
    } = await request(app)
      .post("/api/auth/login")
      .set("Content-type", "application/json")
      .send({
        email: "test@gmail.com",
      });

    expect(status).toBe(400);
    expect(message).toBe('"password" is required');
  });

  test("login with incorrect password", async () => {
    const {
      status,
      body: { message },
    } = await request(app)
      .post("/api/auth/login")
      .set("Content-type", "application/json")
      .send({
        email: "test@gmail.com",
        password: "11111111",
      });

    expect(status).toBe(401);
    expect(message).toBe("Password is wrong");
  });
});
