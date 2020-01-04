//Dependencies
import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import { connect } from 'react-redux';


function ErrorDisplay(props) {

    return ( 
    <div className = "errorContainer"> 
        <p className = "errorMsg">{props.errorMsg}</p>
    </div>);
}

const mapStateToProps = (state) => {
    return {
        errorMsg: state.errorMsgReducer.errorMsg
    }
};
  
export default connect(mapStateToProps , null)(ErrorDisplay);