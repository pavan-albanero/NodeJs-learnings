const chai = require("chai");
let expect = chai.expect;
let chaiHttp = require("chai-http");
let server = require('../App.js');
const logger=require('../logger.js');

chai.use(chaiHttp);
let userdata;
describe("users",()=>{
    describe("/GET /users",()=>{
        it(" get users",async ()=> 
        {
            try {
            const res = await chai.request(server).get("/users");
            //expect(res.statusCode).to.equal(200);
            expect(res).to.have.status(200);
            }catch(err) {
                console.log(err);
                logger.error("",err);
            }
        });
    });

    describe("users",()=>{
        describe("/GET /users/:id",()=>{
            it(" get one user",async ()=> 
            {
                try {
                const res = await chai.request(server).get("/users/614b1dcb62993a8ef6f47812");
                //expect(res.statusCode).to.equal(200);
                expect(res).to.have.status(200);
                }catch(err) {
                    console.log(err);
                    logger.error("",err);
                }
            });
        });
    });
    describe("/POST/users",()=>{
        it("should get users",async()=> 
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
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.a("object");
            userdata=res.body.insertedIds[0];
            console.log("user id=",userdata);
        }catch(err) {
            console.log(err);
            logger.error("",err);
        }
        });
    }
    )
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
            let user_id=userdata;
            const res = await chai.request(server).patch(`/users/${user_id}`).send(user);
            expect(res.statusCode).to.equal(200);
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
            let user_id=userdata;
            const res = await chai.request(server).delete(`/users/${user_id}`);
            expect(res.statusCode).to.equal(200);
        })
    }catch(err) {
        console.log(err);
        logger.error("",err);
    }
    });

    describe("/PUT/users/:id/follow",()=>{
        try {
        it("should follow users",async()=> 
        {
           let user_id=userdata;
            let followUser='614b1dcb62993a8ef6f47812';
            /*let datasend={
                followers: {"_id" :'614b1dcb62993a8ef6f47812'},
                followings: {"_id" :'614d9605a0a9af07db1d10ee'}}*/
            const follow = await chai.request(server).put(`/users/${user_id}/follow`).send({ 'followers':{"_id" :'614b1dcb62993a8ef6f47812'}});
            const following = await chai.request(server).put(`/users/614b1dcb62993a8ef6f47812/follow`).send({ 'followings':{'userid' :'614d82433f723630bda681e4'}});
            console.log("follow=",follow.body.followers);
            console.log("following=",following.body.followings);
            expect(follow).to.have.status(200);
            expect(following).to.have.status(200);
            //expect(follow.statusCode).to.equal(200);
           // expect(following.statusCode).to.equal(200);
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
         
            expect(follower.statusCode).to.equal(200);
            
        })
    }catch(err) {
        console.log(err);
        logger.error("",err);
    }
    });
})