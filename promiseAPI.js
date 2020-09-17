/**
 * Promise.all
 */

 let promise = Promise.all([
    new Promise((resolve) => {
        setTimeout(() => resolve(1), 3000)
    }),
    new Promise((resolve) => {
        setTimeout(() => resolve(2), 2000)
    }),
    new Promise((resolve) => {
        setTimeout(() => resolve(3), 1000)
    })
 ])
 .then(alert);

 //order of results is the same the order of the source promises


 //Common trick is to map an array of job data into an array of promises
 //and then wrap that into Promise.all

 let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://api.github.com/users/jeresig'
];

//map every url to the promise of the fetch
let requests = urls.map((url) => {
    return fetch(url);
})

//use promise.all to wait until all jobs are resolved
Promise.all(requests)
    .then(responses => responses.forEach(
        response => alert(`${response.url}: ${response.status}`)
    ));

/**
 * Another example
 * fetch user information by name
 */

 let names = ['iliakan', 'remy', 'jeresig'];

 let requests = names.map((name) => {
    return fetch(`https://api.github.com/users/${name}`);
 })

 Promise.all(requests)
    .then((responses) => {
        //all responses are resolved successfully
        for (let response of responses)
        {
            alert(`${response.url}: ${response.status}`);
        }
    })
    //map array of responses into an array of response.json() to read their content
    .then((responses) => {
        return Promise.all(responses.map(response => response.json()))
    })
    .then(users => users.forEach(user => alert(user.name)));

    //IF ANY promises in Promise.all([]) reject, the promise returned by Promise.all immediately rejects with that error
    //EG

Promise.all([
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(1), 1000)
    }),
    new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("Whoops!")), 2000)
    }),
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(3), 3000)
    })
])
.catch(alert);
//if one promise rejects, the others will continue executing, and they may settle
//but Promise.all will no longer be watching them
//Promise.all doesn't cancel the other promises (no concept of cancellation in promises)

//Promise.all(iterable) allows for passing non-promise values through to the result array

let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://no-such-url'
];

Promise.allSettled(urls.map((url) => {
    return fetch(url);
}))
.then((results) => {
    results.forEach((result, num) => {
        if (result.status == "fulfilled") {
            alert(`${urls[num]}: ${result.value.status}`);
        }
        if (result.status == "rejected") {
            alert(`${urls[num]}: ${result.reason}`);
        }
    });
});

/**
 * Polyfill
 */
//easy to polyfill Promise.allSettled if the browser doesn't support it

/**
 * Promise.race
 */
//waits for only the first settled promise

/**
 * Promise.resolve, reject
 */

let promise = Promise.resolve(value);

//same as

let promise = new Promise(resolve => resolve(value));


//following example only loads a url if it is not already cached
let cache = new Map();
function loadCached(url) {
    //if the url is cached, return an already resolved promise
    if(cache.has(url)) {
        return Promise.resolve(cache.get(url));
    }
    return fetch(url)
        .then(response => response.text())
        .then(text => {
            cache.set(url, text);
            return text;
        })
}

//.then can always be used after a loadCached(url), because even if the url is cached
//loadCached will return a promise

Promise.reject(error);
//is the same as

let promise = new Promise((resolve, reject) => {
    reject(error);
});
//which is almost never used