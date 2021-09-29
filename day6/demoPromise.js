const posts=[{title: 'post one',body:'this is post one'},
             {title: 'post two',body:'this is post two'}
            ];
    
    function getPosts(){
        setTimeout(()=>{
            posts.forEach((post,index)=>{
                console.log(post);
            });
        },1000);
    }
    function createPost(post){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                posts.push(post);
                const error=true; //for demo purposes
                if(!error){
                    resolve();
                }
                else{
                    reject('Error: Something went wrong');
                }
            },2000);
        });
        
    }
    
    createPost({title: 'post three',body: 'this is post three'})
                .then(getPosts)
                .catch(err=>console.log(err));

    //output after 2sec went error=false
    //{ title: 'post one', body: 'this is post one' }
    //{ title: 'post two', body: 'this is post two' }
    //{ title: 'post three', body: 'this is post three' } 


    //output when error=true;
    //Error: Something went wrong