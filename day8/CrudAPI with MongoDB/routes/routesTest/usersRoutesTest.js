let chai= require('chai');
let chaiHttp = require('chai-http');
let user= require('./routes/usersRoutes');
let expect = chai.expect;
//chai.should();
chai.use(chaiHttp);
let userdata;

describe('UserRoutes', ()=>{

     describe("users",()=>{
          describe("/GET /users",()=>{
              it("should get users",async()=> 
              {
                  const res = await chai.request(user).get('/users/');
                   expect(res).to.have.status(200);
                   //res.should.have.status(200);
                  
                  
              })
              
          }
          )});
   //get all routes
 /* describe('/users', ()=>{
    
       it("should get all users", async ()=>{
          await  chai.request(user)
            .get('/users/')
            .end((err,response)=>{
                 response.should.have.status(200);
                 
            });
           
       });
       it("should not get all users",  (done)=>{
        chai.request(user)
        .get('/users')
        .end((err,response)=>{
             response.should.have.status(404);
             done();
        });
        
   });
   
});

describe('/users/:id',()=>{
    
    it("should get one user",(done)=>{
        const id= '614b048f00e93edd9e15800f';
         chai.request(user)
         .get('/users/614b048f00e93edd9e15800f')
         .end((err,response)=>{
              response.should.have.status(200);
              //response.body.should.be.a('object');
              done();
         });
         
    });
    it("should not get one user",  (done)=>{
     chai.request(user)
     .get("/users/614b048f00e93edd9e15800f")
     .end((err,response)=>{
          response.should.have.status(404);
          done();
     });
     
});

});

describe('Post /users',()=>{
     
     it("should add one user",(done)=>{
          const obj={ firstname:'pavan',
          lastname:'dulam' };
          chai.request(user)
          .post('/users')
          .send(obj)
          .end((err,response)=>{
               response.should.have.status(200);
             userdata=response.body;
               done();
          });
         
     });
  
 
 });

 describe('Put /users',()=>{
     
     it("should add one user",(done)=>{
          //const id=userdata._id;
          const obj={ firstname:'pavan',
          lastname:'dulam' };
          chai.request(user)
          .patch(`/users/614b048f00e93edd9e15800f`)
          .send(obj)
          .end((err,response)=>{
               should.not.exist(err);
               //response.should.have.status(200);
              // response.body.should.be.a('object');
               response.body.should.have.property('firstname').eq('pavan');
               //response.body.should.have.property('lastname').eq('dulam');
               done();
          });
         
     });
  
 
 });*/



});

