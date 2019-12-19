/*
*   Primary Session Handler File
*/

//Dependencies
let {sessionObject} = require('../../../config/dataConstants');

//defining the sessionHandler object
let sessionHandler = {};

//create a new session 
//Params --> userName -- string
sessionHandler.createSession = userName => {
    //populate the session object store the value and return the object
    sessionObject.sessionID = userName;
    sessionObject.creationTime = Date.now();
    return sessionObject;
};

//export the module
module.exports = sessionHandler;
