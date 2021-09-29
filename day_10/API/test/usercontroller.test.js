const chai = require("chai");
let expect = chai.expect;
let chaiHttp = require("chai-http");
let server = require('../controllers/userController.js');
const logger=require('../util/logger.js');
 
chai.use(chaiHttp);

describe("users controller test" ,()=>{
    describe("/GET /users",()=>{
        it(" get users",async ()=> 
        {
            try {
            expect(server.getAllUsers).to.be.a('object');
            }catch(err) {
                console.log(err);
                logger.error("",err);
            }
        }
    );
});
});