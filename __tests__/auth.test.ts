import request from "supertest";
import { app } from "../src/app";

describe("User Test", () => {
  it("Register User Successfully", async () => {
    const user = {
      name: "tester 1",
      userName: "tester",
      password: "Admin@1234",
      email: "tester@yopmail.com",
      age: 19,
    };

    const response = await request(app).post(`/v1/auth/register`).send(user);

    // console.log(response.statusCode);
    expect(response.status).toBe(200);
  });

  it.todo("Login User");
  it.todo("Logout User");
});
