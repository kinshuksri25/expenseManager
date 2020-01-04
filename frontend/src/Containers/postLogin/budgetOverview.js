//Dependencies
import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import { connect } from 'react-redux';

import CanvasJSReact from '../canvas/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class BudgetOverview extends Component {

    constructor(props){
        super(props);
        this.buildBudgetChart = this.buildBudgetChart.bind(this);
        this.calcTotalExpense = this.calcTotalExpense.bind(this);
    }

    calcTotalExpense(){
        let totalExp =0;
        this.props.user.expenses.map(expense=>{
            if(expense.state == true)
            totalExp += parseInt(expense.amount, 10);
        });
        return totalExp;
    }

    buildBudgetChart(totalExpense){
        let budget = this.props.user.budget;
        let percentSpent = Math.floor((totalExpense/budget)*100);
        let options = {			
            animationEnabled: true,
			subtitles: [{
				text: percentSpent+"% spent",
                verticalAlign: "center",
                startAngle: 270,
				fontSize: 15,
				dockInsidePlotArea: true
            }],
            width:250,
            height:250,
			data: [{
                type: "doughnut",
                radius: "100px",
				dataPoints: [
					{ name: "TotalExpense", y: totalExpense },
					{ name: "Remaining", y: (budget - totalExpense)}
				]
			}]};
        return options;
    }

    render (){
        let totalExpense = this.calcTotalExpense();
        let chartOptions = this.buildBudgetChart(totalExpense);
        return(
            <div className = "budgetOverviewContainer">
                <h4 className = "title">Budget Overview</h4>
                <div className="row">
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <CanvasJSChart options = {chartOptions}/>
                    </div>
                    <div className = "col-xs-4 col-sm-4 col-md-4 col-lg-4 doughnutBody">
                        <h5>Total Budget:</h5>
                        <span><p>{this.props.user.budget}</p></span>
                        <h5>Total Expense:</h5>
                        <span><p>{totalExpense}</p></span>    
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user:  {...state.userStateReducer}
    }
};

export default connect(mapStateToProps, null)(BudgetOverview);