import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CityPicker from './CityPicker';
import CityPickerNew from './CityPickerNew';
import DataTable from './DataTable';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      links: {},

    }
  }

  setSelectedCities = (link, cityNumber) =>{
    this.setState({
      
        links: {...this.state.links, [cityNumber]: link}
      }
    )
  }

  addCityPickers = () => {

    let numberOfCities = [0,1,2];

    let cityPickers = numberOfCities.map((key) => {
        return <CityPickerNew setSelectedCities = {this.setSelectedCities} key = {key} id={key}/>
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
            {Object.keys(this.state.links).length == 0 ? "hello" : <DataTable links = {this.state.links} />}
          </div>

        </div>

      </div>
    );
  }
}

export default App;
