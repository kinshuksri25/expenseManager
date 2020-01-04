//Dependencies
import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import { connect } from 'react-redux';

import CanvasJSReact from '../canvas/canvasjs.react';
import Table from '../tables/tables';
import tableConstants from '../tables/tableConstants';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class ExpenseBreakDown extends Component {

    constructor(props){
        super(props);
        this.buildBudgetChart = this.buildBudgetChart.bind(this);
        this.calcTotalExpense = this.calcTotalExpense.bind(this);
        this.generateDataPoints = this.generateDataPoints.bind(this);
        this.generateTableData = this.generateTableData.bind(this);
        this.generateData = this.generateData.bind(this);
    }

    calcTotalExpense(){
        let totalExp =0;
        this.props.user.expenses.map(expense=>{
            if(expense.state == true)
            totalExp += parseInt(expense.amount, 10);
        });
        return totalExp;
    }

    generateDataPoints(){
        let dataObject = this.generateData();
        let dataPoints =[];
        for (let property in dataObject) {
            dataPoints.push({ name: property.toUpperCase(), y: dataObject[property]});
        }
        return dataPoints;
    }
    
    generateData(){
        let dataObject= {};
        this.props.user.expenseCatagories.map(expenseCat =>{
            this.props.user.expenses.map(expense =>{
                if(expense.category == expenseCat && expense.state == true){
                    dataObject[expenseCat] = isNaN(dataObject[expenseCat]) ? 0+parseInt(expense.amount, 10) : dataObject[expenseCat]+parseInt(expense.amount, 10);
                }
            });
        });
        return dataObject;
    }

    generateTableData(){
        var tableData = [];
        let dataObject = this.generateData();
        for (let property in dataObject)
            tableData.push({category:[property],amount:dataObject[property]});

        return tableData;
    }   

    buildBudgetChart(totalExpense){
        let dataPoints = this.generateDataPoints();
        let options = {			
            animationEnabled: true,
			subtitles: [{
				text: "Rs "+totalExpense,
                verticalAlign: "center",
                startAngle: 270,
				fontSize: 20,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				dataPoints: [...dataPoints]
			}]};
        return options;
    }

    render (){
        let totalExpense = this.calcTotalExpense();
        let chartOptions = this.buildBudgetChart(totalExpense);
        let renderedChart = this.props.user.expenseCatagories.length<=5 ? 
        <CanvasJSChart options = {chartOptions}/>
        :
        <Table tableConstants = {tableConstants.expenseBreakDownCat} tableValueArr ={this.generateTableData()}/ >;
        return(
            <div>
                <div>
                    <h2 className = "title">Expense Breakdown</h2>
                    {renderedChart}
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

export default connect(mapStateToProps, null)(ExpenseBreakDown);