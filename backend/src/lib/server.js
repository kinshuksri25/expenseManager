/*
*   Primary Router File
*/

//Dependencies
var app = require('express')();
var mongo = require('./data');
var { dbConstants} = require('../../../config/dataConstants');

//defining the server object
var server = {};

/*
*   defining all the routes using express
*/

//this is a test GET route for supertest
app.get('/getTestRoute',function(req,res){
    res.setHeader('Content-Type','application/json');
    res.status(200);
    res.end();
});

//this is a test POST route for supertest
app.post('/postTestRoute',function(req,res){
    res.setHeader('Content-Type','application/json');
    res.status(200);
    res.end();
});

//TODO --> create all the required routes for business logic
app.get('/getUserData',function(req,res){
    res.end();
});

app.post('/addExpense',function(req,res){
    res.end();
});

app.post('/login',function(req,res){
    res.end();
});

app.post('/signup',function(req,res){
    res.end();
});

app.post('/addExpenseCatagory',function(req,res){
    res.end();
});

app.put('/editExpense',function(req,res){
    res.end();
});

app.put('/editBudget',function(req,res){
    res.end();
});

app.delete('/deleteExpenseCatagory',function(req,res){
    res.end();
});    

//init function
server.init = () => {
    //start the http server
    //TODO --> need to add port and env from config files/cmd
    app.listen(5000, function() {
        console.log('The http server is listening on port 5000 in Development mode');
    });
};


//export the module
module.exports = {server,app};