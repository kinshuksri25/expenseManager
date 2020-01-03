import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import localSession from '../../Components/sessionComponent';
import {ERRORS} from '../../../../config/dataConstants'

export default function Menu(props) {

function createButton() {
    let formAttributes = props.formAttributes;
    return (formAttributes.map(attribute => {
        if (attribute.hasOwnProperty("link") && attribute.hasOwnProperty("name") && attribute.hasOwnProperty("id") && attribute.hasOwnProperty("className")) {
            return ( 
                <div className="col-xs-12 col-md-12 col-lg-12 buttonContainer">
                     <button key={attribute.id} id = { attribute.id } className = { attribute.className } onClick = { loadPage } > 
                    { attribute.name } 
                    </button>
                </div>
               ); 
        }else { 
                console.log(ERRORS.ERR_MNOJ_CLI); 
              }
        }));

}

function loadPage(event) {
    let formAttributes = props.formAttributes;
    formAttributes.map(attribute => {
        if (attribute.id == event.target.id) {
            //change the url
            history.pushState(null, '', attribute.link);
            props.rerender();
        }
    });
}
    return ( <div className="combinedContainer"> { createButton() } </div>);
};


