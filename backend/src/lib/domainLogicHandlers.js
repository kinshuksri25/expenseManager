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
//Params --> requestObject -- object
domainLogicHandler.editBudget = (requestObject) => new Promise((resolve,reject) =>{
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
//Params --> requestObject -- object
domainLogicHandler.deleteExpenseCatagory = (requestObject) => new Promise((resolve,reject) =>{
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
//Params --> requestObject -- object
domainLogicHandler.addExp = (requestObject) => new Promise((resolve,reject) =>{
    if(requestObject.hasOwnProperty("userName") && (requestObject.hasOwnProperty("expenses") || requestObject.hasOwnProperty("expenseCatagory")))
    {
        let dbParam = requestObject.hasOwnProperty("expenses") ? "expenses" : "expenseCatagories";
        let reqParam = requestObject.hasOwnProperty("expenses") ? requestObject.expenses : requestObject.expenseCatagories;

        if(dbParam == "expenses")
         requestObject.expenses.id = randomNumberGen();

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
//Params --> requestObject -- object
domainLogicHandler.editExpense = (requestObject) => new Promise((resolve,reject) =>{

    if(requestObject.hasOwnProperty("userName") && requestObject.hasOwnProperty("expenses") && requestObject.expenses.hasOwnProperty("id") && requestObject.expenses.hasOwnProperty("category") && requestObject.expenses.hasOwnProperty("itemName") && requestObject.expenses.hasOwnProperty("amount") && requestObject.expenses.hasOwnProperty("expenseDate") && requestObject.expenses.hasOwnProperty("state")){
        
        mongo.update(dbConstants.userCollection,{userName:requestObject.userName, "expenses.id" : requestObject.expenses.id },{$set : {"expenses.$" : requestObject.expenses}},{},SINGLE).then(updateResult => {
            domainLogicHandler.getUserData({userName : requestObject.userName}).then(readResult => {
                responseObject.status = SUCCESSSTATUS;
                responseObject.payload = readResult[0].expenses;
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

randomNumberGen = () =>{
    let randomNumber = "";
    let i = 0;
    while(i<11)
    {
        randomNumber += Math.round(Math.random() * 10);
        i++;
    }
    return randomNumber;
};


//export the module
module.exports = domainLogicHandler;