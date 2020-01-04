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
        this.initUserSetter = this.initUserSetter.bind(this);
        this.stateSetter = this.stateSetter.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.pictureSetter = this.pictureSetter.bind(this);
        this.checkPasswordValidity = this.checkPasswordValidity.bind(this);
    }

    stateSetter() {
        //set the local state 
        this.setState({
            userName: this.props.userObject.userName,
            occupation: this.props.userObject.occupation,
        });
    }

    componentDidMount() {
        if (this.props.userObject.userName == "") {
            this.initUserSetter();
        }
        this.pictureSetter();
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

    pictureSetter() {
        this.setState({
            isLoading: true
        });
        axios.axiosGET('/getPicture').then((resolve) => {
            if (resolve.status == "SUCCESS") {
                //add the dispatchers
                this.setState({ profilePhoto: resolve.payload });

            } else {
                this.props.setErrorMsgState(ERRORS.ERR_BCKERR_CLI);
            }
        }).catch(reject => {
            this.props.setErrorMsgState(ERRORS.ERR_NET_CLI);
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
                            this.props.setErrorMsgState(resolve.payload);
                        }
                    }).catch(reject => {
                        this.props.setErrorMsgState(ERRORS.ERR_NET_CLI);
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
                            this.props.editUserDetails(resolve.payload, actionTypes.EDITUSERNAME);
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
                    break;
                }
            case "passwordChange":
                {
                    profileChangeObject.changeVar = "password";
                    profileChangeObject.changeVal = this.state.password;
                    var errorMsg = this.checkPasswordValidity(formObject.password, formObject.confirmPassword);
                    if (errorMsg =="") {
                        axios.axiosPUT('/editProfile', profileChangeObject).then((resolve) => {
                            if (resolve.status == "SUCCESS") {
                                //add the dispatchers
                                this.props.editUserDetails(resolve.payload, actionTypes.EDITPASSWORD);
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
                    }else {
                        this.props.setErrorMsgState(errorMsg);
                    }
                    break;
                }

        }
    }

        //check password
        checkPasswordValidity(password, confirmPassword) {
            //check password validity
            if (password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S{8},}$/g) == null) {
                return ERRORS.ERR_INPASS_CLI;
            }
            if (password != confirmPassword) {
                return ERRORS.ERR_PASSMIS_CLI;
            }
            return "";
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
        let occupationBtnBool = this.state.occupation != this.props.userObject.occupation && this.state.occupation != "" ? false : true;
        let userNameBtnBool = this.state.userName != this.props.userObject.userName && this.state.userName != "" ? false : true;
        let passwordBtnBool = (this.state.password != this.props.userObject.password || this.state.password != "") || this.state.confirmPassword != "" ? false : true;
        return ( < div >
                    <img src = { this.state.profilePhoto }/>  
                    <input type = "text"
                    name = "firstName"
                    placeholder = "FirstName"
                    id = "firstName"
                    value = { this.props.userObject.firstName }
                    disabled = { true }/>  
                    <input type = "text"
                    name = "lastName"
                    placeholder = "LastName"
                    id = "lastName"
                    value = { this.props.userObject.lastName }
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
            userObject : {...state.userStateReducer}
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
        },
        setErrorMsgState: (errorPayload) => {
            dispatch(actions.setErrorMsg(errorPayload, actionTypes.SETERRORMSG));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);