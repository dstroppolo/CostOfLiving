import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class JobPicker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            jobList: [],
            salary: '',
            cityCOLInfo: {}, //{0: [1.2, 4.2, 36, ..., 1600]}
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

        if(this.props.info && this.state.jobList.length === 0){
            this.formatSalaryInfo();
            this.getCostOfLiving(this.props.info);
        }

    }

    formatSalaryInfo = () => {

        let salaries = this.props.info.salaries.salaries;
        let salaryList = [];

        salaries.forEach((salary) => {
            salaryList.push({text: salary.job.title, value: salary.salary_percentiles.percentile_50})

        });

        this.setState({jobList: salaryList});

    }

    handleSelection = (event, data) => {
        this.setState({salary: data.value}, () => {this.props.setMainCitySalary(data.value, this.props.id)});
    }

    formatCurrency = (amt) => {
        return amt.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }

    handleCOLData = (COL, id) => {
        if(COL && COL.length > 1){
            this.setState({cityCOLInfo: {[id]: COL}}, () => this.props.handleCOLData(this.state.cityCOLInfo, this.props.id));
        } 
    }

    getCostOfLiving = (city) => {
        

        let COL = city.details.categories.find(c => {
            return c.id === 'COST-OF-LIVING';
        })

        let rents = city.details.categories.find(c => {
            return c.id === 'HOUSING';
        })

        
        //now we have an array but we just want the values... fu
        //were gonna work with indexes because ive been working on this project too long and want to get it done
        //we want know food is index 0,1,2,5,7. Leisure 3,9,4. Transport 8,6.

        let data = [];
        
        COL.data.forEach((d, i) => {
            if(i !== 0)
                data.push(d.currency_dollar_value);
        })

        rents.data.forEach((d, i) => {
            if(i !== rents.data.length - 1){
                data.push(d.currency_dollar_value);
            }
        })

        if(data && data.length === 13){
            this.handleCOLData(data, this.props.id);
        }

    }

    render(){

        let equivAmount = this.props.mainCitySalary * this.props.ratio;
        let compareAmount = this.state.salary;
        let numberColor = 'black';

        if(this.props.id != 0 && this.props.mainCitySalary && this.state.salary){
            console.log(equivAmount);
            console.log(compareAmount);
            numberColor = compareAmount >= equivAmount ? 'green' : 'red';
        }

        return(
            <div className = {this.props.active? 'jobPicker activeCity': 'jobPicker'}>
              <Dropdown upward onChange = {this.handleSelection} selection placeholder = 'Jobs...' options = {this.state.jobList} />
              <h1 style = { {color: numberColor} }>{this.state.salary ? '$' + this.formatCurrency(this.state.salary) : 'Select a career'}</h1>
              <p>{this.props.id === 0 ? 
                'This city is the baseline.' : 
                this.props.mainCitySalary ? 
                'You would need to make at least $' + this.formatCurrency(equivAmount) + ' in this city.' :
                'To maintain the same lifestyle...'
              }
                </p>
            </div>
        )

    }

}

