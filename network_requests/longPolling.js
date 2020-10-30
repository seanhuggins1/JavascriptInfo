//client-side subscribe function that makes long polling requests
async function subscribe() {
      //fetch from /subscribe endpoint
      let response = await fetch("/subscribe");
      if (response.status == 502) {
            //connection timeout error
            //may happen when the connection was pending for too long
            //reconnect
            await subscribe();
      } else if (response.status != 200) {
            //An error
            showMessage(response.statusText);
            //reconnect in one second
            await new Promise(resolve => setTimeout(resolve, 1000));
            await subscribe();
      } else {
            //get and show the response message
            let message = await response.text();
            showMessage(message);
            //call subscribe() again to get the next message
            await subscribe();
      }
}