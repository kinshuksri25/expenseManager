//Dependencies
import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import SimpleForm from '../Forms/simpleform';
import formConstants from '../Forms/formConstants';
import localSession from '../../Components/sessionComponent';
import * as axios from '../axios/axios';

//sessionComponent has to be added to dependencies

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
        this.checkPasswordValidity = this.checkPasswordValidity.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }
    onSubmitHandler(formObject) {
            delete formObject.SignUp;
            if (formObject.hasOwnProperty('userName') && formObject.hasOwnProperty('firstName') && formObject.hasOwnProperty('lastName') && formObject.hasOwnProperty('occupation') && formObject.hasOwnProperty('password') && formObject.hasOwnProperty('confirmPassword')) {
                //password check
                var errorMsgObject = this.checkPasswordValidity(formObject.password, formObject.confirmPassword);
                //set the state!
                this.setState({
                    "errorMsgObject": errorMsgObject
                }, () => {
                    if (JSON.stringify(errorMsgObject) == JSON.stringify({})) {
                        this.setState({
                            isLoading: true
                        });
                        delete formObject.ConfirmPassword;
                        axios.axiosPOST("/signup", formObject, {}, {}).then(resolve => {
                            if (resolve.status != "ERROR") {
                                //set the session
                                var session = localSession;
                                var sessionObject = session.setSessionObject(resolve.payload);
                                //post login form
                                window.location.pathname = "/dashboard/home";
                            } else {
                                console.log(resolve);
                            }
                        }).catch(reject => {
                            console.log(reject);
                        }).finally(() => {
                            this.setState({
                                isLoading: false
                            });
                        });
                    } else {
                        //incorrect password
                        console.log(errorMsgObject);
                    }
                });
            } else {
                //invalid formObject
            }
        }
        //check password
    checkPasswordValidity(password, confirmPassword) {
        var errorMsgObject = {};
        //check password validity
        if (password.match(/[a-z]/g) == null) {
            errorMsgObject.invalidPassLower = "The password should contain a lowercase character";
        }
        if (password.match(/[A-Z]/g) == null) {
            errorMsgObject.invalidPassUpper = "The password should contain an uppercase character";
        }
        if (password.match(/[0-9]/g) == null) {
            errorMsgObject.invalidPassDigit = "The password should contain a digit";
        }
        if (password.length < 8) {
            errorMsgObject.shortPassword = "The password should be atleast 8 characters long";
        }
        if (password != confirmPassword) {
            errorMsgObject.passwordMisMatch = "Password and Confirm-Password should match";
        }
        return errorMsgObject;
    };
    render() {
        return ( < div >
                    <SimpleForm formAttributes = { formConstants.signup }
                    submitHandler = { this.onSubmitHandler }
                    changeFieldNames = {[]}/> 
                 </div>);
    }
}

export default SignUp;