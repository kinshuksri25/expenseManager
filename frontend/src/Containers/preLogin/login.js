//Dependencies
import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import SimpleForm from '../Forms/simpleform';
import formConstants from '../Forms/formConstants';
import localSession from '../../Components/sessionComponent';
import * as axios from '../axios/axios';
import '../../public/css/login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    //submit handler for the form
    onSubmitHandler(formObject) {
        delete formObject.Login;
        this.setState({
            isLoading: true
        });
        if (formObject.hasOwnProperty('userName') && formObject.hasOwnProperty('password')) {
            axios.axiosPOST("/login", formObject, {}, {}).then(resolve => {
                if (resolve.status != "ERROR") {
                    //set the session
                    var session = localSession;
                    var sessionObject = session.setSessionObject(resolve.payload);
                    //post login form
                    window.location.pathname = "/dashboard/home";
                } else {
                    console.log(resolve.payload);
                }
            }).catch(reject => {
                console.log(reject);
            }).finally(() => {
                this.setState({
                    isLoading: false
                });
            });
        } else {
            //invalid object
        }

    }

    render() {
        return ( <div  className = "formContainer">
                    <SimpleForm formAttributes = { formConstants.login }
                    submitHandler = { this.onSubmitHandler }
                    changeFieldNames = {[]}/> 
                </div> );
    }

}

export default Login;