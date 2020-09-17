/**
 * Constructor syntax for a promise object
 */

 let promise = new Promise(function(resolve, reject) {
     // executor (the producing code, "singer")
 });

/**
  * Function passed to a new promise is called the executor
  * When a new promise is created, executor runs automatically
  * 
  * When the executor obtains the result, it calls
  * resolve(value) - if the job was successful, with result value
  * or
  * reject(error) - if an error occured, error is the error object
  * 
  * promise object has intermal properties:
  *     state - initially "pending"
  *             changes to "fulfilled" when resolve is called OR
  *             "rejected" when reject is called
  *     result - initially undefined
  *             changes to value when resolve(value) is called OR
  *             error when reject(error) is called
  */


  /**
   * Here's an example of a promise constructor with a simple executor that takes some time
   */

let promise = new Promise(function(resolve, reject) {
    //executor function executes automatically
    
    //after 1 second, signal that the job is done
    setTimeout(() => resolve("done"), 1000);
    //calling resolve("done") will update the value of the promise object
});
// This is an example of a successful job completion, or a "fulfilled promise"

/**
 * Here is an example of a promise with an error
 */
let promise = new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error("Whoops!")), 1000 );
});


/**
 * Consumers
 */

 // .then basic syntax
 /**
  * First argument is a function that runs when a promise is resolved
  * second argument runs when a promise is rejected
  */
 promise.then(
    function(result) { /*handle a successful result*/},
    function(error) { /*handle an error*/}
 );

//EG
let promise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve("done!"), 1000);
});

promise.then(
    result => alert(result),
    error => alert(error)
);


//.catch is like then, but it's only for errors
/**
 * .then(null, errorHandlingFunction) is exactly the same as
 * .catch(errorHandlingFunction)
 */

 /**
  * .finally always runs after the promise executes, whether it was resolved, or there was an error
  * Good for cleanup, stopping loading indicators, etc...
  * 
  * finally also passes results and errors through itself
  *  */ 



/**
 * We can re-write the loadScript() example using promises
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

//usage

let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");
promise.then(
    script => alert(`${script.src} is loaded!`),
    error => alert(`Error: ${error.message}`)
);
promise.then(
    script => alert('Another handler...')
);


