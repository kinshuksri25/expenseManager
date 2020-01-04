/*
 *   Primary Profile Handlers
 */

//Dependencies
let mongo = require('./data');
let { dbConstants, ERRORS, SINGLE, MULTIPLE, userObject, responseObject, ERRORSTATUS, SUCCESSSTATUS } = require('../../../config/dataConstants');
let encryptionAPI = require('./encryptionAPI');

//defining the login handler object
let profileHandlers = {};

//editProfile Handler
//Params --> requestHandler -- object
profileHandlers.editProfile = (requestObject) => new Promise((resolve, reject) => {

    if (requestObject.hasOwnProperty("userName") && requestObject.hasOwnProperty("changeVar") && requestObject.hasOwnProperty("changeVal")) {
        let userObject = {};
        switch (requestObject.changeVar) {
            case "userName":
                userObject.userName = requestObject.changeVal;
                break;
            case "occupation":
                userObject.occupation = requestObject.changeVal;
                break;
            case "password":
                userObject.password = requestObject.changeVal;
                break;
        }
        mongo.update(dbConstants.userCollection, { userName: requestObject.userName }, { $set: userObject }, {}, SINGLE).then(updateResult => {
            responseObject.status = SUCCESSSTATUS;
            responseObject.payload = requestObject.changeVal;
            resolve(responseObject);
        }).catch(rejectResult => {
            responseObject.status = ERRORSTATUS;
            responseObject.payload = rejectResult;
            reject(responseObject);
        });
    } else {
        responseObject.status = ERRORSTATUS;
        responseObject.payload = ERRORS.ERR_REQOBJ_DM;
        reject(responseObject);
    }
});

//export the module
module.exports = profileHandlers;