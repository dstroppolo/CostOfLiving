import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CityPicker from './CityPicker';
import DataTable from './DataTable';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      cities: {}

    }
  }

  setSelectedCities = (cityData, cityNumber) =>{
    this.setState(
      {
        cities: {...this.state.cities, [cityNumber]: cityData}
      }
    );
  }

  addCityPickers = () => {

    let numberOfCities = [0,1,2];

    let cityPickers = numberOfCities.map((key) => {
        return <CityPicker setSelectedCities = {this.setSelectedCities} key = {key} id={key}/>
      }
   )
   return cityPickers;

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

          <div className = 'dataTable'>
            {this.state.cities.hasOwnProperty('0') && <DataTable cities = {this.state.cities} /> }

          </div>

        </div>

      </div>
    );
  }
}

export default App;
