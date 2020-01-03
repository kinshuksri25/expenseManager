import React from "react";
import ReactDOM from "react-dom";
import Router from "./Containers/router.js";
import { createStore } from "redux";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import { userStateReducer } from './store/user/reducers';
import { initUserObject } from './store/user/types';

const store = createStore(userStateReducer, initUserObject);

ReactDOM.render( <Provider store = { store } > 
                        < Router/> 
                </Provider>, document.getElementById("root"));