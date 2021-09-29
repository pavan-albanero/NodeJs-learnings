
const promise1 = Promise.resolve('hello world');
const promise2 = 10;
const promise3= new Promise((resolve, reject) => 
            setTimeout(resolve, 2000,'Goodbye')
            );


Promise.all([promise1, promise2, promise3])
        .then(value => console.log(value));

        //o/p after 2sec (longest wait time)
        //[ 'hello world', 10, 'Goodbye' ]