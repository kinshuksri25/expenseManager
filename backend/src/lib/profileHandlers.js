/*
*   Primary Profile Handlers
*/

//Dependencies
let mongo = require('./data');
let { dbConstants, ERRORS, SINGLE, MULTIPLE, userObject, responseObject, ERRORSTATUS, SUCCESSSTATUS } = require('../../../config/dataConstants');
let encryptionAPI = require('./encryptionAPI');

//defining the login handler object
let profileHandlers = {};

//TODO--> create the required handlers for --> change username, change password, change picture

//export the module
module.exports = profileHandlers;
