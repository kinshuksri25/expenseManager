//Dependencies
import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import localSession from '../../Components/sessionComponent';
import * as actions from '../../store/user/actions';
import { actionTypes } from '../../store/user/types';
import { setinitState } from '../../store/user/actions';
import * as axios from '../axios/axios';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            occupation: "",
            userName: "",
            password: "",
            confirmPassword: "",
            profilePhoto: "",
            isLoading: false
        }
        this.stateSetter = this.stateSetter.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.pictureSetter = this.pictureSetter.bind(this);
        this.checkPasswordValidity = this.checkPasswordValidity.bind(this);
    }

    stateSetter() {
        //set the local state 
        this.setState({
            userName: this.props.userName,
            occupation: this.props.occupation,
        });
    }

    componentDidMount() {
        if (this.props.userName == "") {
            this.initUserSetter();
        }
        //set the profile picture
        this.pictureSetter();
        //set the initialState
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

    pictureSetter() {
        this.setState({
            isLoading: true
        });
        axios.axiosGET('/getPicture').then((resolve) => {
            if (resolve.status == "SUCCESS") {
                //add the dispatchers
                this.setState({ profilePhoto: resolve.payload });

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
    onSubmitHandler(event) {
        event.preventDefault();
        let profileChangeObject = {};
        profileChangeObject.userName = localSession.getSessionObject().sessionID;
        this.setState({
            isLoading: true
        });
        switch (event.target.id) {
            case "occupationChange":
                {
                    profileChangeObject.changeVar = "occupation";
                    profileChangeObject.changeVal = this.state.occupation;
                    axios.axiosPUT('/editProfile', profileChangeObject).then((resolve) => {
                        if (resolve.status == "SUCCESS") {
                            //add the dispatchers
                            this.props.editUserDetails(resolve.payload, actionTypes.EDITOCCUPATION);
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
                    break;
                }
            case "userNameChange":
                {
                    profileChangeObject.changeVar = "userName";
                    profileChangeObject.changeVal = this.state.userName;
                    axios.axiosPUT('/editProfile', profileChangeObject).then((resolve) => {
                        if (resolve.status == "SUCCESS") {
                            //add the dispatchers
                            this.props.editUserDetails(resolve.payload, actionTypes.EDITUSERNAME);
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
                    break;
                }
            case "passwordChange":
                {
                    profileChangeObject.changeVar = "password";
                    profileChangeObject.changeVal = this.state.password;
                    if (JSON.stringify(checkPasswordValidity(this.state.password, this.state.confirmPassword)) == JSON.stringify({})) {
                        axios.axiosPUT('/editProfile', profileChangeObject).then((resolve) => {
                            if (resolve.status == "SUCCESS") {
                                //add the dispatchers
                                this.props.editUserDetails(resolve.payload, actionTypes.EDITPASSWORD);
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
                    break;
                }

        }
    }

    checkPasswordValidity(password, confirmPassword) {
        var errorMsgObject = {};
        //check password validity
        if (password.match(/[a-z]/g).length == 0) {
            errorMsgObject.invalidPassLower = "The password should contain a lowercase character";
        }
        if (password.match(/[A-Z]/g).length == 0) {
            errorMsgObject.invalidPassUpper = "The password should contain an uppercase character";
        }
        if (password.match(/[0-9]/g).length == 0) {
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

    onChangeHandler(event) {
        switch (event.target.id) {
            case "occupation":
                {
                    this.setState({ occupation: event.target.value });
                    break;
                }
            case "userName":
                {
                    this.setState({ userName: event.target.value });
                    break;
                }
            case "password":
                {
                    this.setState({ password: event.target.value });
                    break;
                }
            case "confirmPassword":
                {
                    this.setState({ confirmPassword: event.target.value });
                }
        }
    }

    render() {
        let occupationBtnBool = this.state.occupation != this.props.occupation && this.state.occupation != "" ? false : true;
        let userNameBtnBool = this.state.userName != this.props.userName && this.state.userName != "" ? false : true;
        let passwordBtnBool = (this.state.password != this.props.password || this.state.password != "") || this.state.confirmPassword != "" ? false : true;
        return ( < div >
                    <img src = { this.state.profilePhoto }/>  
                    <input type = "text"
                    name = "firstName"
                    placeholder = "FirstName"
                    id = "firstName"
                    value = { this.props.firstName }
                    disabled = { true }/>  
                    <input type = "text"
                    name = "lastName"
                    placeholder = "LastName"
                    id = "lastName"
                    value = { this.props.lastName }
                    disabled = { true }/>  
                    <form id = "occupationChange"
                    onSubmit = { this.onSubmitHandler }>
                        <input type = "text"
                        name = "occupation"
                        placeholder = "occupation"
                        id = "occupation"
                        value = { this.state.occupation }
                        onChange = { this.onChangeHandler }/> 
                        <button hidden = { occupationBtnBool }> Update </button> 
                    </form> 
                    <form id = "userNameChange"
                    onSubmit = { this.onSubmitHandler }>
                        <input type = "text"
                        name = "userName"
                        placeholder = "userName"
                        id = "userName"
                        value = { this.state.userName }
                        onChange = { this.onChangeHandler }/>  
                        <button hidden = { userNameBtnBool }> Update </button>  
                    </form> 
                    <form id = "passwordChange"
                    onSubmit = { this.onSubmitHandler }>
                        <input type = "password"
                        name = "password"
                        placeholder = "*********"
                        id = "password"
                        value = { this.state.password }
                        onChange = { this.onChangeHandler }/>  
                        <input type = "password"
                        name = "confirmPassword"
                        placeholder = "*********"
                        id = "confirmPassword"
                        value = { this.state.confirmPassword }
                        onChange = { this.onChangeHandler }/>  
                        <button disabled = { passwordBtnBool }> Update </button>  
                    </form> 
                </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        firstName: state.firstName,
        lastName: state.lastName,
        userName: state.userName,
        occupation: state.occupation,
        password: state.password
    }
};

const mapDispatchToProps = dispatch => {
    return {
        editOccupation: (userObject, userAction) => {
            dispatch(actions.editUserDetails(userObject, userAction));
        },
        editUserName: (userObject, userAction) => {
            dispatch(actions.editUserDetails(userObject, userAction));
        },
        editPassword: (userObject, userAction) => {
            dispatch(actions.editUserDetails(userObject, userAction));
        },
        setInitState: (userObject) => {
            dispatch(actions.editUserDetails(userObject, actionTypes.SETINIUSERDATA));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);