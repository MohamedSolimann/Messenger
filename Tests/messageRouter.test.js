const app = require("../index");
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");

const messageRouterTests = () => {
  describe("Create end point test cases", () => {
    it("Suppose to Create a new message", async () => {
      let messageId = mongoose.Types.ObjectId();
      let senderId = mongoose.Types.ObjectId();
      let recieverId = mongoose.Types.ObjectId();
      const response = await request.post("/messages").send({
        _id: messageId,
        senderId,
        recieverId,
        body: "asdfasdf",
      });
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Success");
    });
  });
};

module.exports = messageRouterTests;
// testDbSetUp();
