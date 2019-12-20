/*
*   Primary Router File
*/

//Dependencies
let app = require('express')(express.json());
let domainLogicHandlers = require('./domainLogicHandlers');
let profileHandlers = require('./profileHandlers');
let loginHandlers = require('./loginHandlers');

//defining the server object
let server = {};

//defining the req and res objects
let requestObject = {};
let responseObject = {};

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
app.post('/login',function(req,res){
    requestObject = req.body;
    domainLogicHandlers.login(requestObject).then( resolveObject => {
        responseObject = resolveObject;       
    }).catch( rejectObject => {
        responseObject = rejectObject;
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type','application/json');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.write(responseObject);
    res.end();
});

app.post('/signup',function(req,res){
    requestObject = req.body;
    domainLogicHandlers.signup(requestObject).then( resolveObject => {
        responseObject = resolveObject;       
    }).catch( rejectObject => {
        responseObject = rejectObject;
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type','application/json');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.write(responseObject);
    res.end();
});

app.get('/getUserData',function(req,res){
    requestObject.userName = req.query.userName;
    domainLogicHandlers.getUserData(requestObject).then( resolveObject => {
        responseObject = resolveObject;       
    }).catch( rejectObject => {
        responseObject = rejectObject;
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type','application/json');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.write(responseObject);
    res.end();
});

app.post('/addExp',function(req,res){
    requestObject = req.body;
    domainLogicHandlers.addExp(requestObject).then( resolveObject => {
        responseObject = resolveObject;       
    }).catch( rejectObject => {
        responseObject = rejectObject;
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type','application/json');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.write(responseObject);
    res.end();
});

//TODO --> need to finish the below route
app.put('/editExpense',function(req,res){
    requestObject = req.body;
    domainLogicHandlers.editExpense(requestObject).then( resolveObject => {
        responseObject = resolveObject;       
    }).catch( rejectObject => {
        responseObject = rejectObject;
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type','application/json');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.write(responseObject);
    res.end();
});

app.put('/editBudget',function(req,res){
    requestObject = req.body;
    domainLogicHandlers.editBudget(requestObject).then( resolveObject => {
        responseObject = resolveObject;       
    }).catch( rejectObject => {
        responseObject = rejectObject;
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type','application/json');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.write(responseObject);
    res.end();
});

app.put('/editProfile',function(req,res){
    requestObject = req.body;
    domainLogicHandlers.editProfile(requestObject).then( resolveObject => {
        responseObject = resolveObject;       
    }).catch( rejectObject => {
        responseObject = rejectObject;
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type','application/json');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.write(responseObject);
    res.end();
});

app.delete('/deleteExpenseCatagory',function(req,res){
    requestObject = req.body;
    domainLogicHandlers.deleteExpenseCatagory(requestObject).then( resolveObject => {
        responseObject = resolveObject;       
    }).catch( rejectObject => {
        responseObject = rejectObject;
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type','application/json');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.write(responseObject);
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