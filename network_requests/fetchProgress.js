
//instead of response.json()
const reader = response.body.getReader();

//infinite loop while the body is downloading
while(true) {
      //done is true for the last chunk
      //value is Uint8Array of the chunk bytes

      //destruct the reader.read() result into done and value properties
      const {done, value} = await reader.read();

      if (done) {
            break;
      }

      console.log(`Received ${value.length} bytes`);
}

