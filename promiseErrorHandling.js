//code below the URL to fetch is wrong, .catch handles the error

fetch('https://no-such-server.blabla') //rejects
    .then(response => response.json())
    .catch(err => alert(err)) //TypeError: failed to fetch (the text may vary)

//the error jumps past promises until it finds a catch

//Maybe everything is alright with the site, but the response is not valid
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
  .catch(error => alert(error.message));

//normally such a catch doesn't trigger at all
//if ANY of the promises above reject, the catch will catch it

/**
 * IMPLICIT try...catch
 */
new Promise((resolve, reject) => {
    throw new Error("Whoops!");
}).catch(alert);

//works exactly the same as
new Promise((resolve, reject) => {
    reject(new Error("Whoops!"));
}).catch(alert);

//we can also throw inside a then

new Promise((resolve, reject) => {
    resolve("ok");
}).then((result) => {
    throw new Error("Whoops!");
}).catch(alert);

//final catch not only catches explicit rejections reject(), and throw, but also accidental errors

/**
 * RETHROWING
 */
//We can throw inside a .catch if we are unable to handle the error
//pass it to the next closest error handler

//execution: catch -> catch
new Promise((resolve, reject) => {
    throw new Error("Whoops!");
})
.catch(function(error) {
    if (error instanceof URIError) {
        //handle it
    } else {
        alert("Can't handle such an error");
        throw error; //rethrow the error! jump to the next catch
    }
})
.then(function() {
    /* this doesn't run */
})
.catch((error) => {
    alert(`the unknown error has occured: ${error}`);
});


/**
 * Unhandled rejections
 */

 //what happens to an error when it's not handled?

new Promise(function() {
    noSuchFunction() //error here
})
.then(() => {
    //successful promise handlers!
}); //without a .catch?

//if there's an error, the promise becomes rejected, but if there's no .catch
//for the rejection, the error gets stuck
//script will die and there will be a message in the console



//In the browser, we can catch unhandled errors using an event unhandledrejection

window.addEventListener('unhandledrejection', function(event) {
    alert(event.promise);   // [object Promise] - the promise object that generated the error
    alert(event.reason);    // Error: Whoops! - reason for the unhandled error
})

new Promise(function() {
    throw new Error("Whoops!");
}); //NO CATCH, the error is unhandled, the browser event listener for unhandledrejection picks up the error

