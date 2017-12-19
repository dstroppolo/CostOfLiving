import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import CityData from './CityData';

const costOfLiving = 3;



export default class DataTable extends Component {

    constructor(props){
        super(props);
        this.state = {
            cityNames: [],
            citySalariesLinks: []

        }
    }

    componentDidMount = () => { 
        fetch(this.props.links[0])
            .then(res => {return res.json()})
                .then(res => {this.setState({cityNames: [...this.state.cityNames, res.name], citySalariesLinks: [...this.state.citySalariesLinks, res._links['ua:salaries'].href]})}
        )
    }


    componentWillReceiveProps = (p,n) =>{
        console.log(p);
        if(p.links.length > 1){
            fetch(p.links[p.links.length-1])
            .then(res => {return res.json()})
                .then(res => {this.setState({cityNames: [...this.state.cityNames, res.name], citySalariesLinks: [...this.state.citySalariesLinks, res._links['ua:salaries'].href]})}
            )
        }
    }


    render(){

        if(!this.state.citySalariesLinks) 
            return <p>Loading...</p>
        else {

        
        return(

            <p>{JSON.stringify(this.state)}</p>
          
        )
    }

    }

}