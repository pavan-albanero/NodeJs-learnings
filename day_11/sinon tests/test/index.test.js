const chai=require('chai');
const expect=chai.expect;
const index=require('../index');
const sinon=require('sinon');
const chaiaspromise=require('chai-as-promised');
const nock = require("nock");
chai.use(chaiaspromise);

let obj= new index();

after(function() {
    console.log("===================== After the test suit");
  });
  before(function() {
    console.log("===================== Before the test suit");
  });
  afterEach(function() {
    console.log("======= After every test case  this test suit");
  });
  beforeEach(function() {
    // Sinon wrappers must be restored before or after a test case.
    // Hooks makes it easier implement
    sinon.restore();
    console.log("======= Before every test case this test suit");
  });

describe('addition',()=>{
    it('should add numbers',()=>{
    
        
        let res= obj.add(1,4);
       expect(res).to.be.equal(5);
        //add.restore();
    });

    it('spy the add method', function() {
            let spy=sinon.spy(obj, "add");
            let x=10,y=20;
            obj.callAdd(x,y);
           //sinon.assert.calledTwice(spy);
            expect(spy.calledOnce).to.be.true;
            expect(spy.calledWith(x,y)).to.be.true;
    });

    it('spy the callback method', function() {
        let callback=sinon.spy();
         obj.callTheCallback(callback);
         expect(callback.calledOnce).to.be.true;
    })

    it('mock the callme method', function() {
       let mock=sinon.mock(obj);
       let expectation = mock.expects("callme");
       expectation.exactly(1);
       expectation.withArgs("called me");
         obj.callAdd(10,20);
         mock.verify();
         
    })

   
});
describe('Test suit for stub',()=>{
    it('stub the add method', function() {
       
        let stub=sinon.stub(obj, 'add');
        stub.withArgs(10,20)
        .onFirstCall()
        .returns(100)
        .onSecondCall()
        .returns(200)
        expect(obj.callAdd(10,20)).to.be.equal(100);
        expect(obj.callAdd(10,20)).to.be.equal(200);
          
     });   
});

describe("Test the promise", function () {
it("Promise test case", function () {
    this.timeout(0);
    return expect(obj.testPromises()).to.eventually.equal(6);
    
  });
});

describe("XHR test suit", function() {
    it("Mock and stub xhr call", function(done) {
      var myobj = {"id":1};
      const scope = nock("https://jsonplaceholder.typicode.com")
        .post("/posts")
        .reply(200, myobj);
      obj
        .xhrFn()
        .then(function(result) {
            console.log(result)
          expect(result).to.be.eql(myobj);
          done();
        })
        .catch(error => {
          done(new Error("test case failed: " + error));
        });
    });
  });