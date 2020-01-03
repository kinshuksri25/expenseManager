import React, { Component } from 'react';
import { hot } from "react-hot-loader";

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.buildTable = this.buildTable.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onAddHandler = this.onAddHandler.bind(this);
    }

    onDeleteHandler(event){
       this.props.changeExpenseState(event.target.id);
    }

    onAddHandler(event){
        this.props.changeExpenseState(event.target.id);
     }

    buildTable() {
            return ( <table>
                    <tr> {
                        this.props.tableConstants.map(constant => {
                                return ( <th id = { constant } > { constant.toUpperCase() } </th>)
                                })
                        } </tr>  {
                        this.props.tableValueArr.map(value => {
                                return ( <tr> {
                                        this.props.tableConstants.map(constant => {
                                                if (value.hasOwnProperty(constant)) {
                                                    return ( <td> { value[constant] } </td> )
                                                    }
                                                else if(constant == "" && this.props.deletebuttonDetails != undefined && this.props.addbuttonDetails != undefined){
                                                    if(value.state){
                                                        return ( <td> 
                                                            <button onClick = {this.onDeleteHandler} id = {value[this.props.deletebuttonDetails.id]} className = {this.props.deletebuttonDetails.className}>
                                                            {this.props.deletebuttonDetails.name}
                                                            </button> 
                                                        </td> )
                                                    }else{
                                                        return ( <td> 
                                                            <button onClick = {this.onAddHandler} id = {value[this.props.addbuttonDetails.id]} className = {this.props.addbuttonDetails.className}>
                                                            {this.props.addbuttonDetails.name}
                                                            </button> 
                                                        </td> )
                                                    }
                                                }    
                                                })
                                        } </tr>)
                                    })
                            } </table>)
                }

    render() {
               var table = this.buildTable();
                return ( <div> { table } </div>);
             }
}

export default Table;