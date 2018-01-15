import React, { Component } from 'react';
import { Search, Image } from 'semantic-ui-react';

const url =  'https://api.teleport.org/api/';

export default class CityPickerNew extends Component {
    
    
    constructor(props) {
        super(props)
        this.state = {
            city: '',
            link: '',
            suggestions: [{title: '', link: '', key: 0}],
            userInput: '',
            urbanAreaLink: '',
            urbanAreaDetails: {categories: []},
            updated: false,
        }
    }



    //as the user enters their search, send a request for each letter and update
    //the suggestions in the state
    handleSearchInput = (event) => {
        this.setState({userInput: event.target.value});
        this.sendCitySearchApiRequest();
    }

    //check the state for user input, and set the suggestions in the state
    sendCitySearchApiRequest = () => {
        
        //if we only have 1 letter, we dont want any suggestions
        if(this.state.userInput.length < 2){
            this.setState({suggestions:[{title: '', link: '', key: 0}]})
        } else {
            
            fetch(url + 'cities/?search=' + this.state.userInput, {method: 'GET', mode: 'cors'})
                .then( (response) => {return response.json()})
                    .then((res) => {

                        let suggestionList= this.formatCitySearch(res);

                        if(suggestionList && suggestionList.length > 1){
                            if(suggestionList.length >= 8){
                              this.setState({suggestions: suggestionList.slice(0,7)});
                            } else {
                              this.setState({suggestions: suggestionList});
                            }
                        }
                    })
        }
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

    loadAllData = (event, data) => {

        this.setState({city: data.result.title, link: data.result.link});

        fetch(data.result.link, {method: 'GET', mode: 'cors'}).then((response)=>{return response.json()})
            .then((res) => {
                this.setState({urbanAreaLink: res._links['city:urban_area'].href});
            })
                .then(() => this.loadSalary())
                    .then(() => this.loadUrbanDetails())
                        .then(() => this.loadImage())
                            
        .catch((err) => {
            this.setState({userInput: ''})
            alert('No information on that city');
        })
    }

    //this is one of the events that could happen. 
    handleCityChoice = (event, data) => {

        let promise = new Promise( (resolve, reject) => {

            this.loadAllData(event, data);
            
            if(this.state.hasOwnProperty('city'))
                resolve('didnt work');
        })

        promise.then(state => console.log(this.state));
        
    }

    //here we want to search the urban area data which is what were
    //actually interested in. 
    loadUrbanData = (resource) => {

        fetch(this.state.urbanAreaLink, {method: 'GET', mode: 'cors'})
            .then((response) => {return response.json()})
                .then((res) => {

                    fetch(res._links['ua:' + resource].href, {method:'GET', mode: 'cors'})
                        .then((response) => response.json())
                            .then((res) => this.setState({[resource]: res}, () => {
                                if(this.state.hasOwnProperty('salaries') && this.state.hasOwnProperty('images') && this.state.hasOwnProperty('details'))
                                    this.props.setSelectedCities(this.state, this.props.id)
                            }))
                                
                            
                })
               
    }


    loadUrbanDetails = () => {
        this.loadUrbanData('details');
    }

    loadImage = () => {
        this.loadUrbanData('images');
    }

    loadSalary = () => {
        this.loadUrbanData('salaries');
    }
    
    setDataToState = () => {
        this.props.setSelectedCities(this.state, this.props.id)
    }


    render(){
        
        
        
              return(
        
                <div className = 'cityPicker'>
        
        
                <Search 
                
                onSearchChange = {this.handleSearchInput}
                results = {this.state.suggestions}
                size = 'large'
                showNoResults = {false}
                onResultSelect = {this.handleCityChoice}
                onFocus = {this.onfocus}
                />

                {this.state.images && <Image src = {this.state.images.photos[0].image.mobile} size='medium' rounded/>}
   
              </div>
        
        
              );
            }



}
