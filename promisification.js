//Many functions and libraries are callback based
//promises are more convenient so it can make sense to promisify callback-based scripts

//EG
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));

    document.head.append(script);
}


//Let's promisify it

let loadScriptPromise = function(src) {
    return new Promise((resolve, reject) => {
        //passes a callback that simply takes the result of the 
        //callback-driven loadscript, the callback then serves as the executor function
        //that rejects if there's an error, or resolves on success
        loadScript(src, (err, script) => {
            if (err) reject(err)
            else resolve(script);
        });
    });
}

//We can create a promisify halper method which accepts a to-promisify function f
//returns a wrapper function

function promisify(f) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            function callback(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
            args.push(callback);
            f.call(this, ...args);
        });
    }
}

// usage:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise().then();


//or if the original function expects a callback with more arguments
//callback(err, res1, res2, ...)

//here is a more advanced version of promisify

function promisify(f, manyArgs = false) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            function callback(err, ...results) {
                if (err) {
                    reject(err);
                } else {
                    //if there are meant to be many arguments, resolve with the whole array
                    //otherwise just resolve with one value
                    resolve(manyArgs ? results : results[0]);
                }
            }
            args.push(callback);

            f.call(this, ...args);
        });
    }
}