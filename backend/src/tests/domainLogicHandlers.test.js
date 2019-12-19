/*
*   DomainLogicHandlers unit test file
*/

//Dependencies
let {SUCCESSSTATUS, ERRORS} = require('../../../config/dataConstants');
let domainLogicHandlers = require('../lib/domainLogicHandlers');

describe("domain logic unit test cases",() => {
    let userObject = {};
    beforeEach(() => {
        userObject = {
            userName : "sampleDummy",
            budget : 10000,
            expenseCatagory : ["sample","dummy"],
            expenses : {},
        };
    });

    test("it gets the users data",() => {
        domainLogicHandlers.getUserData(userObject).then(returnObject => {
            expect(returnObject.status).toEqual(SUCCESSSTATUS);
        }).catch(rejectObject => {
            console.log(rejectObject);
        });
    });

    test("it updates the budget",() => {
        domainLogicHandlers.editBudget(userObject).then(returnObject => {
            expect(returnObject.status).toEqual(SUCCESSSTATUS);
        }).catch(rejectObject => {
            console.log(rejectObject);
        });
    });

    test("it delete an expense catagory",() => {
        delete userObject.expenses;
        
        domainLogicHandlers.deleteExpenseCatagory(userObject).then(returnObject => {
            expect(returnObject.status).toEqual(SUCCESSSTATUS);
        }).catch(rejectObject => {
            console.log(rejectObject);
        });
    });

    test("it adds an expense to the user",() => {
        delete userObject.expenses;

        domainLogicHandlers.addExp(userObject).then(returnObject => {
            expect(returnObject.status).toEqual(SUCCESSSTATUS);
        }).catch(rejectObject => {
            console.log(rejectObject);
        });
    });

    test("it adds an expenseCatagory to the user",() => {
        delete userObject.expenseCatagory;

        domainLogicHandlers.addExp(userObject).then(returnObject => {
            expect(returnObject.status).toEqual(SUCCESSSTATUS);
        }).catch(rejectObject => {
            console.log(rejectObject);
        });
    });

    //TODO --> the below test cases need to be worked on

    test("it edits the expense",() =>{});

    test("it soft deletes an expense",() =>{});

});
