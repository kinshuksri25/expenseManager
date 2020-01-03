//Dependencies
import React, { Component } from 'react';
import { hot } from "react-hot-loader";

import '../public/css/menu.css';
import '../public/css/main.css';
import '../public/css/root.css';
import localSession from '../Components/sessionComponent';
import PostLoginRouter from './postLogin/postLoginRouter';
import PreLoginRouter from './preLogin/preLoginRouter';
import { preLogin, postLogin } from './Menu/buttonConstants';
import Menu from './Menu/Menu';

class Router extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUrl: ""
        }
        this.checkSession = this.checkSession.bind(this);
        this.rerenderComponent = this.rerenderComponent.bind(this);

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

    render() {
        let router = this.checkSession() ?
            <div className = "centralContainer row ">
                <div className = "menuContainer col-xs-12 col-sm-2 col-md-2 col-lg-2 ">
                    <Menu formAttributes = { postLogin }rerender = { this.rerenderComponent }/ > 
                </div>
                <div className = "mainContainer col-xs-12 col-sm-10 col-md-10 col-lg-10 ">
                    <PostLoginRouter / > 
                </div>
            </div> : 
            <div className = "centralContainer row ">
                <div className = "menuContainer col-xs-12 col-sm-2 col-md-2 col-lg-2 ">
                    <Menu formAttributes = { preLogin }rerender = { this.rerenderComponent }/> 
                </div>
                <div className = "mainContainer col-xs-12 col-sm-10 col-md-10 col-lg-10 ">
                    <PreLoginRouter / >
                </div>
            </div>;

        return ( <div className = "routerContainer"> { router } </div>);
    }
}
               
export default Router;