import React, { Component } from 'react';
import { hot } from "react-hot-loader";

class SimpleForm extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.buildForm = this.buildForm.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.arrayRemove = this.arrayRemove.bind(this);
        this.stateBuilder = this.stateBuilder.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    }

    componentDidMount() {
        this.stateBuilder();
    }

    onKeyDownHandler(event) {
        if (event.key == "Tab" || event.key == "Enter") {
            var newState = this.state;
            this.props.changeHandler(newState);
        }
    }

    stateBuilder() {
        var stateParams = this.props.formAttributes;
        var formParam;
        stateParams.map(param => {
            if (param.type == "form") {
                formParam = param;
            }
        });
        stateParams = this.arrayRemove(stateParams, formParam);
        stateParams.map(stateParam => {
            this.setState({
                [stateParam.name]: ""
            })
        })
    }

    onSubmitHandler(event) {
        event.preventDefault();
        var returnObject = this.state;
        this.props.submitHandler(returnObject);

    }
    onChangeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    buildForm() {
        var params = this.props.formAttributes;
        var formParam;
        params.map(param => {
            if (param.type == "form") {
                formParam = param;
            }
        });
        params = this.arrayRemove(params, formParam);
        return ( <form method = { formParam.method }
                 encType = { formParam.enctype }
                 id = { formParam.id }
                 onSubmit = { this.onSubmitHandler }> 
                 {
                    params.map(param => 
                        {
                            if (param.type == "button") {
                                return <button id = { param.id } 
                                className = { param.className } 
                                key = { param.id } > { param.name } </button>	
                            } else {
                                    if (this.props.changeFieldNames.length != 0 && this.props.changeFieldNames.includes(param.name)) {
                                    return <input type = { param.type } 
                                    name = { param.name } 
                                    placeholder = { param.placeholder }
                                    value = { this.state[param.name] }
                                    id = { param.id }
                                    key = { param.id }
                                    className = { param.className }
                                    onChange = { this.onChangeHandler }
                                    hidden = { param.isHidden }
                                    required = { param.isRequired }
                                    onKeyDown = { this.onKeyDownHandler }
                                    tabIndex = "0" />

                            } else {
                                switch (param.type) {
                                case "DropDown":{ 
                                                return ( <select id = { param.name }
                                                          name = { param.name } key = { param.id }
                                                          onChange = { this.onChangeHandler } required = { param.isRequired }> 
                                                          {
                                                            this.props.options.map(option => {
                                                            return ( <option value = { option } > { option } </option>)
                                                            })
                                                          } 
                                                          </select>);
                                                  break;
                                                }

                                default:{ return <input type = { param.type }
                                        name = { param.name }
                                        placeholder = { param.placeholder }
                                        value = { this.state[param.name] }
                                        id = { param.id }
                                        key = { param.id }
                                        className = { param.className }
                                        onChange = { this.onChangeHandler }
                                        hidden = { param.isHidden }
                                        required = { param.isRequired }/>           
                                        break;
                                        }
                                }

                            }

                        }
                    }
                )
            } 
        </form>)
    }

    arrayRemove(arr, value) {
        return arr.filter(function(element) {
            return element != value;
        });
    }

    render() {
        let form = this.buildForm();
        return ( <div> { form } </div>);
    }
}
export default SimpleForm;