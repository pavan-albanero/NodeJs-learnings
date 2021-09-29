const chai = require("chai");
let expect = chai.expect;
let chaiHttp = require("chai-http");
let server = require('../controllers/userController.js');
const logger=require('../util/logger.js');
 const sinon=require('sinon');
chai.use(chaiHttp);
let userdata;
describe("users controller test" ,()=>{
    describe("server.getAllUsers",()=>{
        it(" get users",async ()=> 
        {
            let spy = sinon.spy(server,"getAllUsers");
                let response = chai.request( server.getAllUsers);
                expect(response).to.be.a('object');
               // expect(spy.calledOnce).to.be.true;
        }
    );
});

describe("server.addOneUser(user)",()=>{
    it("should get users",async()=> 
    {
       
        let user={
            firstname:"pavan",
            lastname:"dulam",
            age:23,
          
        }
        const res =  chai.request(server.addOneUser(user));
        expect(res).to.be.a("object");
    
 
    });
});

describe("server.updateOneUser(user)",()=>{
    it("should update users",async()=> 
    { 
        let user={
            firstname:"sham",
            lastname:"dulam",
            age:26,
            
        }
       // let user_id=userdata;
        const res =  chai.request(server.updateOneUser(user));
        expect(res).to.be.a("object");

    });
});


    describe("server.getOneUser",()=>{
        it(" get one user",async ()=> 
        {
            logger.info("server.getOneUser=",server.getOneUser('615068f7ba2da0b35395dfd3'))
            return server.getOneUser('615068f7ba2da0b35395dfd3')
      .then(response => {
        //expect an object back
        expect(typeof response).to.equal('object');

        //Test result of name, company and location for the response
        expect(response.firstname).to.equal('roy')
       // expect(response.company).to.equal('GitHub')
      //  expect(response.location).to.equal('San Francisco')
      });
           
           /* const res =  chai.request(await server.getOneUser('615068f7ba2da0b35395dfd3'))
           logger.info("server.getOneUser() response=",res)
            expect(res.firstname).to.be.true;*/
          
        });

});

});