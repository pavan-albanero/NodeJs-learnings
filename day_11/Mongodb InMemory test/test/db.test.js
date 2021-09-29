const { MongoMemoryServer } =require('mongodb-memory-server');
const chai = require("chai");
//let expect = chai.expect;
let chaiHttp = require("chai-http");
chai.use(chaiHttp);
const dbHandler=require("./db-handler");
let server = require('../app.js');
const logger=require('../util/logger.js');

beforeAll(async () => await dbHandler.dbConnect());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.dbDisconnect());

describe("POST /users", () => {

    /* beforeEach(() => {
       createUser.mockReset()
       createUser.mockResolvedValue(0)
     });*/
 
     it(" get users",async ()=> 
         {
             try {
             const res = await chai.request(server).get("/users");
             
             expect(res.status).toBe(200);
             }catch(err) {
                 console.log(err);
                 logger.error("",err);
             }
         });
      } );

      describe("users",()=>{
        describe("/GET /users/:id",()=>{
            it(" get one user",async ()=> 
            {
                try {
                const res = await chai.request(server).get("/users/614b1dcb62993a8ef6f47812");
                //expect(res.statusCode).to.equal(200);
                expect(res.status).toBe(200);
                expect(res.body).toMatchSnapshot();
                }catch(err) {
                    console.log(err);
                    logger.error("",err);
                }
            });
        });
    });
   
      describe("/POST/users",()=>{
        it("should add users",async()=> 
        {
            try {
            let user={
                firstname:"pavan",
                lastname:"dulam",
                age:23,
                followers: {},
                followings: {}
            }
            const res = await chai.request(server).post("/users").send(user);
            expect(res.status).toBe(200);
            expect(res.body).toMatchSnapshot();
           
          
        }catch(err) {
            console.log(err);
            logger.error("",err);
        }
        });
    });
    describe("/PATCH/users",()=>{
        it("should update users",async()=> 
        { 
            try {
            let user={
                firstname:"sham",
                lastname:"dulam",
                age:26,
                followers: {},
                followings:{}
            }
           // let user_id=userdata;
            const res = await chai.request(server).patch(`/users/614d7e65272093c24d506sad`).send(user);
            expect(res.status).toBe(200);
            expect(res.body).toMatchSnapshot();
        }catch(err) {
            console.log(err);
            logger.error("",err);
        }
        });
    }
    )
    describe("/DELETE/users/:id",()=>{
        try {
        it("should delete users",async()=> 
        {
           // let user_id=userdata;
            const res = await chai.request(server).delete(`/users/614d7e65272093c24d506ddd`);
            expect(res.status).toBe(200);
            
        })
    }catch(err) {
        console.log(err);
        logger.error("",err);
    }
    });

    

    describe("/GET/users/:id/followers",()=>{
        try {
        it("should show followers",async()=> 
        {
            //let user_id=userdata;
            //let followUser='614b1dcb62993a8ef6f47812';
            const follower = await chai.request(server).get(`/users/614d7e65272093c24d506ddb/followers`)
            
            //console.log("followers=",follower.body);
         
            expect(follower.status).toBe(200);
          
            
        })
    }catch(err) {
        console.log(err);
        logger.error("",err);
    }
    });
