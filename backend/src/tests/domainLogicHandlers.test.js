/*
 *   DomainLogicHandlers unit test file
 */

//Dependencies
let { SUCCESSSTATUS, ERRORS, expenseObject } = require('../../../config/dataConstants');
let domainLogicHandlers = require('../lib/domainLogicHandlers');

describe("domain logic unit test cases", () => {
    let userObject = {};
    beforeEach(() => {
        userObject = {
            userName: "sampleDummy",
            budget: 10000,
            expenseCatagories: ["sample", "dummy"],
            expenses: {},
        };
    });

    test("it gets the users data", () => {
        domainLogicHandlers.getUserData(userObject).then(returnObject => {
            expect(returnObject.status).toEqual(SUCCESSSTATUS);
        }).catch(rejectObject => {
            console.log(rejectObject);
        });
    });

    test("it fails to get users data", () => {
        delete userObject.userName;

        domainLogicHandlers.getUserData(userObject).catch(rejectObject => {
            expect(rejectObject.status).toEqual(SUCCESSSTATUS);
        });
    });

    test("it updates the budget", () => {
        domainLogicHandlers.editBudget(userObject).then(returnObject => {
            expect(returnObject.status).toEqual(SUCCESSSTATUS);
        }).catch(rejectObject => {
            console.log(rejectObject);
        });
    });

    test("it delete an expense catagory", () => {
        domainLogicHandlers.deleteExpenseCatagory(userObject).then(returnObject => {
            expect(returnObject.status).toEqual(SUCCESSSTATUS);
        }).catch(rejectObject => {
            console.log(rejectObject);
        });
    });

    test("it adds an expense to the user", () => {
        delete userObject.expenseCatagories;

        domainLogicHandlers.addExp(userObject).then(returnObject => {
            expect(returnObject.status).toEqual(SUCCESSSTATUS);
        }).catch(rejectObject => {
            console.log(rejectObject);
        });
    });

    test("it adds an expenseCatagory to the user", () => {
        delete userObject.expenses;

        domainLogicHandlers.addExp(userObject).then(returnObject => {
            expect(returnObject.status).toEqual(SUCCESSSTATUS);
        }).catch(rejectObject => {
            console.log(rejectObject);
        });
    });

    test("it edits the expense", () => {

        expenseObject.category = "sample";
        expenseObject.itemName = "dummyItem";
        expenseObject.amount = 400;
        expenseObject.expenseDate = "12323235";
        expenseObject.state = true;
        userObject.expenses = expenseObject;

        domainLogicHandlers.editExpense(userObject).then(returnObject => {
            expect(returnObject.status).toEqual(SUCCESSSTATUS);
        }).catch(rejectObject => {
            console.log(rejectObject);
        });
    });

    test("it soft deletes an expense", () => {

        expenseObject.category = "sample";
        expenseObject.itemName = "dummyItem";
        expenseObject.expenseDate = "12323235";
        expenseObject.amount = 400;
        expenseObject.state = false;
        userObject.expenses = expenseObject;

        domainLogicHandlers.editExpense(userObject).catch(rejectObject => {
            expect(rejectObject.status).toEqual(ERRORSTATUS);
        });
    });

});