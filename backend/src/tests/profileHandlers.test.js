/*
*   Profile Handlers unit test file
*/

//Dependencies
let {SUCCESSSTATUS, ERRORS} = require('../../../config/dataConstants');
let profileHandlers = require('../lib/profileHandlers');

describe("Edit Profile unit test cases", () => {
    
    let userObject = {};
    beforeEach(() => {
        userObject = {
            userName : "sampleDummy",
            changeVal : "",
            changeVar : ""
        };
    });

    test("it edits the username",() => {
        userObject.changeVar = "userName";
        userObject.changeVal = "dummySample";

        profileHandlers.editProfile(userObject).then( resolveResult => {
            expect(resolveResult.status).toEqual(SUCCESSSTATUS);
        } ).catch( rejectResult => {
            console.log(rejectResult);
        });
    });
    
    test("it edits the profilePhoto",() => {
        userObject.changeVar = "photoUrl";
        userObject.changeVal = "newPhoto";

        profileHandlers.editProfile(userObject).then( resolveResult => {
            expect(resolveResult.status).toEqual(SUCCESSSTATUS);
        } ).catch( rejectResult => {
            console.log(rejectResult);
        });
    });

    test("it edits the password",() => {
        userObject.changeVar = "password";
        userObject.changeVal = "newPassword";

        profileHandlers.editProfile(userObject).then( resolveResult => {
            expect(resolveResult.status).toEqual(SUCCESSSTATUS);
        } ).catch( rejectResult => {
            console.log(rejectResult);
        });
    });

    test("it fails to edit the userProfile",() => {
        userObject.changeVar = "password";
        userObject.changeVal = "newPassword";
        delete userObject.userName;

        profileHandlers.editProfile(userObject).catch( rejectResult => {
            expect(rejectResult.status).toEqual(ERRORSTATUS);
        });
    });
});