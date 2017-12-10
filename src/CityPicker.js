import React, { Component } from 'react';
import { Search, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';



export default class CityPicker extends Component {

    constructor(props) {
        super(props)
        this.state = {
          city: '',
          geohash: '',
          suggestions: [{title: '', link: '', key: 0}],
          userInput: ''
      }
    }


    handleCitySubmit = () => {


      if(this.state.userInput.length < 2){
        this.setState({suggestions:[]})
        console.log(this.state.suggestions);
      } else {

      fetch('https://api.teleport.org/api/cities/?search=' + this.state.userInput,{method: 'GET', mode: 'cors'})
      .then((response)=>{return response.json()})
        .then((res)=>{ 
          
          let suggestionList= this.formatCitySearch(res);
          
          if(suggestionList && suggestionList.length > 1){
            if(suggestionList.length >= 8){
              this.setState({suggestions: suggestionList.slice(0,7)});
            } else {
              this.setState({suggestions: suggestionList});
            }
          }
        } 
      );
    }
    }

    handleUserInput = (event) => {


      this.setState({userInput: event.target.value});

      this.handleCitySubmit();

    }

    formatCitySearch = (searchObject) => {

      let suggestionArray = [];
      let key = 0;

      let suggestions = searchObject._embedded['city:search-results'];
      
      suggestions.forEach( (item) => {
        suggestionArray.push( {title: item.matching_full_name, link: item._links['city:item'].href, key: ++key } );
      });

      return suggestionArray;

    }


    
    render(){

      return(

        <div className = 'cityPicker'>


        <Search 
        
        onSearchChange = {this.handleUserInput}
        results = {this.state.suggestions}
        size = 'large'
        
          />
      </div>


      );
    }

}