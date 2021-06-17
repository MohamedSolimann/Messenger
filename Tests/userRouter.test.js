const app = require("../index");
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { createNewUser } = require("../Models/user/index");

const UserRouterTests = () => {
  describe("Create end point test cases", () => {
    it("Suppose to Create a new user", async () => {
      let userId = mongoose.Types.ObjectId();
      const response = await request.post("/users").send({
        _id: userId,
        username: "mohamed",
        password: "mohamedd",
        mobile: 12345678910,
      });
      expect(response.status).toBe(201);
      expect(response.body.newUser.username).toBe("mohamed");
      expect(response.body.newUser.mobile).toBe(12345678910);
    });
    it("Suppose to get mobile validation error in type", async () => {
      const response = await request.post("/users").send({
        username: "mohamed",
        password: "mohamedd",
        mobile: "12345678910",
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Mobile must be a Number");
    });
    it("Suppose to get mobile validation error in length", async () => {
      const response = await request.post("/users").send({
        username: "mohamed",
        password: "mohamedd",
        mobile: 123,
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Mobile must be 11 digits");
    });
    it("Suppose to get mobile validation error in type and length", async () => {
      const response = await request.post("/users").send({
        username: "mohamed",
        password: "123123123",
        mobile: "123123",
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Mobile must be a Number and 11 digits!"
      );
    });
    it("Suppose to get password validation error", async () => {
      const response = await request.post("/users").send({
        username: "mohamed",
        password: "123",
        mobile: 123123,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Password must be 8 characters or more!"
      );
    });
  });

  describe("Read end point test cases", () => {
    it("Suppose to get user by id", async () => {
      const newUser = await createNewUser(request);
      let newUserId = newUser._id;
      const response = await request.get("/users/" + newUserId);

      expect(response.status).toBe(200);
      expect(response.body.user._id).toBe(newUserId);
      expect(response.body.user.username).toBe(newUser.username);
      expect(response.body.user.mobile).toBe(newUser.mobile);
    });
    it("Suppose to get user not found", async () => {
      const response = await request.get("/users/123");
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid user id!");
    });
  });

  describe("Updated end point test cases", () => {
    it("Suppose to update  all user info", async () => {
      const newUser = await createNewUser(request);
      let newUserId = newUser._id;
      const response = await request.put("/users/" + newUserId).send({
        username: "asdf",
        mobile: 12312883121,
      });
      expect(response.status).toBe(201);
      expect(response.body.user.username).toBe("asdf");
      expect(response.body.user.mobile).toBe(12312883121);
    });
    it("Suppose to update user username", async () => {
      const newUser = await createNewUser(request);
      let newUserId = newUser._id;
      const response = await request.put("/users/" + newUserId).send({
        username: "asdf",
      });
      expect(response.status).toBe(201);
      expect(response.body.user.username).toBe("asdf");
      expect(response.body.user.mobile).toBe(12345678910);
    });
    it("Suppose to update user mobile", async () => {
      const newUser = await createNewUser(request);
      let newUserId = newUser._id;
      const response = await request.put("/users/" + newUserId).send({
        mobile: 12312883121,
      });
      expect(response.status).toBe(201);
      expect(response.body.user.username).toBe("mohamed");
      expect(response.body.user.mobile).toBe(12312883121);
    });
  });

  describe("Delete end point test cases", () => {
    it("Suppose to delete user by id", async () => {
      const newUser = await createNewUser(request);
      let newUserId = newUser._id;
      const res = await request.delete("/users/" + newUserId);
      const response = await request.get("/users/" + newUserId);
      expect(res.status).toBe(200);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User not found!");
    });
    it("Suppose to get user not found", async () => {
      const response = await request.get("/users/123");
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid user id!");
    });
  });
  describe("SignIn end point test cases", () => {
    it("Suppose to signin a user", async () => {
      const newUser = await createNewUser(request);
      const response = await request.post("/users/signin").send({
        mobile: 12345678910,
        password: "mohamedd",
      });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Success");
      expect(response.body.userId).toBe(newUser._id);
    });
    it("Suppose to get mobile incorrect ", async () => {
      const newUser = await createNewUser(request);
      const response = await request.post("/users/signin").send({
        mobile: 12121231111,
        password: "mohamedd",
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Incorrect mobile, please try again!");
    });
    it("Suppose to get password incorrect ", async () => {
      const newUser = await createNewUser(request);
      const response = await request.post("/users/signin").send({
        mobile: newUser.mobile,
        password: "asdf",
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Incorrect password, please try again!"
      );
    });
  });
};

module.exports = UserRouterTests;
// testDbSetUp();
