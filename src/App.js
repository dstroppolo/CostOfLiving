import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import googlePlacesKey from './API_Keys';
import CityPicker from './CityPicker';
import DataTable from './DataTable';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className = "cityPickers">
          <CityPicker />
          <CityPicker />
        </div>
        <DataTable />
      </div>
    );
  }
}

export default App;
