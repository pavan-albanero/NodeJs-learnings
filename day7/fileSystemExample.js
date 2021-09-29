const fs = require("fs");

// Asynchronous read
fs.readFile('input.txt', function (err, data) {
   if (err) {
      return console.error('Asynchronous error =',err);
   }
   console.log("Asynchronous read: " + data.toString());
   console.log("-------------------------------------");
});

// Synchronous read
const data = fs.readFileSync('input.txt');
console.log("Synchronous read= " + data.toString());
console.log("-------------------------------------");

console.log("Going to write into existing file");
fs.appendFile('input.txt', 'Simply Easy Learning!', function(err) {
   if (err) {
      return console.error(err);
   }
});

console.log("Program Ended");
console.log("-------------------------------------");