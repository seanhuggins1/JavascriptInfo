

new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000); //resolve after 1000ms, with the value 1
}).then(function(result) {
    alert(result);  // 1
    return result * 2;
}).then(function(result) {
    alert(result); // 2 
    return result * 2;
}).then(function(result) {
    alert(result); // 4
    return result * 2;
});

//Result is passed through the chain of .then handlers
//promise.then returns a promise
//when a handler returns a value it becomes the result of that promise,
//the next .then is called with the value

//adding many .then to a single promise is not chaining e.g

// let promise = new Promise(function(resolve, reject) {
//     setTimeout(() => resolve(1), 1000);
// });

// promise.then(function(result) {
//     alert(result); // 1
//     return result * 2;
// });

// promise.then(function(result) {
//     alert(result); // 1
//     return result * 2;
// });

// promise.then(function(result) {
//     alert(result); // 1
//     return result * 2;
// });

//these don't pass the result to eachother, they process the result separately



//Can return promises rather than values
//resolve of each promise is passed to the .then handler, for the next promise to use
new Promise(function(resolve, reject) {
    setTimeout(() => {
        resolve(1);
    }, 1000);
}).then(function(result) {
    alert(result);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(result * 2);
        }, 1000)
    });
}).then(function(result) {
    alert(result);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(result * 2);
        }, 1000)
    });
}).then(function(result){
    alert(result);
});

/**
 * Load script example
 */

function loadScript(src) {
    return new Promise(function(resolve, reject) {
        let script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.head.append(script);
    });
}


//THIS IS HOW YOU LOAD SHIT IN THE BACKGROUND
//USER IS NOT REQUIRED 
//TO WAIT FOR EVERYTHING TO LOAD BEFORE THEY CAN SEE AND INTERACT WITH PARTS OF THE SITE
loadScript("/article/promise-chaining/one.js")
    .then(function(script) {
        //once the first script has loaded, return a promise to load the second script
        return loadScript("/article/promise-chaining/two.js");
    })
    .then(function(script) {
        //once the second script has loaded, return a promise to load the third script
        return loadScript("/article/promise-chaining/three.js");
    })
    .then(function(script) {
        //use the functions declared in the scripts
        one();
        two();
        three();
    });

//code can be made shorter with arrow functions
loadScript("/article/promise-chaining/one.js")
    .then(script => loadScript("/article/promise-chaining/two.js"))
    .then(script => loadScript("/article/promise-chaining/three.js"))
    .then(script => {
        one();
        two();
        three();
    });

/**
 * Fetch example
 */

 //promises are often used for network requests

 let promise = fetch(url);
 //makes a network request to the URL, and returns a promise
 //the promise resolves with a response object when the server responds with headers
 //but before the full response is downloaded

//to read the full response, call response.text()
//returns a promse that resolves, when the full text is downloaded from the remote server
//with the text as the result

fetch('/article/promise-chaining/user.json')    //returns a promise once the server responds with headers
    .then(response => { return response.text();})   //returns a promise once the text is fully loaded
    .then(text => { alert(text) });

//response object also has JSON

fetch('/article/promise-chaining/user.json')
    .then(response => response.json())
    .then(user => alert(user.name));

//Now we can do stuff with the user

//make a request for user.json
fetch('/article/promise-chaining/user.json')
    //Load it as JSON
    .then(response => response.json())
    .then(user => fetch(`https://api.github.com/users/${user.name}`))
    .then(response => response.json())
    //show the avatar image from github
    .then(githubUser => {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);
        setTimeout(() => {
            img.remove()
        }, 3000);
    })

//the last .then does not return a promise, needed to add anymore .then handlers
//we can return a new promise and resolve it after removing the image, to allow for more .thens

fetch('/article/promise-chaining/user.json')
    //Load it as JSON
    .then(response => response.json())
    .then(user => fetch(`https://api.github.com/users/${user.name}`))
    .then(response => response.json())
    //show the avatar image from github
    .then(githubUser => {
        return new Promise((resolve, reject) => {
            let img = document.createElement('img');
            img.src = githubUser.avatar_url;
            img.className = "promise-avatar-example";
            document.body.append(img);

            //kill the image and resolve the promise
            setTimeout(() => {
                img.remove();
                resolve(githubUser);
                
            }, 3000);
        });
    })
    .then(githubUser => alert(`Finished showing ${githubUser.name}`));

    //the code can be split into reusable functions

    function loadJson(url) {
        return fetch(url)
            .then(response => response.json())
    }

    function loadGithubUser(name) {
        return fetch(`https://api.github.com/users/${name}`)
        .then(response => response.json());
    }

    function showAvatar(githubUser) {
        return new Promise((resolve, reject) => {
            let img = document.createElement('img');
            img.src = githubUser.avatar_url;
            img.className = "promise-avatar-example";
            document.body.append(img);

            //kill the image and resolve the promise
            setTimeout(() => {
                img.remove();
                resolve(githubUser);
                
            }, 3000);
        });
    }
    //USE THEM ALL
    loadJson('/article/promise-chaining/user.json')
        .then(user => loadGithubUser(user.name))
        .then(showAvatar)
        .then(githubUser => alert(`Finished showing ${githubUser}`))