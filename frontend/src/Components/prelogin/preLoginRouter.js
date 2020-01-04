//Dependencies
import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import localSession from '../sessionComponent';
import Login from '../../Containers/preLogin/login';
import LandingPage from './landingpage';
import SignUp from '../../Containers/preLogin/signup';

function PreLoginRouter () {

    function containerSelector() {
        var path = window.location.pathname.substring(1).toLowerCase();
        if (/[a-z]+\//g.test(path) && !/[a-z]+\/[a-z]+/g.test(path)) {
            window.location.pathname = "/" + path.substring(0, path.length - 1);
        } else {
            switch (path) {
                case "login":
                    return <Login/> ;
                    break;
                case "signup":
                    return <SignUp/> ;
                    break;
                case "landing":
                    return <LandingPage/> ;
                    break;
                default:
                    window.location.pathname = "/landing";
                    break;
            }
        }

    }
        var container = containerSelector();
        return ( <div> { container } </div>);
}

export default PreLoginRouter;