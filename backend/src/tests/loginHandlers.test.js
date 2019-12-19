/*
*   LoginHandlers unit test file
*/

//Dependencies
let {SUCCESSSTATUS, ERRORS} = require('../../../config/dataConstants');
let loginHandlers = require('../lib/loginHandlers');

describe("SignUp unit test cases",() => {
    let signUpObject = {};
    beforeEach(() => {
        signUpObject = {
            userName : "sampleDummy",
            password : "samplePassword",
            firstName : "sample",
            lastName : "dummy",
            photoUrl : "sample url",
            occupation : "between jobs",
        };
    });

    test("it should signup the user",()=>{
       loginHandlers.signUp(signUpObject).then( returnObject => {
            expect(returnObject.status).toEqual(SUCCESSSTATUS);
        }).catch( rejectObject => {
            console.log(rejectObject);
        });
    });

    test("it should reject the promise with invalid request object error",()=>{
        delete signUpObject.photoUrl;
        
         loginHandlers.signUp(signUpObject).catch( returnObject => {
            expect(returnObject.payload).toEqual(ERRORS.ERR_REQOBJ_DM);
        });
    });

    test("it should reject the promise with non-unique username error",()=>{
         loginHandlers.signUp(signUpObject).catch( returnObject => {
            expect(returnObject.payload).toEqual(ERRORS.ERR_USR_DM);
        });
    });
});

 describe("Login unit test cases",() => {
    
    let loginObject = {};
    beforeEach(() => {
        loginObject = {
            userName : "sampleDummy",
            password : "samplePassword",
        };
    });

    test("it should login the user",()=>{
         loginHandlers.login(loginObject).then( returnObject => {
            expect(returnObject.status).toEqual(SUCCESSSTATUS);
        }).catch( rejectObject => {
            console.log(rejectObject);
        });
    });

    test("it should reject the promise with invalid request object error",()=>{
        delete loginObject.password;

        loginHandlers.login(loginObject).catch( returnObject => {
            expect(returnObject.payload).toEqual(ERRORS.ERR_REQOBJ_DM);
        });
    });

    test("it should reject the promise with invalid username error",()=>{
        loginObject.userName = "invalidUserName";

        loginHandlers.login(loginObject).catch( returnObject => {
            expect(returnObject.payload).toEqual(ERRORS.ERR_INUSR_DM);
        });
    });

    test("it should reject the promise with invalid password error",()=>{
        loginObject.password = "invalidPassword";

        loginHandlers.login(loginObject).catch( returnObject => {
            expect(returnObject.payload).toEqual(ERRORS.ERR_PASS_DM);
        });
    });
 });
