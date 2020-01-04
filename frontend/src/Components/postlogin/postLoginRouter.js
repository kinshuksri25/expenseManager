//Dependencies
import React, { Component } from 'react';
import { hot } from "react-hot-loader";

import Home from '../../Containers/postLogin/home';
import Settings from '../../Containers/postLogin/settings';
import Profile from '../../Containers/postLogin/profile';
import "../../public/css/postloginContainer.css";


export default function PostLoginRouter () {
    //Router
     function containerSelector() {
        var path = window.location.pathname.substring(1).toLowerCase();
        if (/[a-z]+\//g.test(path) && !/[a-z]+\/[a-z]+/g.test(path)) {
            window.location.pathname = "/" + path.substring(0, path.length - 1);
        } else {
            switch (path) {
                case "dashboard/home":
                    return <Home / > ;
                    break;
                case "dashboard/settings":
                    return <Settings / > ;
                    break;
                case "dashboard/profile":
                    return <Profile / > ;
                    break;
                default:
                    window.location.pathname = "/dashboard/home";
                    break;
            }
        }
    }
        let container = containerSelector();
        return ( <div className = "postLoginContainer" > { container } </div> );
}
