const chai = require("chai");
let expect = chai.expect;
let chaiHttp = require("chai-http");
let server = require("../app.js");
const logger = require("../util/logger.js");
const sinon = require("sinon");
chai.use(chaiHttp);

describe("users Route test", () => {
  describe("sinon", () => {
    it.skip(" get users", async () => {
      const res = await chai.request(server).get("/users");
      let spy = sinon.spy(res);
      //expect(res.statusCode).to.equal(200);
      expect(res).to.have.status(200);
      expect(spy.calledOnce).to.be.true;
    });
  });
});
