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

                    window.location.pathname = "/dashboard/home";
                } else {
                    this.props.setErrorMsgState(resolve.payload);
                }
            }).catch(reject => {
                this.props.setErrorMsgState(ERRORS.ERR_NET_CLI);
            }).finally(() => {
                this.setState({
                    isLoading: false
                });
            });
        } else {
                console.log(ERRORS.ERR_INVOBJ_CLI);
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


const mapDispatchToProps = dispatch => {
    return {
        setErrorMsgState: (errorPayload) => {
            dispatch(setErrorMsg(errorPayload, actionTypes.SETERRORMSG));
        }
    };
};

export default connect(null, mapDispatchToProps)(Login);