//Dependencies
import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import { connect } from 'react-redux';

import {actionTypes} from "../../store/user/types";
import {setErrorMsg} from "../../store/user/actions";
import {ERRORS} from "../../../../config/dataConstants";
import SimpleForm from '../Forms/simpleform';
import formConstants from '../Forms/formConstants';
import localSession from '../../Components/sessionComponent';
import * as axios from '../axios/axios';
import "../../public/css/signup.css";

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
                var errorMsg = this.checkPasswordValidity(formObject.password, formObject.confirmPassword);
                    if (errorMsg =="") {
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
                                this.props.setErrorMsgState(resolve.status);
                            }
                        }).catch(reject => {
                            this.props.setErrorMsgState(ERRORS.ERR_NET_CLI);
                        }).finally(() => {
                            this.setState({
                                isLoading: false
                            });
                        });
                    } else {
                        this.props.setErrorMsgState(errorMsg);
                    }
            } else {
                console.log(ERRORS.ERR_INVOBJ_CLI);
            }
        }

    checkPasswordValidity(password, confirmPassword) {
        var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        if (!regex.test(password)) {
            return ERRORS.ERR_INPASS_CLI;
        }
        if (password != confirmPassword) {
            return ERRORS.ERR_PASSMIS_CLI;
        }
        return "";
    };
    
    render() {
        return ( < div className = "signUpContainer">
                    <SimpleForm formAttributes = { formConstants.signup }
                    submitHandler = { this.onSubmitHandler }
                    changeFieldNames = {[]}/> 
                 </div>);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setErrorMsgState: (errorPayload) => {
            dispatch(setErrorMsg(errorPayload, actionTypes.SETERRORMSG));
        }
    };
};

export default connect(null, mapDispatchToProps)(SignUp);