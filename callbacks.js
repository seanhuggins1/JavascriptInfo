/**
 * Many JS Host environments provide functions that enable ASYNCHRONOUS actions
 * Actions that are started NOW, but finish LATER
 * 
 * setTimeout() is an example
 * 
 * There are other real world examples of asynchronous actions
 */


/**
 * function loadScript
 * loads a script with a given src
 * 
 * Creates a new tag <script src="...">
 */
function loadScript(src) {
    // Create a <script> tag and append it to the page
    // Script from src will start loading and run when it's finished loading
    let script = document.createElement('script');
    script.src = src;
    document.head.append(script);
}

// Can use the function like this
// The script is loaded asynchronously, it loads now, and runs later
loadScript('/my/script.js');
// Code below loadScript doesn't wait for script loading to finish


// Let's say we need to use the new script as soon as it loads
// It creates functions that we want
// The script has function newFunction() {...}

loadScript('/my/newScript.js');
newFunction(); //no such function yet!!!, newScript.js hasn't loaded and created newFunction()

//We'd like to know when the script inside of loadScript() actually runs
//Let's add a callback function as a second argument to loadScript()

function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(script);

    document.head.append(script);
}

// Now we can use the call back to call new functions generated by the loaded script

loadScript('/my/script.js', function (){
    //callback runs AFTER the script is loaded
    newFunction();
});

// This is a callback-based style of programming
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(script);
    document.head.append(script);
}
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the script ${script.src} is loaded`);
  alert( _ ); // function declared in the loaded script
});



/**
 * Callback in Callback
 */

loadScript('/my/script.js', function(script) {
    loadScript('/my/script2.js', function(script) {
        loadScript('/my/script3.js', function(script) {

        });
    });
});

//this method works for a few scripts but gets cumbersome after many


/**
 * Handling Errors
 * 
 * In previous examples, we didn't handle errors
 * What if script loading fails? Our callback should be able to react
 */

function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));

    document.head.append(script);
}

// Usage

loadScript('/my/script.js', function(error, script) {
    if (error) {
        // handle error
    } else {
        // script loaded successfully
    }
})

// this is 'error-first callback' style

/**
 * General convention,
 * first argument of callback is reserved for an error
 * second+ arguments are for the successful result
 */

 
//Avoiding pyramid of doom
loadScript('1.js', step1);
function step1(error, script){
    if (error) {
        handleError(error);
    } else {
        loadScript('2.js', step2);
    }
}
function step2(error, script){
    if (error) {
        handleError(error);
    } else {
        loadScript('3.js', step3);
    }
}
function step3(error, script) {
    if (error) {
      handleError(error);
    } else {
      // ...continue after all scripts are loaded (*)
    }
  };

/**
 * Every action is now a seperate top-level function, there's no deep nesting
 * They are still cluttery, the way to fix is using promises
 */