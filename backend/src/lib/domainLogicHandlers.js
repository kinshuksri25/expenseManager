/*
*   Primary Domain Logic Handlers
*/

//Dependencies
let mongo = require('./data');
let { dbConstants, ERRORS, SINGLE, MULTIPLE, userObject, responseObject, ERRORSTATUS, SUCCESSSTATUS } = require('../../../config/dataConstants');

//defining the domian handler object
let domainLogicHandler = {};


//getProfilePhoto handler 
//Params --> requestObject -- object
domainLogicHandler.getProfilePhoto = () => new Promise((resolve, reject) => {

    mongo.read(dbConstants.photoCollection, {}, { projection: { _id: 0 } }).then(readResult => {

        let pictureArr = readResult[0].photos;
        let randomPicturePos = Math.floor(Math.random() * pictureArr.length);

        responseObject.status = SUCCESSSTATUS;
        responseObject.payload = pictureArr[randomPicturePos];
        resolve(responseObject);
    }).catch(readError => {
        responseObject.status = ERRORSTATUS;
        responseObject.payload = readError;
        reject(responseObject);
    });
});

//getUserData handler 
//Params --> requestObject -- object
domainLogicHandler.getUserData = (requestObject) => new Promise((resolve, reject) => {
    if (requestObject.hasOwnProperty("userName")) {
        mongo.read(dbConstants.userCollection, { userName: requestObject.userName }, { projection: { _id: 0, password: 0 } }).then(readResult => {
            if (JSON.stringify(readResult) != JSON.stringify([])) {
                responseObject.status = SUCCESSSTATUS;
                responseObject.payload = readResult[0];
                resolve(responseObject);
            } else {
                throw ERRORS.ERR_INUSR_IDM;
            }
        }).catch(readError => {
            responseObject.status = ERRORSTATUS;
            responseObject.payload = readError;
            reject(responseObject);
        });
    } else {
        responseObject.status = ERRORSTATUS;
        responseObject.payload = ERRORS.ERR_REQOBJ_DM;
        reject(responseObject);
    }
});

//editBudget handler 
//Params --> requestObject -- object
domainLogicHandler.editBudget = (requestObject) => new Promise((resolve, reject) => {
    if (requestObject.hasOwnProperty("userName") && requestObject.hasOwnProperty("budget")) {
        mongo.update(dbConstants.userCollection, { userName: requestObject.userName }, { $set: { budget: requestObject.budget } }, {}, SINGLE).then(updateResult => {
            domainLogicHandler.getUserData({ userName: requestObject.userName }).then(readResult => {
                responseObject.status = SUCCESSSTATUS;
                responseObject.payload = readResult.payload.budget;
                resolve(responseObject);
            }).catch(err => {
                throw err;
            });
        }).catch(readError => {
            responseObject.status = ERRORSTATUS;
            responseObject.payload = readError;
            reject(responseObject);
        });
    } else {
        responseObject.status = ERRORSTATUS;
        responseObject.payload = ERRORS.ERR_REQOBJ_DM;
        reject(responseObject);
    }
});

//deleteExpenseCatagory handler 
//Params --> requestObject -- object
domainLogicHandler.deleteExpenseCatagory = (requestObject) => new Promise((resolve, reject) => {
    if (requestObject.hasOwnProperty("userName") && requestObject.hasOwnProperty("expenseCatagories") && requestObject.hasOwnProperty("expenses")) {
        mongo.update(dbConstants.userCollection, { userName: requestObject.userName }, { $pull: { expenseCatagories: requestObject.expenseCatagories, expenses : {$in:[...requestObject.expenses]}} }, {}, MULTIPLE).then(updateResult => {
            domainLogicHandler.getUserData({ userName: requestObject.userName }).then(readResult => {
                let expenseCatagories = readResult.payload.expenseCatagories;
                let expenses = readResult.payload.expenses;
                responseObject = {
                    status : SUCCESSSTATUS,
                    payload : {
                                expenseCatagories : expenseCatagories,
                                expenses : expenses
                              }
                };
                resolve(responseObject);
            }).catch(err => {
                throw err;
            });
        }).catch(readError => {
            responseObject.status = ERRORSTATUS;
            responseObject.payload = readError;
            reject(responseObject);
        });
    } else {
        responseObject.status = ERRORSTATUS;
        responseObject.payload = ERRORS.ERR_REQOBJ_DM;
        reject(responseObject);
    }
});

//addExp handler 
//Params --> requestObject -- object
domainLogicHandler.addExp = (requestObject) => new Promise((resolve, reject) => {
    if (requestObject.hasOwnProperty("userName") && (requestObject.hasOwnProperty("expenses") || requestObject.hasOwnProperty("expenseCatagories"))) {
        let updateObj = {};
        if (requestObject.hasOwnProperty("expenses")) {
            requestObject.expenses.id = randomNumberGen();
            updateObj.expenses = requestObject.expenses;
        } else {
            updateObj.expenseCatagories = requestObject.expenseCatagories;
        }
        mongo.update(dbConstants.userCollection, { userName: requestObject.userName }, { $push: updateObj }, {}, SINGLE).then(updateResult => {
            domainLogicHandler.getUserData({ userName: requestObject.userName }).then(readResult => {
                responseObject.status = SUCCESSSTATUS;
                responseObject.payload = requestObject.hasOwnProperty("expenses") ? readResult.payload.expenses : readResult.payload.expenseCatagories;
                resolve(responseObject);
            }).catch(err => {
                throw err;
            });
        }).catch(readError => {
            responseObject.status = ERRORSTATUS;
            responseObject.payload = readError;
            reject(responseObject);
        });
    } else {
        responseObject.status = ERRORSTATUS;
        responseObject.payload = ERRORS.ERR_REQOBJ_DM;
        reject(responseObject);
    }
});

//editExpense handler 
//Params --> requestObject -- object
domainLogicHandler.editExpense = (requestObject) => new Promise((resolve, reject) => {
    if (requestObject.hasOwnProperty("userName") && requestObject.hasOwnProperty("expenses") && requestObject.expenses.hasOwnProperty("id") && requestObject.expenses.hasOwnProperty("category") && requestObject.expenses.hasOwnProperty("itemName") && requestObject.expenses.hasOwnProperty("amount") && requestObject.expenses.hasOwnProperty("expenseDate") && requestObject.expenses.hasOwnProperty("state")) {

        mongo.update(dbConstants.userCollection, { userName: requestObject.userName, "expenses.id": requestObject.expenses.id }, { $set: { "expenses.$": requestObject.expenses } }, {}, SINGLE).then(updateResult => {
            domainLogicHandler.getUserData({ userName: requestObject.userName }).then(readResult => {
                responseObject.status = SUCCESSSTATUS;
                responseObject.payload = readResult.payload.expenses;
                resolve(responseObject);
            }).catch(err => {
                throw err;
            });
        }).catch(readError => {
            responseObject.status = ERRORSTATUS;
            responseObject.payload = readError;
            reject(responseObject);
        });
    } else {
        responseObject.status = ERRORSTATUS;
        responseObject.payload = ERRORS.ERR_REQOBJ_DM;
        reject(responseObject);
    }
});

randomNumberGen = () => {
    let randomNumber = "";
    let i = 0;
    while (i < 11) {
        randomNumber += Math.round(Math.random() * 10);
        i++;
    }
    return randomNumber;
};


//export the module
module.exports = domainLogicHandler;