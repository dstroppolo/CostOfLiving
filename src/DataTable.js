import React, { Component } from 'react';
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react';
import CityData from './CityData';


export default class CityPicker extends Component {

    constructor(props){
        super(props);
        this.state = {



        }
    }



    render(){

        return(

            <Table celled definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell width ={3}>Category</Table.HeaderCell>
                        <Table.HeaderCell width ={6}>City 1</Table.HeaderCell>
                        <Table.HeaderCell width ={6}>City 2</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
      <Table.Row>
            <CityData text = '..' />
            <CityData text = '..' />
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jill</Table.Cell>
        <Table.Cell>Denied</Table.Cell>
      </Table.Row>
    </Table.Body>


            </Table>
        )

    }

}