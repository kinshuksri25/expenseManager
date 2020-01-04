//Dependencies
import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import { connect } from 'react-redux';

import {actionTypes} from "../store/user/types";
import {setErrorMsg} from "../store/user/actions";
import ErrorDisplay from "../Components/errordisplay";
import localSession from '../Components/sessionComponent';
import PostLoginRouter from '../Components/postlogin/postLoginRouter';
import PreLoginRouter from '../Components/prelogin/preLoginRouter';
import { preLogin, postLogin } from '../Components/Menu/buttonConstants';
import Menu from '../Components/Menu/Menu';
import '../public/css/menu.css';
import '../public/css/main.css';
import '../public/css/root.css';

class Router extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUrl: ""
        }
        this.checkSession = this.checkSession.bind(this);
        this.checkSessionTime = this.checkSessionTime.bind(this);
        this.rerenderComponent = this.rerenderComponent.bind(this);
        this.resetErrorState = this.resetErrorState.bind(this);
    }

    checkSession() {
        let session = localSession;
        let sessionObject = session.getSessionObject();

        let sessionExists = sessionObject != undefined && sessionObject.sessionID != undefined && sessionObject.creationTime != undefined ? true : false;
        if (sessionExists) {
            sessionExists = this.checkSessionTime(sessionObject);
        }
        return sessionExists;

    }

    checkSessionTime(sessionObject) {
        let sessionBool = false;
        sessionBool = Date.now() - sessionObject.creationTime < 1800000 ? true : false;
        if (!sessionBool)
            window.localStorage.clear();
        return sessionBool;
    }

    rerenderComponent() {
        this.setState({
            currentUrl: window.location.pathname
        });
    }

    resetErrorState(){
        setTimeout(function (){
            this.props.setErrorMsgState("");
        }.bind(this),4000);
    }

    render() {
        let errorContainer;
        if(this.props.errorMsg == ""){
            errorContainer = "";
        }else{
            errorContainer =  <ErrorDisplay />;
            this.resetErrorState();
        }
        let router = this.checkSession() ?
            <div className = "centralContainer row ">
                <div className = "menuContainer col-xs-12 col-sm-2 col-md-2 col-lg-2 ">
                    <Menu formAttributes = { postLogin } rerender = { this.rerenderComponent }/> 
                </div>
                <div className = "mainContainer col-xs-12 col-sm-10 col-md-10 col-lg-10 ">
                    <div className = "errorContainer">
                        {errorContainer}
                    </div>
                    <PostLoginRouter /> 
                </div>
            </div> : 
            <div className = "centralContainer row ">
                <div className = "menuContainer col-xs-12 col-sm-2 col-md-2 col-lg-2 ">
                    <Menu formAttributes = { preLogin } rerender = { this.rerenderComponent }/> 
                </div>
                <div className = "mainContainer col-xs-12 col-sm-10 col-md-10 col-lg-10 ">
                    <div className = "errorContainer">
                        {errorContainer}
                    </div>
                    <PreLoginRouter />
                </div>
            </div>;

        return ( <div className = "routerContainer"> { router } </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        errorMsg: state.errorMsgReducer.errorMsg
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setErrorMsgState: (errorPayload) => {
            dispatch(setErrorMsg(errorPayload, actionTypes.SETERRORMSG));
        }
    };
};
  
export default connect(mapStateToProps , mapDispatchToProps)(Router);