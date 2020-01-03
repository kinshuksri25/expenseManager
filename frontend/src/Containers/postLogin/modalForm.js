//Dependencies
import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import { connect } from 'react-redux';

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
        if(formObject.category == "" || formObject.category == "Select...")
        {
            console.log("Please select a category");
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
                            console.log(resolve.payload);
                        }
                    }).catch(reject => {
                        console.log(reject);
                    }).finally(() => {
                        this.setState({
                            isLoading: false
                        });
                        this.props.toggleExpenseForm(); 
                    });
            } else {
                console.log("Budget Exceeded!");
            }
        }
    }

    render() {
        return ( <div >
                    <button id = "cancelAddExpense"
                    className = "cancelButton"
                    onClick = { this.props.toggleExpenseForm } > X </button>  
                    <SimpleForm formAttributes = { formConstants.addExpense }
                    submitHandler = { this.onSubmitHandler }
                    changeFieldNames = {[]}
                    options = {["Select...",...this.props.userObject.expenseCatagories]}/ >
                </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        userObject: {...state }
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addExpense: (userObject) => {
            dispatch(actions.editUserDetails(userObject, actionTypes.ADDEXPENSE));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);