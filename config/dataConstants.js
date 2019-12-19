/*
*   Primary constants file
*/

//defining the constants object
var dataConstants = {};

//TODO--> need to add the required const values
dataConstants.dbConstants = {
    "DB_NAME": "expenseeve",
    "userCollection": "userCollection",
    "testCollection": "testCollection",
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
  
        //GOOGLE API ERRORS
    
    //INTERNAL ERRORS
   
};

dataConstants.SINGLE = 1;
dataConstants.MULTIPLE = 2;

//export the module
module.exports = {...dataConstants };