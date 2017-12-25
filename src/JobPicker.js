import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class JobPicker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            jobList: [],
            salary: '',
        }
    }

    //for this to work we need the data in the following format: 
    // jobList = [
    //   {
    //     text:  "Account Manager",
    //     value: "44255.868737"
    //   },
    //  ...
    // ]
    componentDidUpdate = () => {


        if(this.props.info && this.state.jobList.length == 0){
            this.formatSalaryInfo();
        }
    }

    formatSalaryInfo = () => {

        let salaries = this.props.info.salaries.salaries;
        let salaryList = [];
        console.log(salaries)

        salaries.forEach((salary) => {
            salaryList.push({text: salary.job.title, value: salary.salary_percentiles.percentile_50})

        });

        this.setState({jobList: salaryList});

    }

    handleSelection = (event, data) => {
        this.setState({salary: data.value});
    }

    formatCurrency = (amt) => {
        return amt.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }

    render(){

        return(
            <div className = 'jobPicker'>
              <Dropdown upward onChange = {this.handleSelection} selection placeholder = 'Jobs...' options = {this.state.jobList} />
              <h1>{this.state.salary ? this.formatCurrency(this.state.salary) : 'Select a career'}</h1>
            
            </div>
        )

    }

}

