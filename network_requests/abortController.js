//can create an abort controller which we can use to abort async tasks
let controller = new AbortController();

//a controller is an extremely simple object

//controller is an extremely simple object with an abort() method
//and a single property signal that allows event listeners

//when abort() is called
      //controller.signal emits the "abort" event
      //controller.signal.aborted property becomes true


let controller = new AbortController();
let signal = controller.signal;

//the party that performs a cancelable operation
signal.addEventListener('abort', () => alert('abort!'));

//other party cancels
controller.abort();

//event triggers and signal.aborted becomes true
alert(signal.aborted);



//AbortController is just a means to pass abort events when abort() is called on it

//USING with fetch
let controller = new AbortController();
fetch(url, {
      signal: controller.signal     //attach the abort controller signal
});

//to abort the fetch call 
controller.abort();

//when a fetch is aborted, its promise rejects with an AbortError


let controller = new AbortController();

//abort the promise in 1 second
setTimeout(() => controller.abort(), 1000);


//try to fetch and attach the abort controller signal to the fetch
//catch an abort error (fetch promise rejects with abort error)
try {
      let response = await fetch('/article/fetch-abort/demo/hang', {
            signal: controller.signal
      });
} catch(err) {
      if (err.name == 'AbortError') {
            //handle abort
            alert("Aborted");
      } else {
            throw err;
      }
}


//AbortController is scalable
//allows canceling multiple fetches at once

let urls = [] //list of URLS to fetch in parallel
let controller = new AbortController();

//map every url to a fetch call
let fetchJobs = urls.map(url => fetch(url, {
      signal: controller.signal
}));

//await all fetch jobs
let results = await Promise.all(fetchJobs);


//if we have different async tasks, different from fetch
//can use a single AbortController to stop them

let urls = [];
let controller = new AbortController();
let ourJob = new Promise((resolve, reject) => {
      //our task

      //add an abort event listener to the signal
      controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, {
      signal: controller.signal
}));

//wait for fetches and our task in parallel
let results = await Promise.all([...fetchJobs, ourJob]);