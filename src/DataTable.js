import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import CityData from './CityData';


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
        let rows = Object.keys(this.props.cities).map((c, index) => {

            return (
                <Table.HeaderCell width ={3} key = {index}>{this.props.cities[c].title}</Table.HeaderCell>
            )
        })
        return rows
    }

    renderBodyRows = () => {


        let rows = Object.keys(this.props.cities).map((c, index) => {

            return(
                <Table.Row>
                    <Table.Cell>
                        ...
                    </Table.Cell>

                </Table.Row>
            )
        })

        return rows;


}


formatIncomingProps = (nextProps) =>{
    //when the props come in, its as a big ol object. here we want to seperate it into the state to make it easier to use
    let data = nextProps.cities;

    this.setState({cityCount: 0, cityNames: [], cityData: []});

    for(let city in data){

        console.log([...this.state.cityNames, data[city].title]);
        this.setState(
            {
                cityCount: ++this.state.cityCount,
                cityNames: [...this.state.cityNames, data[city].title],
                cityData: [...this.state.cityData, data[city].categories]

            }
        )
    }

    console.log(this.state)

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