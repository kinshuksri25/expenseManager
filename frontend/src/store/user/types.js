let userConstants = {};


userConstants.initUserObject = {
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    occupation: "",
    budget: 0,
    expenseCatagories: [],
    expenses: []
};

userConstants.actionTypes = {
    SETINIUSERDATA: "SETINIUSERDATA",
    EDITOCCUPATION: "EDITOCCUPATION",
    EDITUSERNAME: "EDITUSERNAME",
    EDITPASSWORD: "EDITPASSWORD",
    ADDEXPENSE: "ADDEXPENSE",
    ADDEXPENSECAT: "ADDEXPENSECAT",
    DELETEEXPENSECAT: "DELETEEXPENSECAT",
    EDITBUDGET: "EDITBUDGET",
    EDITEXPENSE: "EDITEXPENSE",
}

//export the module 
module.exports = {...userConstants };