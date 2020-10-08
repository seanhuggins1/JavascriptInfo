//we can export any declaration by putting export behind it

//export an array
export let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//export a constant
export const MODULES_BECAME_STANDARD_YEAR = 2015;

//export a classs
export class User {
      constructor(name){
            this.name = name;
      }
}

//We can also export away from declarationss, export separately

function sayHi(user) {
      alert(`Hello, ${user}!`);
}
function sayBye(user) {
      alert(`Bye, ${user}!`);
}

export {sayHi, sayBye}; //export a list of function vars
//export could even go above the functionsss


//Usually we put a list of what we'd like to import in curly braces
import {sayHi, sayBye} from './say.js';
sayHi('John');
sayBye('John');

//can also import everything as an object
import * as say from './say.js';

//can also use as to import different exports under different names
import {sayHi as hi, sayBye as bye} from './say.js';

//can do the same with exports
export {sayHi as hi, sayBye as bye};
//then modules that import these functions will import their 'as' names



/**
 * In practice there are mainly two kinds of modules
 */
//modules that contain a library of functions
//modules that declare a single entity, say a class 
      //this approach is preferred. The 'one thing per module' approach

export default class User {   //there may be only one export default per file
      constructor(name){
            this.name = name;
      }
}
//then it doesn't need to be imported with curly braces
import User from './user.js'; //this LOOKS NICER!!!
new User('John');

//imports need curly braces, for named exports, but don't need curly braces for the default export

//there is only one default export per file, it is the file that gets exported by default
export default class {  //don't even need a class name 
      constructor(){

      }
}
//same thing with a function, needs no name, it is the thing that gets exported
export default function(user) {
      alert(`Hello, ${user}!`);
}
//can do the same with a value without making a named variable
export default ['red', 'yellow', 'orange'];



//the default keyword can also be used separately
function sayHi(user) {
      alert(`Hello, ${user}`);
}

export {sayHi as default};    //instead of exporting sayHi as some name, it exports it with the 'default' name
//which is the same as putting export default before the function


//importing a default allows naming it anything
import uaSer from './user.js';
//whereas importing non-defaults requires specifying the correct name
import {User} from './user.js';
      //team members may use different namess to import the same thing which can lead to problems

//usually to keep the code consistent, there is a rule that imports should keep the names of their files
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
      //some teams consider this a serious drawback of default exports, and named exports may be preferred

/**
 * Re-export allows importing things and immediately re-exporting them
 */

export {sayHi} from './say.js';

/**
 * Dynamic imports
 * import() returns a promise that resolves into a module object, that contains all of its exported functionality
 */


 




