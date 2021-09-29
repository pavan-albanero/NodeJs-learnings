/**we’d like to have a simpler way to get commits.

Let’s make a function fetchCommits(repo) that gets commits for us,
 making requests whenever needed. And let it care about all pagination stuff.
  For us it’ll be a simple async iteration for await..of.

So the usage will be like this: */

/*async function* fetchCommits(repo){
    let url = `https://api.github.com/repos/${repo}/commits`;

    while(url){
        const response = await fetch(url,{
            headers: {'User-Agent': 'Our script'},});// github needs any user-agent heade
        const body=await response.json();
        let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
            nextPage = nextPage?.[1];
            url=nextPage;
            for(let commit of body){
                yield commit;
            }
        }
}*/
async function* fetchCommits(repo) {
    let url = `https://api.github.com/repos/${repo}/commits`;
  
    while (url) {
      const response = await fetch(url, { // (1)
        headers: {'User-Agent': 'Our script'}, // github needs any user-agent header
      });
  
      const body = await response.json(); // (2) response is JSON (array of commits)
  
      // (3) the URL of the next page is in the headers, extract it
      let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
      nextPage = nextPage?.[1];
  
      url = nextPage;
  
      for(let commit of body) { // (4) yield commits one by one, until the page ends
        yield commit;
      }
    }
  }
  (async () => {

    let count = 0;
  
    for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {
  
      console.log(commit.author.login);
  
      if (++count == 100) { // let's stop at 100 commits
        break;
      }
    }
  
  })();
  