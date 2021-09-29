let arr=[12,13,45,23,45,23,54,22,45,21,37,89,45,8,3,28,3,5,6,9,1,99,65,37];
let filtered;
console.log("before normal function=",filtered);
filtered=arr.filter((x) => x % 2 === 0)
console.log("after normal function=",filtered);

//let arr=[12,13,45,23,45,23,54,22,45,21,37,89,45,8,3,28,3,5,6,9,1,99,65,37];
var filtered1;
console.log("before setTimeout=",filtered1);
setTimeout(() => {
    filtered1=arr.filter((x) => x % 2 === 0);
    console.log("inside setTimeout=",filtered1);
},0);
console.log("after setTimeout=",filtered1);
