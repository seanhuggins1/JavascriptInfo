//another file can import and use it

import {sayHi} from './sayHi.js'; //import the function sayHi

alert(sayHi);     //fuction

sayHi('John');


//modules always 'use strict'
//modules have their own top-level scope, so they don't share variables with other modules.
//if they wish to share their modules, they are expected to export them
//modules need to import things that they need

//if a module exports an object, that same object is exported to all importers
//no clones of the object are made, all importers are accessing the exact same object
//any code within the exporting module will also see the same object

//import.meta contains information about the current module