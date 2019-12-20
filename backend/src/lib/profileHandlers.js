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
profileHandlers.editProfile = (requestObject) => new Promise((resolve,reject) => {


    if(requestObject.hasOwnProperty("userName") && requestObject.hasOwnProperty("changeVar") && requestObject.hasOwnProperty("changeVal"))
    {
        let ParamVal = requestObject.changeVal,dbParam = requestObject.changeVar;
        mongo.update(dbConstants.userCollection,{userName : requestObject.userName},{$set : {dbParam : ParamVal}} ,{},SINGLE).then(updateResult => {
            responseObject.status = SUCCESSSTATUS;
            responseObject.payload = {dbParam : ParamVal};
            resolve(requestObject);    
        }).catch( rejectResult => {
            responseObject.status = ERRORSTATUS;
            responseObject.payload = rejectResult;
            resolve(requestObject);
        });
    }else{
        responseObject.status = ERRORSTATUS;
        responseObject.payload = ERRORS.ERR_REQOBJ_DM;
        reject(responseObject);
    }    
});

//export the module
module.exports = profileHandlers;
