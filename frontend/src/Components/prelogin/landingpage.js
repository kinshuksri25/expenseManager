//Dependencies
import React, { Component } from 'react';
import { hot } from "react-hot-loader";

import "../../public/css/landing.css";

function LandingPage () {

        return (
            <div className = "landingContainer"> 
                <h1 className = "landingTitle">Welcome to Expenseeve</h1>
                <h2 className = "landingSubheading">Easy to user expense manager</h2>
                <h3 className = "landingText">SignUp / Login to continue</h3>
            </div>
        );
}

export default LandingPage;