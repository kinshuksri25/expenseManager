/*
 *   Primary constants file
 */

//defining the constants object
let dataConstants = {};

//TODO--> need to add the required const values
dataConstants.dbConstants = {
    "DB_NAME": "expenseeve",
    "userCollection": "userCollection",
    "photoCollection": "photoCollection",
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
    "ERR_INUSR_IDM": "The username is invalid",

    //CLIENT-SIDE ERRORS
    "ERR_MNOJ_CLI": "Invalid menu object,unable to render menu component",
    "ERR_BCKERR_CLI": "Unable to get data",
    "ERR_NET_CLI": "Unable to connect to the network",
    "ERR_INVOBJ_CLI" : "Invalid form object",
    "ERR_INPASS_CLI" : "The password should contain an uppercase, a lowecase, a digit and should be atleast 8 characters long",
    "ERR_PASSMIS_CLI": "Password and Confirm-Password should match",
    "ERR_BUDEXX_CLI" : "Budget Exceeded",
    "ERR_CATSEL_CLI" :"Please select a catagory",
    //INTERNAL ERRORS
    "ERR_USR_DM": "The username already exists unable to signup the user",
    "ERR_INUSR_DM": "The username is invalid unable to login the user",
    "ERR_PASS_DM": "The password is invalid unable to login the user"
};

dataConstants.userObject = {
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    occupation: "",
    budget: 0,
    expenseCatagories: [],
    expenses: []
};

dataConstants.responseObject = {
    status: "",
    payload: {}
};

dataConstants.sessionObject = {
    sessionID: "",
    creationTime: ""
};

dataConstants.expenseObject = {
    category: "",
    itemName: "",
    amount: 0,
    expenseDate: "",
    state: true
};

dataConstants.deleteButtonDetails ={
    id : "id",
    name : "Delete",
    className : "tableEditButton"
}

dataConstants.addButtonDetails ={
    id : "id",
    name : "Add",
    className : "tableEditButton"
}

dataConstants.SINGLE = 1;
dataConstants.MULTIPLE = 2;
dataConstants.ERRORSTATUS = "ERROR";
dataConstants.SUCCESSSTATUS = "SUCCESS";

//export the module
module.exports = {...dataConstants };