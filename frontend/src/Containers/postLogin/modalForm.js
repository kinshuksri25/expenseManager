//Dependencies
import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {ERRORS} from "../../../../config/dataConstants";
import localSession from '../../Components/sessionComponent';
import * as axios from '../axios/axios';
import { actionTypes } from '../../store/user/types';
import * as actions from '../../store/user/actions';
import SimpleForm from '../Forms/simpleform';
import formConstants from '../Forms/formConstants';

class Modal extends Component {

    constructor(props) {
        super(props);
        this.state={
            isLoading:false
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(formObject) {
        if(formObject.category == "" || formObject.category == "Select Category")
        {
            this.props.setErrorMsgState(ERRORS.ERR_CATSEL_CLI);
        }else{
            delete formObject.AddExpense;
            formObject.state = true;
            let requestObject = {
                    userName: localSession.getSessionObject().sessionID,
                    expenses: {...formObject }
                }
            //check the expenseVal 
            let expenseArr = [...this.props.userObject.expenses];
            let totalExpense = 0;
            expenseArr.map(expense => {
                if(expense.state == true)
                totalExpense += parseInt(expense.amount, 10);
            })
            totalExpense += parseInt(formObject.amount, 10);
            if (totalExpense <= this.props.userObject.budget) {
                this.setState({
                    isLoading: true
                });
                //make the axios call
                axios.axiosPOST('/addExp', requestObject, {}, {})
                    .then((resolve) => {
                        if (resolve.status == "SUCCESS") {
                            this.props.addExpense(resolve.payload);
                        } else {
                            this.props.setErrorMsgState(resolve.payload);
                        }
                    }).catch(reject => {
                        this.props.setErrorMsgState(ERRORS.ERR_NET_CLI);
                    }).finally(() => {
                        this.setState({
                            isLoading: false
                        });
                        this.props.toggleExpenseForm(); 
                    });
            } else {
                this.props.setErrorMsgState(dataConstants.ERRORS.ERR_BUDEXX_CLI);
            }
        }
    }

    render() {
        return ( <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="modalForm">
                    <button id = "cancelAddExpense"
                    className = "cancelButton"
                    onClick = { this.props.toggleExpenseForm } > Cancel </button>  
                    <SimpleForm formAttributes = { formConstants.addExpense }
                    submitHandler = { this.onSubmitHandler }
                    changeFieldNames = {[]}
                    options = {["Select Category",...this.props.userObject.expenseCatagories]}/ >
                </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        userObject: {...state.userStateReducer}
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addExpense: (userObject) => {
            dispatch(actions.editUserDetails(userObject, actionTypes.ADDEXPENSE));
        },
        setErrorMsgState: (errorPayload) => {
            dispatch(actions.setErrorMsg(errorPayload, actionTypes.SETERRORMSG));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);