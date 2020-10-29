
async function loadUsers() {
      //fetch something from a URL
      let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

      const reader = response.body.getReader();


      //get the total length of the response body in bytes
      const contentLength = +response.headers.get('Content-Length');


      //read the data
      let receivedLength = 0; //amount of bytes received at the moment
      let chunks = [];  //array of received binary chunks (whole array makes up the body)

      while (true) {

            const { done, value } = await reader.read();

            if (done) {
                  break;
            }

            //push the chunk that was just read
            chunks.push(value);

            //add the read bytes to the total bytes read
            receivedLength += value.length;

            console.log(`Received ${receivedLength} of ${contentLength}`);


      }

      //concatenate chunks into a single Uint8Array

      //create a new uint8array with the total received length
      let chunksAll = new Uint8Array(receivedLength);
      let position = 0;
      for (let chunk of chunks) {
            chunksAll.set(chunk, position);
            position += chunk.length;
      }

      //decode into a string
      let result = new TextDecoder("utf-8").decode(chunksAll);

      let commits = JSON.parse(result);
      alert(commits[0].author.login);


}

loadUsers();