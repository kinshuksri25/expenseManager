/*
*   Primary Pre-Login Handlers
*/

//Dependencies
let mongo = require('./data');
let { dbConstants, ERRORS, userObject, responseObject, ERRORSTATUS, SUCCESSSTATUS } = require('../../../config/dataConstants');
let encryptionAPI = require('./encryptionAPI');
let sessionHandler = require('./sessionHandler');

//defining the login handler object
let loginHandlers = {};

//signup handler 
//Params --> requestObject -- object
loginHandlers.signUp = requestObject => new Promise((resolve,reject) =>{
    if(typeof(requestObject) ==  'object' && requestObject.hasOwnProperty('userName') && requestObject.hasOwnProperty('password') && requestObject.hasOwnProperty('firstName') && requestObject.hasOwnProperty('lastName') && requestObject.hasOwnProperty('photoUrl') && requestObject.hasOwnProperty('occupation')){
       
        //encrypt password using crypto
        let encryptedPassword = encryptionAPI.hash(requestObject.password);

       //set userObject 
       userObject.userName = requestObject.userName;
       userObject.firstName = requestObject.firstName;
       userObject.lastName = requestObject.lastName;
       userObject.photoUrl = requestObject.photoUrl;
       userObject.occupation = requestObject.occupation;
       userObject.password = encryptedPassword;

        //check if the username is already present in the db
        mongo.read(dbConstants.userCollection,{userName:userObject.userName},{projection:{_id: 0}}).then(readResult => {
            
            if(JSON.stringify(readResult) == JSON.stringify([]))
              {
                    //save the data to db
                mongo.insert(dbConstants.userCollection,userObject,{}).then(insertResult => {

                    //create temp loginObject
                    let loginObject = {};
                    loginObject.userName = userObject.userName;
                    loginObject.password = requestObject.password;

                    //log the user in
                    loginHandlers.login(loginObject).then( resObject =>{
                        resolve(resObject);
                    }).catch(errObject => {
                        reject(errObject);
                    });
                }).catch(insertErr => {
                  throw insertErr;
                });
              }else{
                throw ERRORS.ERR_USR_DM;  
              }
        }).catch(err => {
            responseObject.status = ERRORSTATUS;
            responseObject.payload = err;
            reject(responseObject);
        });
    }else{
        responseObject.status = ERRORSTATUS;
        responseObject.payload = ERRORS.ERR_REQOBJ_DM;
        reject(responseObject);
    }
});

//login handler 
//Params --> requestObject -- object
loginHandlers.login = (requestObject) => new Promise((resolve,reject) =>{
    if(typeof(requestObject) == 'object' && requestObject.hasOwnProperty('userName') && requestObject.hasOwnProperty('password'))
    {   
        mongo.read(dbConstants.userCollection,{userName : requestObject.userName},{projection:{_id: 0}}).then( readResult => {         
            if(JSON.stringify(readResult) != JSON.stringify([]))  
            {
                //encrypt login password
                let encryptedLoginPassword = encryptionAPI.hash(requestObject.password);
                //compare the password 
                if(encryptedLoginPassword === readResult[0].password)
                {
                   //set the session      
                    let sessionObject = sessionHandler.createSession(requestObject.userName);
                    responseObject.status = SUCCESSSTATUS;
                    responseObject.payload = sessionObject;
                    resolve(responseObject);    
                }else{
                   throw ERRORS.ERR_PASS_DM; 
                }
            }else{
                throw ERRORS.ERR_INUSR_DM; 
            }
        }).catch(readError => {
            responseObject.status = ERRORSTATUS;
            responseObject.payload = readError;
            reject(responseObject);
        });

    }else{
        responseObject.status = ERRORSTATUS;
        responseObject.payload = ERRORS.ERR_REQOBJ_DM;
        reject(responseObject);
    }
});

//export the module
module.exports = loginHandlers;

