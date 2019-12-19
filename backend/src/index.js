/*
 *
 *Primary file for backend requests
 *
 */

//Dependencies
let {server} = require('./lib/server');

//declare the app
let app = {};


//define the init method
app.init = function(callback) {

    //start the server
    server.init();
};


//self invoking only if required directly
if (require.main == module)
    app.init(function() {});