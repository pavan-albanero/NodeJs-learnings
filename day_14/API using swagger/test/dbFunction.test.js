const chai = require("chai");
let expect = chai.expect;
let chaiHttp = require("chai-http");
let server = require("../db_functions/dbFunction.js");
const logger = require("../util/logger.js");
const sinon = require("sinon");
const { MongoMemoryServer } = require("mongodb-memory-server");
const dbHandler = require("./db-handler");
chai.use(chaiHttp);
let userdata;
beforeAll(async () => await dbHandler.dbConnect());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.dbDisconnect());
describe("users dbFunction test", () => {
  describe("server.findall", () => {
    it(" get users", async () => {
      let spy = sinon.spy(server, "findall");
      let response = await server.findall();
      expect(response).to.be.a("array");
      expect(spy.calledOnce).to.be.true;
    });
  });

  describe("server.findone(user)", () => {
    it("should get one users", async () => {
      let spy = sinon.spy(server, "findone");
      const res = await server.findone("6154c00bf63afb9913b81099");
      expect(spy.calledOnce).to.be.true;
      expect(res).to.be.a("object");
    });
  });
  describe("add insertone", () => {
    it("should add users", async () => {
      let user = {
        firstname: "pavan",
        lastname: "dulam",
        age: 23,
        followers: {},
        followings: {},
      };
      const res = await server.insertone(user);

      expect(res.acknowledged).to.be.true;
    });
  });

  describe("server.updateOneUser(user)", () => {
    it("should update users", async () => {
      let user = {
        firstname: "sham",
        lastname: "dulam",
        age: 26,
      };

      const res = await server.updateone("6154c00bf63afb9913b81099", user);

      expect(res.acknowledged).to.be.true;
      expect(res).to.be.a("object");
    });
  });

  describe("server.deleteone", () => {
    it(" delete one user", async () => {
      let res = await server.deleteone("615068f7ba2da0b35395dfd3");

      expect(res.acknowledged).to.be.true;
    });
  });

  describe("server.followone", () => {
    it(" follow user", async () => {
      let res = await server.followone(
        "6154a6b6141cdbeb6a3c35bd",
        "6154c00bf63afb9913b81099"
      );

      expect(res).to.be.true;
    });
  });

  describe("server.followone", () => {
    it(" follow user", async () => {
      let res = await server.showfollowers("6154a6b6141cdbeb6a3c35bd");

      expect(res).to.be.a("object");
    });
  });
});
