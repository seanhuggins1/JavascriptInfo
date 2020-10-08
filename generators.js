/**
 * Generator functions return multiple values
 */

function* generateSequence(){
      yield 1;
      yield 2;
      return 3;
}

//calling a generator doesn't run it code, instead it returns a special object
//called a "generator object"

let generator = generateSequence();
alert(generator);

//main method of a generator is next() when it's called it runs the execution until the nearest yield <value>

/**
 * Result of next() is an object with two properties
 */
//value - the yielded value
//done - true if the function code has finished, false otherwise

//here we create a generator and get its first yielded value

let generator = generateSequence();
let one = generator.next();   //first yielded value
alert(JSON.stringify(one));

//call next() again

let two = generator.next();   //second yielded value

//call next() again

let three = generator.next(); //third yielded value, done: true

//new calls to generator.next() don't make sense anymore, and they just return the same object



//generators are ITERABLE
for(let value of generator) {
      alert(value);     //1, then 2 - for..of iteration ignores the last value, it must be yielded rather than returned
}

/**
 * USING GENERATORS FOR ITERABLES
 */

//awhile ago we made an iterable range object that returns values from...to

let range = {
      from: 1,
      to: 5,
      //for..of range call this method once in the very beginning
      [Symbol.iterator](){
            //it returns the iterator object:
            //onward, for..of works only with that object, asking it for next values
            return {
                  current: this.from,
                  last: this.to,
                  
                  //next() is called on each iteration by the for..of loop
                  next() {
                        // it should return the value as an object {done:.., value:...}
                        if (this.current <= this.last){
                              return {done: false, value: this.current++};
                        } else {
                              return {done: true};
                        }
                  }
            }
      }
}

//iteration over range returns numbers from range.from to range.to
alert([...range]);


//can use a generator function for iteration, by providing it as symbol iterator
let range = {
      from: 1,
      to: 5,

      *[Symbol.iterator]() {
            for(let value = this.from; value <= this.to; value++){
                  yield value;
            }
      }
}
//generator function above is more concise and keeps the same functionality as the 

function* generateSequence(start, end){
      for (let i = start; i <= end; i++) yield i;
}
//Now we want to re-use it to make a more complicated sequence
//first digits 0..9, then uppercase letters A..Z then lowercase a..z
function* generatePasswordCodes() {
      yield* generateSequence(48, 57);    //first yields one by one, all the yields from the call to generateSequence
      //* syntax here with yield allows embedding (composing) one generator into another

      yield* generateSequence(65, 90);    //now yields one by one, all the letters

      yield* generateSequence(97, 122);   //again
}
let str = ''
for (let code of generatePasswordCodes()) {
      str += String.fromCharCode(code);
}
alert(str);

//yield* directive delegates the execution to another generator



//yield is a two way street
function* gen(){
      //pass a question to the outer code and wait for an answer
      let result = yield "2 + 2 = ?";
      alert(result);
}
let generator = gen();

let question = generator.next().value; //question gets the first yielded value "2 + 2 = ?"
generator.next(4);      //passes 4 to the yield, and result becomes 4

//generator and calling code can exchange results by passing values in next/yield

//Another example
function* gen(){
      let ask1 = yield "2 + 2 = ?";
      alert(ask1);

      let ask2 = yield "3 * 3 = ?";
      alert(ask2);
}
let generator = gen();
alert(generator.next().value);
alert(generator.next(4).value);
alert(generator.next(9).done);

//generator.throw
//to pass an error into a yield, we should call
generator.throw(err);
