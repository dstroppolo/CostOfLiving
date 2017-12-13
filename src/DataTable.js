import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import CityData from './CityData';


export default class CityPicker extends Component {

    constructor(props){
        super(props);
        this.state = {



        }
    }

    renderBodyRows = () => {

     
        let rows = this.props.cityData.map((c, index) => {
            return(
                <Table.Row key = {index}>
                    ..
                </Table.Row>
            )
        })

        console.log(rows);

        return rows;
        

    }



    render(){

        return(

            <Table striped stackable celled definition basic='very' textAlign='center'>

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width = {1} />
                        <Table.HeaderCell width ={3}>Category</Table.HeaderCell>
                        <Table.HeaderCell width ={6}>{this.props.cityNames[0] || 'Select a City'}</Table.HeaderCell>
                        <Table.HeaderCell width ={6}>{this.props.cityNames[1] || 'Select a City'}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>

                    {this.renderBodyRows()}

                </Table.Body>

            </Table>
        )

    }

}