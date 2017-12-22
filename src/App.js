import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CityPicker from './CityPicker';
import CityPickerNew from './CityPickerNew';
import InfoGetter from './InfoGetter';
import { Button } from 'semantic-ui-react';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      links: [],
      numberOfCities: [0,1],
      noMoreCities: false,
      salaryInfoLinks: []
    }
  }

  setSelectedCities = (link, cityNumber) =>{
    this.setState({
        links: [...this.state.links, link]
      }
    )
  }

  addCityPickers = () => {

    let numberOfCities = this.state.numberOfCities;

    let cityPickers = numberOfCities.map((key) => {
        return <CityPickerNew setSelectedCities = {this.setSelectedCities} key = {key} id={key}/>
      }
   )
   return cityPickers;

  }

  addCity = () => {


    this.setState({
        numberOfCities: [...this.state.numberOfCities, this.state.numberOfCities[this.state.numberOfCities.length-1]+1],
        noMoreCities: this.state.numberOfCities.length >= 3 ? true : false
    }
    )
  }

  addSalaryInformation = (salaryInfoLinks) => {

    this.setState({
      salaryInfoLinks: [...this.state.salaryInfoLinks, salaryInfoLinks]
    })


  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className = 'mainBody'>

          <div className = "cityPickers">

            {this.addCityPickers()}
          </div>
          <div className = 'addCityButtonWrap'>
          <Button 
            icon = 'add circle' 
            label = {this.state.noMoreCities ? 'Cannot add more' : 'Add another city'} 
            onClick = {this.addCity}
            disabled = {this.state.noMoreCities}
          />
          </div>

          <div className = 'dataTable'>
            {Object.keys(this.state.links).length == 0 ? "Please select some cities." : <InfoGetter links = {this.state.links} addSalaryInformation = {this.addSalaryInformation} />}
            {this.state.salaryInfoLinks}
          </div>

        </div>

      </div>
    );
  }
}

export default App;
