/*
*   Primary Router File
*/

//Dependencies
let express = require('express');
let app = express();
var bodyParser = require('body-parser');

let { ERRORS, ERRORSTATUS, SUCCESSSTATUS } = require('../../../config/dataConstants');
let domainLogicHandlers = require('./domainLogicHandlers');
let profileHandlers = require('./profileHandlers');
let loginHandlers = require('./loginHandlers');

//defining the server object
let server = {};
//defining the req and res objects
let requestObject = {};
let responseObject = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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

//TODO --> set appropriate CORS header 
app.post('/login',function(req,res){
    requestObject = req.body;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type','application/json');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    loginHandlers.login(requestObject).then( resolveObject => {
        responseObject = resolveObject; 
        res.status(200);
        res.write(JSON.stringify(responseObject));
        res.end();
    }).catch( rejectObject => {
        responseObject = rejectObject;
        if(responseObject.payload == ERRORS.ERR_RD_DB || responseObject.payload == ERRORS.ERR_CONN_DB) 
        {
            res.status(500);
        }else{
            res.status(400);
        }
        res.write(JSON.stringify(responseObject));
        res.end();
    });
});

app.post('/signup',function(req,res){
    requestObject = req.body;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type','application/json');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    loginHandlers.signUp(requestObject).then( resolveObject => {
        responseObject = resolveObject;
        res.status(200);       
        res.write(JSON.stringify(responseObject));
        res.end();
    }).catch( rejectObject => {
        responseObject = rejectObject;
        if(responseObject.payload == ERRORS.ERR_RD_DB || responseObject.payload == ERRORS.ERR_WR_DB || responseObject.payload == ERRORS.ERR_CONN_DB) 
        {
            res.status(500);
        }else{
            res.status(400);
        }
        res.write(JSON.stringify(responseObject));
        res.end();
    });
});

app.get('/getUserData',function(req,res){
    requestObject.userName = req.query.userName;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type','application/json');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    domainLogicHandlers.getUserData(requestObject).then( resolveObject => {
        responseObject = resolveObject;  
        res.status(200);     
        res.write(JSON.stringify(responseObject));
        res.end();
    }).catch( rejectObject => {
        responseObject = rejectObject;
        if(responseObject.payload == ERRORS.ERR_RD_DB || responseObject.payload == ERRORS.ERR_CONN_DB) 
        {
            res.status(500);
        }else{
            res.status(400);
        }
        res.write(JSON.stringify(responseObject));
        res.end();
    });
});

app.post('/addExp',function(req,res){
    requestObject = req.body;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type','application/json');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    domainLogicHandlers.addExp(requestObject).then( resolveObject => {
        responseObject = resolveObject;
        res.status(200);  
        res.write(JSON.stringify(responseObject));
        res.end();     
    }).catch( rejectObject => {
        responseObject = rejectObject;
        if(responseObject.payload == ERRORS.ERR_WR_DB || responseObject.payload == ERRORS.ERR_CONN_DB) 
        {
            res.status(500);
        }else{
            res.status(400);
        }
        res.write(JSON.stringify(responseObject));
        res.end();
    });
});

app.put('/editExpense',function(req,res){
    requestObject = req.body;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type','application/json');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    domainLogicHandlers.editExpense(requestObject).then( resolveObject => {
        responseObject = resolveObject;
        res.status(200);       
        res.write(JSON.stringify(responseObject));
        res.end();
    }).catch( rejectObject => {
        responseObject = rejectObject;
        if(responseObject.payload == ERRORS.ERR_UP_DB || responseObject.payload == ERRORS.ERR_CONN_DB) 
        {
            res.status(500);
        }else{
            res.status(400);
        }
        res.write(JSON.stringify(responseObject));
        res.end();
    });
});

app.put('/editBudget',function(req,res){
    requestObject = req.body;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type','application/json');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    domainLogicHandlers.editBudget(requestObject).then( resolveObject => {
        responseObject = resolveObject; 
        res.status(200);  
        res.write(JSON.stringify(responseObject));
        res.end();    
    }).catch( rejectObject => {
        responseObject = rejectObject;
        if(responseObject.payload == ERRORS.ERR_UP_DB || responseObject.payload == ERRORS.ERR_CONN_DB) 
        {
            res.status(500);
        }else{
            res.status(400);
        }
        res.write(JSON.stringify(responseObject));
        res.end();
    });
});

app.put('/editProfile',function(req,res){
    requestObject = req.body;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type','application/json');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    profileHandlers.editProfile(requestObject).then( resolveObject => {
        responseObject = resolveObject;
        res.status(200); 
        res.write(JSON.stringify(responseObject));
        res.end();      
    }).catch( rejectObject => {
        responseObject = rejectObject;
        if(responseObject.payload == ERRORS.ERR_UP_DB || responseObject.payload == ERRORS.ERR_CONN_DB) 
        {
            res.status(500);
        }else{
            res.status(400);
        }
        res.write(JSON.stringify(responseObject));
        res.end();
    });
});

app.delete('/deleteExpenseCatagories',function(req,res){
    requestObject = req.body;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type','application/json');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    domainLogicHandlers.deleteExpenseCatagory(requestObject).then( resolveObject => {
        responseObject = resolveObject; 
        res.status(200);
        res.write(JSON.stringify(responseObject));
        res.end();      
    }).catch( rejectObject => {
        responseObject = rejectObject;
        if(responseObject.payload == ERRORS.ERR_DL_DB || responseObject.payload == ERRORS.ERR_CONN_DB) 
        {
            res.status(500);
        }else{
            res.status(400);
        }
        res.write(JSON.stringify(responseObject));
        res.end();
    });
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