function factorial(n){
    if(n==1)return 1;
    else return n * factorial(n-1);
}
console.log("factorial="+factorial(10000));