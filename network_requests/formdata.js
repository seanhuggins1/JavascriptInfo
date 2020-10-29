//create a new formdata opject
let formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

//can use for...of
for(let [name, value] of formData) {
      alert(`${name} = ${value}`);
}


//CAN 

