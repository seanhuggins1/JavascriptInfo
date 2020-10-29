//syntax to create a new URL object
new URL(url, [base]);


let url1 = new URL('https://javascript.info/profile/admin');
//same as
let url2 = new URL('/profile/admin', 'https://javascript.info');  //url is relative to the base

//can also pass in urls
let url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url);

alert(newUrl);

//URL object knows how to access its components

url.protocol;
url.host;
url.pathname;


//example adding parameters that need to be encoded (punctuation marks)

let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!');    //added param with a space and !
url.searchParams.set('tbs', 'qdr:y');
for (let [name, value] of url.searchParams) {
      alert(`${name}=${value}`);
}

