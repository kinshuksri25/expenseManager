//Dependencies
import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import { connect } from 'react-redux';

import localSession from '../../Components/sessionComponent';
import * as axios from '../axios/axios';
import { actionTypes } from '../../store/user/types';
import * as actions from '../../store/user/actions';


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
        let { budget, expenseCatagories } = this.props.user;
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
                //TODO -> need to add DC file
                if (resolve.status != "ERROR") {
                    if (JSON.stringify(resolve.payload) != JSON.stringify({})) {
                        this.props.setInitState(resolve.payload);
                        this.stateSetter();
                    } else {
                        //TODO -> need to add a new error for this 
                        throw resolve.status;
                    }
                } else {
                    throw resolve.payload;
                }
            }).catch(reject => {
                console.log(reject);
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
            //make the axios call
            axios.axiosPOST('/addExp', { userName: userName, expenseCatagories: this.state.addExpenseCatagory })
                .then((resolve) => {
                    if (resolve.status == "SUCCESS") {
                        this.props.addExpenseCatagories(resolve.payload);
                        this.stateSetter();
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
        requestObject.expenseCatagories = event.target.className;
        
        let delExpArr = [];
        userObject.expenses.map(expense =>{ 
            if(expense.category == event.target.className)       
            delExpArr.push(expense);  
        });
        requestObject.expenses = delExpArr
        axios.axiosPUT('/deleteExpenseCatagories',requestObject,{},{}).then(resolve => {
                if (resolve.status == "SUCCESS") {
                      this.props.deleteExpenseCatagories(resolve.payload);
                      this.stateSetter();
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
    }

    listGenerator() {
        let expenseCatagories = this.state.expenseCatagories;
        return (expenseCatagories.map(expenseCatagory => {
            return ( <div id = { expenseCatagory } >
                        <li className = { expenseCatagory } > { expenseCatagory } </li> 
                        <button onClick = { this.deleteExpenseCatagoryHandler }
                        className = { expenseCatagory } > delete </button>
                    </div>);
            }));
    }

    render() {
        let buttonStateBudget = this.props.budget == this.state.userBudget ? true : false;
        let buttonStateExpense = this.state.addExpenseCatagory == "" ? true : false;

        return ( <div>
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
                    placeholder = ""
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
        user: {...state },
        budget : state.budget,

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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);