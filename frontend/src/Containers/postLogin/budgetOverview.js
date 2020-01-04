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
				fontSize: 20,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
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
            <div>
                <div>
                    <h2 className = "title">Budget Overview</h2>
                </div>
                <CanvasJSChart options = {chartOptions}/>
                <div>
                    <h3>Total Budget:</h3>
                    <span><p>{this.props.user.budget}</p></span>
                    <h3>Total Expense:</h3>
                    <span><p>{totalExpense}</p></span>    
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