import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CityPickerNew from './CityPickerNew';
import JobPicker from './JobPicker';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import  calculateCityRatios  from './calculations';
import Explainer from './Explainer';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      cities: {},
      numberOfCities: [0,1],
      noMoreCities: false,
      COLDataWithIndex: {},
      COLRatios: {},
      mainCitySalary: null,
    }
  }

  /** passed as a prop to add the link for the city */
  setSelectedCities = (city, cityNumber) =>{
    this.setState({cities: {...this.state.cities, [cityNumber]: city}});
  }

  /*receives objects id: data and sets the COL ratios*/
  handleCOLData = (COL, id) => {


    if(Object.keys(COL).length > 0){
      this.setState({
        COLDataWithIndex: {...this.state.COLDataWithIndex, ...COL}
      }, () => {
          if(this.state.COLDataWithIndex.hasOwnProperty(0) && Object.keys(this.state.COLDataWithIndex).length > 1){

            Object.keys(this.state.COLDataWithIndex).forEach((data, id) => {
              var x = calculateCityRatios([this.state.COLDataWithIndex[0], this.state.COLDataWithIndex[id]]);
              this.setState({COLRatios: {...this.state.COLRatios, [id]: x}});
            })




          }
      })
    }
  }

  /**adds more than the initial 2 city pickers */
  addCity = () => {
        this.setState({
            numberOfCities: [...this.state.numberOfCities, this.state.numberOfCities[this.state.numberOfCities.length-1]+1],
            noMoreCities: this.state.numberOfCities.length >= 3 ? true : false
        }
    )
  }

  setMainCitySalary = (salary, id) => {
    if(id === 0)
      this.setState({mainCitySalary: salary});
  }

  /**adds the city picker components (map) */
  addCityPickers = (jobs) => {

    let numberOfCities = this.state.numberOfCities;
    let cityPickers = numberOfCities.map((key) => {
        if(jobs){
          return <JobPicker mainCitySalary = {this.state.mainCitySalary} setMainCitySalary = {this.setMainCitySalary} ratio = {this.state.COLRatios[key]} handleCOLData = {this.handleCOLData} active={key===0} info = {this.state.cities[key]} key = {key} id = {key} />
        } else {
          return <CityPickerNew userInput = {this.state.cities[key] ? this.state.cities[key].userInput : ''} setSelectedCities = {this.setSelectedCities} key = {key} id={key}/>
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
          <h1 className="App-title">Cost of Living and Salary Calculator</h1>
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
            {Object.keys(this.state.cities).length > 0 && this.addCityPickers(true)}
          </div>

        </div>
        <div className = 'explainer'>
          <Explainer />
          </div>
      </div>
    );
  }
}

export default App;
