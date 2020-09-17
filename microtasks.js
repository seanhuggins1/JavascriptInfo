//Promise handlers are asynchronous
//Even when a promise is immediately resolved, the code below the consumer executes first

let promise = Promise.resolve();
promise.then(() => alert("promise done!"));
alert("code finished"); //this code runs first, even though the promise was resolved immediately

//If the order matters for us, we can put it into a queue with .then

Promise.resolve()
    .then(() => alert("promise done!"))
    .then(() => alert("code finished"));
//now the order is as intended



/**
 * Unhandled rejections
 */

let promise = Promise.reject(new Error("Promise Failed!"));
//this will throw an error
promise.catch(err => alert('caught')); //this promise (microtask) will catch the thrown error
//the microtask queue will be empty after the .catch is executed
//once the microtask queue is empty, JS will check for unhandled promise errors

window.addEventListener('unhandledrejection', event => alert(event.reason));

//If we forget to add .catch, then, after the microtask queue is empty, the engine triggers the event

//What if we handle the error later?
let promise = Promise.reject(new Error("Promise Failed!"));
setTimeout(() => promise.catch((err) => {
    alert('caught')
}), 1000);

window.addEventListener('unhandledrejection', event => alert(event.reason));

//error would not be caught, as the setTimeout adds nothing to the microtask queue,
//the microtask queue is empty. JS will listen for the unhandledrejection event and find
//a rejected promise