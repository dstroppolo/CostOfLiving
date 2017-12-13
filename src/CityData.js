import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'

export default class CityData extends Component {

    constructor(props){
        super(props)
        this.state = {
            label: '',
            data: []

        }
    }


    render(){

        return(

            

            <Table.Cell>{this.props.text}</Table.Cell>

            /*
                <strong>{this.props.label}</strong>
                {this.props.data[0].label}: 
                {this.props.data[0].int_value || 
                this.props.data[0].float_value || 
                this.props.data[0].string_value ||
                this.props.data[0].currency_dollar_value ||
                this.props.data[0].percent_value
                }
              */  
            

            


        )
    }
}