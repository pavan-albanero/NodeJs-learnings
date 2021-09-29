const fs = require("fs");

console.log("Going to write into existing file");
fs.readFile('input1.txt', function (err, data) {
    if (err) {
       return console.error(err);
    }
    console.log("Asynchronous read: " + data.toString());
 });
 console.log("-------------------------------------");

fs.writeFile('input1.txt', 'Simply Easy Learning!', function(err) {
   if (err) {
      return console.error(err);
   }
   
   console.log("Data written successfully!");
   console.log("Let's read newly written data");
   console.log("-------------------------------------"); 
});

console.log("Program Ended");
console.log("-------------------------------------");