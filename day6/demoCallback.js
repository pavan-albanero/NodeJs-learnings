/*const posts=[{title: 'post one',body:'this is post one'},
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
        setTimeout(()=>{
            posts.push(post);
        },2000);
    }
    getPosts();
    createPost({title: 'post three',body: 'this is post three'});

    //output after 1sec 
    //{ title: 'post one', body: 'this is post one' }
    //{ title: 'post two', body: 'this is post two' }*/

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
    function createPost(post,callback){
        setTimeout(()=>{
            posts.push(post);
            callback();
        },2000);
    }
    
    createPost({title: 'post three',body: 'this is post three'},getPosts);

    //output after 2sec
    //{ title: 'post one', body: 'this is post one' }
    //{ title: 'post two', body: 'this is post two' }
    //{ title: 'post three', body: 'this is post three' } 