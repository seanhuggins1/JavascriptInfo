//example of fetch and all its options

let promise = fetch(url, {
      method: "GET",
      headers: {
            //content type header value is usually auto-set
            //depending on the request body
            "Content-Type": "text/plain;charset=UTF-8"
      },
      body: undefined, //string, FormData, Blob, BufferSource
      referrer: "about:client", //or "" to send no referrer header
      referrerPolicy: 'no-referrer-when-downgrade',
      mode: "cors", //or same-origin, no-cors etc...
      credentials: "same-origin", //or omit, include
      cache: "default", //or no-store, reload, no-cache, force-cache, or only-if-cached
      redirect: "follow",
      integrity: "",
      keepalive: false,
      signal: undefined, //AbortController to abort request
      window: window //null
});

