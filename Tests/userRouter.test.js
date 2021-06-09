const app = require("../index");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const request = supertest(app);
describe("Create end point test cases", () => {
  it("Suppose to Create a new user", async () => {
    const response = await request.post("/users").send({
      username: "mohamed",
      password: "mohamedd",
      mobile: 123,
    });
    expect(response.status).toBe(201);
    expect(response.body.newUser.username).toBe("mohamed");
    expect(response.body.newUser.mobile).toBe(123);
  });
  it("Suppose to get mobile validation error", async () => {
    const response = await request.post("/users").send({
      username: "mohamed",
      password: "mohamedd",
      mobile: "123",
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Mobile must be a Number!");
  });
  it("Suppose to get password validation error", async () => {
    const response = await request.post("/users").send({
      username: "mohamed",
      password: "123",
      mobile: 123123,
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Password must be 8 characters or more!");
  });
});
