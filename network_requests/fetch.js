//fetch basic syntax
let promise = fetch(url, [options]);
//url - URL to access
//options - optional parameters: method, headers etc...
//without options it is a simple GET request, it just fetches the contents of the URL

//promise returned by fetch either accepts or rejects

let response = await fetch(url); 
//fetch is resolved with an object of the built-in RESPONSE class

if (response.ok) {      //HTTP status is 200-299
      let json = await response.json();
}



//TO GET TO THE RESPONSE BODY we need to use an additional method call
response.text();
response.json();
response.formData();
response.blob();
response.arrayBuffer();

//E.G get a JSON object with the latest commits from GitHub
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);
let commits = await response.json(); //promise resolves with a JSON object

//same thing using pure promise syntax
fetch(url)
      .then(response => response.json())
      .then(commits => alert(commits[0].author.login));

//to get the response text
let response = await fetch(url);
let text = await response.text();
alert(text.slice(0,80) + '...');



//EX of reading in binary format
let response = await fetch('/article/fetch/logo-fetch.svg');
let blob = await response.blob();

//create <img> for it
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

img.src = URL.createObjectURL(blob);

setTimeout(() => {
      img.remove();
      URL.revokeObjectURL(img.src);
}, 3000);

//response headers are available in a map-like headers object
let response = await fetch(url);
//get one header
alert(response.headers.get('Content-Type'));

//iterate over all headers
for (let [key, value] of response.headers) {
      alert(`${key} = ${value}`);
}

//TO ADD REQUEST HEADERS we can use the headers option
let response = fetch(protectedURL, {
      headers: {
            Authentication: 'secret'
      }
});

//but some HTTP headers cannot be set



/**
 * POST REQUESTS
 */
//a post request needs a fetch with options:
//method - HTTP-method e.g POST
//body - the request body, one of: 
//string (JSON-encoded), FormData, Blob/BufferSource, URLSearchParams
//JSON encoded string is used most of the time


let user = {
      name: 'John',
      surname: 'Smith'
};

let response = await fetch('/article/fetch/post/user', {
      method: 'POST',
      headers: {
            'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
});

let result = await response.json();
alert(result.message);

//WE CAN ALSO SUBMIT binary data with fetch, using Blob or BufferSource objects
