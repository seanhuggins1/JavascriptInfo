/**
 * Asyncronous Iteration allows us to iterate over data that comes asynchronously, on-demand
 */

 //recall iterables
 let range = {
      from: 1,
      to: 5,

      [Symbol.iterator]() {   //the function called to get the object's iterator
            return {    //returns the iterator with .next() method
                  current: this.from,     //initializes current and last
                  last: this.to,
                  next() {    //called every iteration to get the next value
                        if (this.current <= this.last) {
                              return { done: false, value: this.current++};
                              //returns an object with {done: true/false, value: <loop value>}
                        } else {
                              return { done: true }
                        }
                  }
            };
      }
}


for (let value of range) {    //calls [Symbol.iterator]() method once, which returns an iterator
      alert(value);
}


//Async Iterable

let range = {
      from: 1,
      to: 5,
      [Symbol.asyncIterator]() {
            return {
                  current: this.from,
                  last: this.to,
                  async next() {
                        //we can use await inside the async next
                        await new Promise(resolve => setTimeout(resolve, 1000));

                        if (this.current <= this.last) {
                              return { done: false, value: this.current++};
                        } else {
                              return { done: true };
                        }
                  }
            };
      }
};


(async () => {
      for await (let value of range) {
            alert(value);
      }
})()



//ASYNCHRONOUS GENERATORS
async function* generateSequence(start, end){
      for (let i = start; i <= end; i++){
            //can use await now
            await new Promise(resolve => {return setTimeout(resolve, 1000)});
      }
}


let range = {
      from: 1,
      to: 5,
      async *[Symbol.asyncIterator]() {
            for(let value = this.from; value <= this.to; value++){
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  yield value;
            }
      }
};

(async () => {
      for await (let value of range) {
            alert(value);
      }
})()



/**
 * REAL LIFE USE CASE
 */
//Paginated data

//there are many online services that return paginated data (a page of users for example)
//provides a URL to the next page

//GITHUB


async function* fetchCommits(repo){
      let url = new URL(`https://api.github.com/repos/${repo}/commits`);

      while (url) {
            const response = await fetch(url, {
                  headers: {'User-Agent': 'Our script'},
            });
            const body = await response.json();

            //response body has the next URL as well as the page of commits
            let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
            nextPage = nextPage?.[1];
            url = nextPage

            for(let commit of body) {
                  yield commit;     //yieldss commits one by one and handles pagination
            }

      }

}


(async () => {
      let count = 0;
      for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {
            console.log(commit.author.login);
            if (++count == 100) {
                  break;
            }
      }
})()