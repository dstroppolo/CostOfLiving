import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CityPicker from './CityPicker';
import DataTable from './DataTable';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      cities: [],
      data: []

    }
  }

  setSelectedCities = (cityData) =>{
    this.setState(
      {
        cities: this.state.cities.concat(cityData.title), 
        data: this.state.data.concat(cityData.categories)
      });
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
            <CityPicker setSelectedCities = {this.setSelectedCities} />
            <CityPicker setSelectedCities = {this.setSelectedCities}/>
          </div>

          <div className = 'dataTable'>
            {this.state.cities.length > 0 && <DataTable cityNames = {this.state.cities} cityData = {this.state.data} />}
          </div>

        </div>

      </div>
    );
  }
}

export default App;
