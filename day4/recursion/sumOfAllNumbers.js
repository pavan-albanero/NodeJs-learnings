/**
 * Write a function sumTo(n) that calculates the sum of numbers 1 + 2 + ... + n.

For instance:

sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
 */
//using loop
function sumTo(n) {
    let sum = 0;
    for (let i = 0; i < n; i++){
        sum=sum + i;
    }
    console.log("using loop"+sum);
}
//using recursion
function rec(n) {
    if(n == 1) return 1;
    else{
        return n+rec(n-1);
    }
    
}

 //best case
//using formula 
function formula(n) {
    if(n == 1) return 1;
    else{
        return n * (n+1) / 2;
    }
}

//driver 
sumTo(100000);
console.log("recursion"+rec(10000));
console.log("using formula"+formula(100000));