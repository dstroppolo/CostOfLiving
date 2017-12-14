import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const url =  'https://api.teleport.org/api/';

export default class CityPicker extends Component {


    constructor(props) {
        super(props)
        this.state = {
          city: '',
          link: '',
          suggestions: [{title: '', link: '', key: 0}],
          userInput: '',
          urbanAreaLink: '',
          urbanAreaDetails: {categories: []},
      }



    }

    

    /* As the user is entering their search, this function will get called.
       This is where we use the API query ?search to get suggestions
       and the geohash for the location */
    handleCitySearch = () => {

      if(this.state.userInput.length < 2){
        this.setState({suggestions:[{title: '', link: '', key: 0}]})
      } else {

      fetch(url + 'cities/?search=' + this.state.userInput,{method: 'GET', mode: 'cors'})
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

      this.handleCitySearch();

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

    handleCityChoice = (event, data) => {
      this.setState({city: data.result.title, link: data.result.link});

      fetch(data.result.link, {method: 'GET', mode: 'cors'}).then((response)=>{return response.json()})
            .then((res) => {
              this.setState({urbanAreaLink: res._links['city:urban_area'].href});
            })
            .then(this.loadUrbanData);

    }

    loadUrbanData = () => {

      fetch(this.state.urbanAreaLink,{method: 'GET', mode: 'cors'}).then((response)=>{return response.json()})
        .then((res)=>{
            fetch(res._links['ua:details'].href,{method:'GET', mode:'cors'})
            .then((response)=>{return response.json()})
            .then((res)=>{this.setState({urbanAreaDetails: res})})
            .then(()=>{this.props.setSelectedCities({
              categories: this.state.urbanAreaDetails.categories,
              title: this.state.city,
            }, this.props.id)
          });
        }
      );
    }


    check=()=>{console.log(this.state.urbanAreaDetails)}

    
    render(){



      return(

        <div className = 'cityPicker'>


        <Search 
        
        onSearchChange = {this.handleUserInput}
        results = {this.state.suggestions}
        size = 'large'
        showNoResults = {false}
        onResultSelect = {this.handleCityChoice}
        
        />

        {this.props.id}

      </div>


      );
    }

}