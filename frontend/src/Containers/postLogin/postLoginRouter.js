//Dependencies
import React, { Component } from 'react';
import { hot } from "react-hot-loader";

import localSession from '../../Components/sessionComponent';
import Home from './home';
import Settings from './settings';
import Profile from './profile';
import * as axios from '../axios/axios';
import { actionTypes } from '../../store/user/types';
import { setinitState } from '../../store/user/actions';


export default function PostLoginRouter() {

    //Router
    function containerSelector() {
        var path = window.location.pathname.substring(1).toLowerCase();
        console.log("called with " + path);
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