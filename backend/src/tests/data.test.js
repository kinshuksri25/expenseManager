/*
*   DAO unit test file
*/

//Dependencies
let mongo = require('../lib/data');
let { dbConstants} = require('../../../config/dataConstants');

describe("fetch data test",()=>{

    test("it should fetch the data",()=>{
        return expect(mongo.read(dbConstants.testCollection,{test:"updatedVal"},{projection:{_id: 0}})).resolves.toEqual([{test:"updatedVal"}]);
    });

    test("it should fetch empty",()=>{
        return expect(mongo.read(dbConstants.testCollection,{incorrect:"incorrectVal"},{})).resolves.toEqual([]);
    });
});

describe("insert data test",()=>{

    test("it should insert data to DB",()=>{
        mongo.insert(dbConstants.testCollection,{jest:"testValinsert"},{}).then(resolve => {
            expect(resolve.result.n).toEqual(1);
        }).catch(reject => {
            console.log(reject);
        });
    });
});

describe("delete data test",()=>{

    test("it should hard delete data",()=>{
        mongo.delete(dbConstants.testCollection,{jest:"testValinsert"},{},1).then(resolve => {
            expect(resolve.result.n).toEqual(1);
        }).catch(reject => {
            console.log(reject);
        }); 
    });

    test("it should not hard delete data",()=>{
        mongo.delete(dbConstants.testCollection,{jest:"testValinsert"},{},1).then(resolve => {
            expect(resolve.result.n).toEqual(0);
        }).catch(reject => {
            console.log(reject);
        }); 
    });
});

describe("update data test",()=>{

    test("it should update the data",()=>{
        mongo.update(dbConstants.testCollection,{test:"updatedVal"},{$set : {test:"updatedVal"}},{},1).then(resolve => {
            expect(resolve.result.n).toEqual(1);
        }).catch(reject => {
            console.log(reject);
        }); 
    });

    test("it should not update the data",()=>{
        mongo.update(dbConstants.testCollection,{incorrect:"incorrectVal"},{$set : {test:"updatedVal"}},{},1).then(resolve => {
            expect(resolve.result.n).toEqual(0);
        }).catch(reject => {
            console.log(reject);
        }); 
    });
});