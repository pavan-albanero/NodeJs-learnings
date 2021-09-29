const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
class myApp{

        constructor()
        {
            console.log("constructor initialized");
        }

        callme(str){
            console.log(str);
        }

    add(x,y){
        let result;
        result =x+y;
        return result;
    }

    callAdd(x,y){
        this.callme("called me");
       
        let result = this.add(x,y);
        return result;
    }

    callTheCallback(callback){
        callback();
    }

    testPromises(){
        return new Promise(function(resolve,reject){
            setTimeout(()=> resolve(3),1000);
        }).then(function(result){
            return result * 2;
        });
    }

    xhrFn() {
        return new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest();
          xhr.open("post", "https://jsonplaceholder.typicode.com/posts", true);
    
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
              } else {
                reject(xhr.status);
              }
            }
          };
          xhr.send();
        })
          .then(function(result) {
            return result;
          })
          .catch(error => {
            return error;
          });
        }
}

module.exports=myApp;