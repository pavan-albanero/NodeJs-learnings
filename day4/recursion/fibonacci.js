 //recursive
 function fib(n)
 { return n<=1?n:fib(n-1)+fib(n-2);
 }

 //fastest way to
 function fastFib(n){
let a=1;
let b=1;
for(let i=3;i<=n;i++){
    let c=a+b;
    a=b;
    b=c;  
}
return b;
 }
console.log(fib(1));
console.log(fib(2));
console.log(fib(3));
console.log(fib(4));
console.log(fib(5));

//fastest way 
console.log(fastFib(77));
console.log(fastFib(100));
console.log(fastFib(200));
console.log(fastFib(10000));