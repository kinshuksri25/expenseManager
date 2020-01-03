//Dependencies
import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import { connect } from 'react-redux';

import dataConstants from "../../../../config/dataConstants";
import localSession from '../../Components/sessionComponent';
import * as axios from '../axios/axios';
import { actionTypes } from '../../store/user/types';
import { setinitState,editUserDetails } from '../../store/user/actions';
import BudgetOverview from './budgetOverview';
import ExpenseBreakDown from './expenseBreakDown';
import Modal from './modalForm';
import Table from '../tables/tables';
import tableConstants from '../tables/tableConstants';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showExpenseForm: false,
        }
        this.initUserSetter = this.initUserSetter.bind(this);
        this.toggleExpenseForm = this.toggleExpenseForm.bind(this);
        this.changeExpenseState = this.changeExpenseState.bind(this);
    }

    componentDidMount() {
        if (this.props.userObject.userName == "") {
            this.initUserSetter();
        }
    }

    changeExpenseState(expenseID){

        let expenseArr = [...this.props.userObject.expenses];
        let totalExpense = 0;
        let userName = localSession.getSessionObject().sessionID;
        let expenses = {};
        let isValidChange = false;
        this.props.userObject.expenses.map(expense =>{
            if(expense.id == expenseID){
                expenses = expense;
            }
        });
        
        if(expenses.state){
            isValidChange = true;
            expenses.state = !expenses.state;
        }
        else{
            expenseArr.map(expense => {
                if(expense.state == true)
                totalExpense += parseInt(expense.amount, 10);
            })
            totalExpense += parseInt(expenses.amount, 10);
            if (totalExpense <= this.props.userObject.budget) {
                isValidChange = true;
                expenses.state = !expenses.state;
            }
        }


        if(userName != undefined)
        {
            if(isValidChange){
                if(JSON.stringify(expenses) != JSON.stringify({}))
                {
                 let userObject ={
                     userName,
                     expenses
                     }
                axios.axiosPUT("/editExpense", userObject, {}, {}).then(resolve => {
                         if (resolve.status != "ERROR") {
                             if (JSON.stringify(resolve.payload) != JSON.stringify({})) {
                                this.props.editExpense(resolve.payload);
                             } else {
                                 //TODO -> need to add a new error for this 
                                 throw resolve.status;
                             }
                         } else {
                             throw resolve.payload;
                         }
                     }).catch(reject => {
                         console.log(reject);
                     }).finally(() => {});
                }
            }else{
               console.log("Budget Exceeded!"); 
            }
        } else {
            window.location.pathname = "/landing";
        }
    }

    initUserSetter() {
        let userName = localSession.getSessionObject().sessionID;
        //make the get call
        if (userName != undefined) {
            axios.axiosGET('/getUserData?userName=' + userName, {}, {}).then(resolve => {
                if (resolve.status != "ERROR") {
                    if (JSON.stringify(resolve.payload) != JSON.stringify({})) {
                        this.props.setInitState(resolve.payload);
                    } else {
                        //TODO -> need to add a new error for this 
                        throw resolve.status;
                    }
                } else {
                    throw resolve.payload;
                }
            }).catch(reject => {

                console.log(reject);
            });
        } else {
            window.location.pathname = "/landing";
        }
    }

    toggleExpenseForm() {
        let formVisibility = this.state.showExpenseForm;
        this.setState({
            showExpenseForm: !formVisibility
        });
    }

    render() {
        let modalFormPlace = this.state.showExpenseForm ? < Modal toggleExpenseForm = { this.toggleExpenseForm }/>
         : <Table tableConstants = {tableConstants.expenseTableCat} 
                    tableValueArr ={this.props.userObject.expenses} 
                    deletebuttonDetails = {dataConstants.deleteButtonDetails} 
                    addbuttonDetails = {dataConstants.addButtonDetails}
                    changeExpenseState ={this.changeExpenseState}/> ;
        return ( <div>
                    <BudgetOverview/>
                    <ExpenseBreakDown/>
                    <button className = "addExpenseButton"
                    id = "addExpense"
                    onClick = { this.toggleExpenseForm } >
                    Add Expense </button> 
                    {modalFormPlace}  
                </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        userObject: {...state }
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setInitState: (userObject) => {
            dispatch(setinitState(userObject, actionTypes.SETINIUSERDATA));
        },
        editExpense: (userObject) => {
            dispatch(editUserDetails(userObject, actionTypes.EDITEXPENSE));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);