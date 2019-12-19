/*
*   Primary constants file
*/

//defining the constants object
let dataConstants = {};

//TODO--> need to add the required const values
dataConstants.dbConstants = {
    "DB_NAME": "expenseeve",
    "userCollection": "userCollection",
    "testCollection": "testCollection",
    "photoCollection": "photoCollection",
    "authCollection": "authCollection"
};


dataConstants.ERRORS = {
    //EXTERNAL ERROR
        //DB ERRORS
        "ERR_CONN_DB": "Unable to connect to DB due to the following error -->",
        "ERR_WR_DB": "Unable to write data to DB due to the following error --> ",
        "ERR_RD_DB": "Unable to fetch data from DB due to the following error -->",
        "ERR_UP_DB": "Unable to update data to DB due to the following error -->",
        "ERR_DL_DB": "Unable to delete data from DB due to the following error -->",

        //REQUEST OBJECT ERRORS
        "ERR_REQOBJ_DM": "Invalid request object, cannot process the request",
        //GOOGLE API ERRORS
    
    //INTERNAL ERRORS
    "ERR_USR_DM": "The username already exists please unable to signup the user",
    "ERR_INUSR_DM": "The username is invalid unable to login the user",
    "ERR_PASS_DM": "The password is invalid unable to login the user"   
};

dataConstants.userObject = {
    userName : "",
    password : "",
    firstName : "",
    lastName : "",
    photoUrl : "",
    occupation : "",
    budget : 0,
    expenseCatagories : [],
    expenses : []
};

dataConstants.responseObject = {
    status : "",
    payload : {}
};

dataConstants.sessionObject = {
    sessionID : "",
    creationTime : ""
};

dataConstants.SINGLE = 1;
dataConstants.MULTIPLE = 2;
dataConstants.ERRORSTATUS = "ERROR";
dataConstants.SUCCESSSTATUS = "SUCCESS";

//export the module
module.exports = {...dataConstants };