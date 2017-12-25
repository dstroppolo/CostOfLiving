import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CityPickerNew from './CityPickerNew';
import JobPicker from './JobPicker';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      cities: {},
      numberOfCities: [0,1],
      noMoreCities: false
    }
  }

  /** passed as a prop to add the link for the city */
  setSelectedCities = (city, cityNumber) =>{
    this.setState({cities: {...this.state.cities, [cityNumber]: city}});
  }

  /**adds more than the initial 2 city pickers */
  addCity = () => {
        this.setState({
            numberOfCities: [...this.state.numberOfCities, this.state.numberOfCities[this.state.numberOfCities.length-1]+1],
            noMoreCities: this.state.numberOfCities.length >= 3 ? true : false
        }
    )
  }

  /**adds the city picker components (map) */
  addCityPickers = (jobs) => {

    let numberOfCities = this.state.numberOfCities;
    let cityPickers = numberOfCities.map((key) => {
        if(jobs){
          return <JobPicker info = {this.state.cities[key]} key = {key} id = {key} />
        } else {
          return <CityPickerNew setSelectedCities = {this.setSelectedCities} key = {key} id={key}/>
        }
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


          <div className = 'addCityButtonWrap'>
          <Button 
            icon = 'add circle' 
            label = {this.state.noMoreCities ? 'Cannot add more' : 'Add another city'} 
            onClick = {this.addCity}
            disabled = {this.state.noMoreCities}
          />
          </div>

          <div className = 'salaryInfoWrap'>
            {this.addCityPickers(true)}

          </div>

        </div>

      </div>
    );
  }
}

export default App;
