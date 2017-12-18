import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import CityData from './CityData';

const costOfLiving = 3;



export default class CityPicker extends Component {

    constructor(props){
        super(props);
        this.state = {
            cityCount: 0,
            cityNames: [],
            cityData: []


        }
    }

    renderHeaderRows = () => {
        let rows = Object.keys(this.props.cities).map((c) => {

            return (
                <Table.HeaderCell width ={3} key = {c}>{this.props.cities[c].title}</Table.HeaderCell>
            )
        })
        return rows
    }

    renderBodyRows = () => {
        
        let data = this.props.cities[0].categories[costOfLiving].data;
        console.log(this.props.cities);
        
        let rows = data.map((c, index) => {


            return(

                <Table.Row key = {index}>
                
                    <Table.Cell>
                        ...
                    </Table.Cell>

                    <Table.Cell>
                        {c.label}
                    </Table.Cell>

                        {
                            Object.keys(this.props.cities).map(cityKey =>{

                                let curType = this.props.cities[cityKey].categories[costOfLiving].data[index].type;
                                let curValue = this.props.cities[cityKey].categories[costOfLiving].data[index][curType+'_value'];

                                return(

                                    <CityData text = {curValue} key = {cityKey+'_'+index} />
                            
                                )
    
                            })
                        }
                </ Table.Row>
            )
        })

        return rows;


}

    render(){

        return(

            <Table striped stackable celled definition basic='very' textAlign='center'>

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width = {1} />
                        <Table.HeaderCell width ={3}>Category</Table.HeaderCell>
                    {this.renderHeaderRows()}
      </Table.Row>
                </Table.Header>

                <Table.Body>

                {this.renderBodyRows()}


                </Table.Body>

            </Table>
        )

    }

}