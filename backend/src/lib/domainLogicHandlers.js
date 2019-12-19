/*
*   Primary Domain Logic Handlers
*/

//Dependencies
let mongo = require('./data');
let { dbConstants, ERRORS, SINGLE, MULTIPLE, userObject, responseObject, ERRORSTATUS, SUCCESSSTATUS } = require('../../../config/dataConstants');

//defining the domian handler object
let domainLogicHandler = {};

//getUserData handler 
//Params --> requestObject -- object
domainLogicHandler.getUserData = (requestObject) => new Promise((resolve,reject) =>{
    if(requestObject.hasOwnProperty("userName"))
    {
        mongo.read(dbConstants.userCollection,{userName:userObject.userName},{projection:{_id: 0,password: 0}}).then(readResult => {
            responseObject.status = SUCCESSSTATUS;
            responseObject.payload = readResult[0];
            resolve(responseObject);
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

//editBudget handler 
//Params --> requestHandler -- object
domainLogicHandler.editBudget = () => new Promise((resolve,reject) =>{
    if(requestObject.hasOwnProperty("userName") && requestObject.hasOwnProperty("budget"))
    {
        mongo.update(dbConstants.userCollection,{userName:requestObject.userName},{$set : {budget:requestObject.budget}},{},SINGLE).then(updateResult => {
            domainLogicHandler.getUserData({userName : requestObject.userName}).then(readResult => {
                responseObject.status = SUCCESSSTATUS;
                responseObject.payload = readResult[0].budget;
                resolve(responseObject);
            }).catch(err => {
                throw err;
            });
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

//deleteExpenseCatagory handler 
//Params --> requestHandler -- object
domainLogicHandler.deleteExpenseCatagory = () => new Promise((resolve,reject) =>{
    if(requestObject.hasOwnProperty("userName") && requestObject.hasOwnProperty("expenseCatagory"))
    {
        mongo.update(dbConstants.userCollection,{userName:requestObject.userName},{$pull : {expenseCatagories:requestObject.expenseCatagory}},{},SINGLE).then(updateResult => {
            domainLogicHandler.getUserData({userName : requestObject.userName}).then(readResult => {
                responseObject.status = SUCCESSSTATUS;
                responseObject.payload = readResult[0].expenseCatagories;
                resolve(responseObject);
            }).catch(err => {
                throw err;
            });
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

//addExp handler 
//Params --> requestHandler -- object
domainLogicHandler.addExp = (requestObject) => new Promise((resolve,reject) =>{
    if(requestObject.hasOwnProperty("userName") && (requestObject.hasOwnProperty("expense") || requestObject.hasOwnProperty("expenseCatagory")))
    {
        let dbParam = requestObject.hasOwnProperty("expense") ? "expenses" : "expenseCatagories";
        let reqParam = requestObject.hasOwnProperty("expense") ? requestObject.expense : requestObject.expenseCatagories;

        mongo.update(dbConstants.userCollection,{userName:requestObject.userName},{$push : {dbParam : reqParam}},{},SINGLE).then(updateResult => {
            domainLogicHandler.getUserData({userName : requestObject.userName}).then(readResult => {
                responseObject.status = SUCCESSSTATUS;
                responseObject.payload = readResult[0][dbParam];
                resolve(responseObject);
            }).catch(err => {
                throw err;
            });
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

//editExpense handler 
//Params --> requestHandler -- object
domainLogicHandler.editExpense = () => new Promise((resolve,reject) =>{

});

//export the module
module.exports = domainLogicHandler;