import React from "react";
import ReactDOM from "react-dom";
import Router from "./Containers/router.js";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import { userStateReducer,errorMsgReducer } from './store/user/reducers';
import { initUserObject } from './store/user/types';

const combinedReducer = combineReducers({userStateReducer,errorMsgReducer});

const store = createStore(combinedReducer);

ReactDOM.render( <Provider store = { store } > 
                        < Router/> 
                </Provider>, document.getElementById("root"));