import React, { Component } from 'react';


export default class CityPicker extends Component {

    constructor(props) {
        super(props)
        this.state = {
          city: '',
          geohash: '',
          suggestions: [],
          userInput: '',
      }
    }


    handleCitySubmit = () => {

      fetch('https://api.teleport.org/api/cities/?search=' + this.state.userInput,{method: 'GET', mode: 'cors'})
      .then((response)=>{return response.json()})
        .then((res)=>{ 
          
          let suggestions= this.formatCitySearch(res);
          
          if(suggestions && suggestions.length > 1){
            this.setState({suggestions: suggestions});
          }
        } 
      );
    }

    handleUserInput = (event) => {
      this.setState({userInput: event.target.value});
      this.handleCitySubmit();

    }

    formatCitySearch = (searchObject) => {

      let suggestionArray = [];

      let suggestions = searchObject._embedded['city:search-results'];
      
      suggestions.forEach( (item) => {
        suggestionArray.push( {name: item.matching_full_name, link: item._links['city:item'].href } );
      });

      return suggestionArray;

    }
    
    render(){

      return(

        <form>
        <label>
          Name:
          <input type="text" name="name" onChange={this.handleUserInput} />
          </label>
        <input type="submit" value="Submit" />

        <p>{this.state.suggestions.length}</p>
      </form>


      );
    }

}