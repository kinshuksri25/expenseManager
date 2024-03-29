//Dependencies
import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {ERRORS} from "../../../../config/dataConstants";
import localSession from '../../Components/sessionComponent';
import * as actions from '../../store/user/actions';
import { actionTypes } from '../../store/user/types';
import * as axios from '../axios/axios';
import "../../public/css/settings.css";


class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userBudget: 0,
            addExpenseCatagory: "",
            expenseCatagories: [],
            isLoading: false
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.listGenerator = this.listGenerator.bind(this);
        this.stateSetter = this.stateSetter.bind(this);
        this.deleteExpenseCatagoryHandler = this.deleteExpenseCatagoryHandler.bind(this);
        this.initUserSetter = this.initUserSetter.bind(this);
    }

    stateSetter() {
        //set the local state 
        let {budget,expenseCatagories} = this.props.user;
        this.setState({
            userBudget: budget,
            expenseCatagories: expenseCatagories
        });
    }

    componentDidMount() {
        if (this.props.user.userName == "") {
            this.initUserSetter();
        }
        this.stateSetter();
    }


    initUserSetter() {
        let userName = localSession.getSessionObject().sessionID;
        //make the get call
        if (userName != undefined) {
            this.setState({
                isLoading: true
            });
            axios.axiosGET('/getUserData?userName=' + userName, {}, {}).then(resolve => {
                if (resolve.status != "ERROR") {
                    if (JSON.stringify(resolve.payload) != JSON.stringify({})) {
                        this.props.setInitState(resolve.payload);
                        this.stateSetter();
                    } else {
                        this.props.setErrorMsgState(ERRORS.ERR_BCKERR_CLI);
                    }
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
            window.location.pathname = "/landing";
        }
    }

    onChangeHandler(event) {
        if (event.target.id == "budget") {
            this.setState({
                userBudget: event.target.value
            });

        } else {
            this.setState({
                addExpenseCatagory: event.target.value
            });
        }
    }

    onSubmitHandler(event) {
        let userName = localSession.getSessionObject().sessionID;
        event.preventDefault();
        this.setState({
            isLoading: true
        });
        if (event.target.id == "budgetChangeForm") {
            //make the axios call
            axios.axiosPUT('/editBudget', { userName: userName, budget: this.state.userBudget })
                .then((resolve) => {
                    if (resolve.status == "SUCCESS") {
                        this.props.editBudget(resolve.payload);
                        this.stateSetter();
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
            //make the axios call
            axios.axiosPOST('/addExp', { userName: userName, expenseCatagories: this.state.addExpenseCatagory })
                .then((resolve) => {
                    if (resolve.status == "SUCCESS") {
                        this.props.addExpenseCatagories(resolve.payload);
                        this.stateSetter();
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
        }
    }

    deleteExpenseCatagoryHandler(event) {
        //make the axios call
        let userName = localSession.getSessionObject().sessionID;
        let userObject = {...this.props.user};
        this.setState({
            isLoading: true
        });
        let requestObject = {};
        requestObject.userName = userName;
        requestObject.expenseCatagories = event.target.id;
        
        let delExpArr = [];
        userObject.expenses.map(expense =>{ 
            if(expense.category == event.target.id)       
            delExpArr.push(expense);  
        });
        requestObject.expenses = delExpArr
        axios.axiosPUT('/deleteExpenseCatagories',requestObject,{},{}).then(resolve => {
                if (resolve.status == "SUCCESS") {
                      this.props.deleteExpenseCatagories(resolve.payload);
                      this.stateSetter();
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
    }

    listGenerator() {
        let expenseCatagories = this.state.expenseCatagories;
        return (expenseCatagories.map(expenseCatagory => {
            return ( <div className="row expenseCatListContainer" >
                        <li className = "expenseCatList" > { expenseCatagory } </li> 
                        <button className = "expenseCatBut" id= {expenseCatagory} 
                        onClick = { this.deleteExpenseCatagoryHandler }> delete </button>    
                    </div>);
            }));
    }

    render() {
        let buttonStateBudget = this.props.user.budget == this.state.userBudget ? true : false;
        let buttonStateExpense = this.state.addExpenseCatagory == "" ? true : false;

        return ( <div className = "settingsContainer">
                    <form className = "settingsForm"
                    id = "budgetChangeForm"
                    onSubmit = { this.onSubmitHandler }>
                        <input type = "number"
                        name = "Budget"
                        placeholder = "0"
                        value = { this.state.userBudget }
                        id = "budget"
                        required = { true }
                        onChange = { this.onChangeHandler }/> 
                        <button id = "changeBudgetButton"
                        className = "submitButton"
                        disabled = { buttonStateBudget }> ChangeBudget </button>    
                    </form>

                    <form className = "settingsForm"
                    id = "addExpenseCatagoryForm"
                    onSubmit = { this.onSubmitHandler }>
                    <input type = "text"
                    name = "expenseCatagory"
                    value = { this.state.addExpenseCatagory }
                    placeholder = "Food"
                    id = "expenseCatagory"
                    required = { true }
                    onChange = { this.onChangeHandler }/> 
                    <button id = "addExpenseCatagoryButton"
                    className = "submitButton"
                    disabled = { buttonStateExpense } > Add </button>   
                    </form>
                    <ul id = "expenseCatagoryList" > { this.listGenerator() } </ul>  
                </div>
            );
        }
}

const mapStateToProps = (state) => {
    return {
        user: {...state.userStateReducer}
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setInitState: (userObject) => {
            dispatch(actions.editUserDetails(userObject, actionTypes.SETINIUSERDATA));
        },
        editBudget: (value) => {
            dispatch(actions.editUserDetails(value, actionTypes.EDITBUDGET));
        },
        addExpenseCatagories: (value) => {
            dispatch(actions.editUserDetails(value, actionTypes.ADDEXPENSECAT));
        },
        deleteExpenseCatagories: (value) => {
            dispatch(actions.editUserDetails(value, actionTypes.DELETEEXPENSECAT));
        },
        setErrorMsgState: (errorPayload) => {
            dispatch(actions.setErrorMsg(errorPayload, actionTypes.SETERRORMSG));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);