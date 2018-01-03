var city1 = [2.4, 0.93, 3.8, 11, 40, 2.1, 75, 15, 9.6, 75.07, 730, 980, 1200];
var city2 = [1.8, 0.39, 2.1, 3.2, 28, 2.6, 14, 3.5, 5.5, 18.75, 210, 240, 260]; 
var city3 = [2.5, 1.39, 8.1, 2.2, 66, 1.6, 88, 4.5, 12.15, 98.75, 810, 1040, 1260]; 
var categories= {food: [0,1,2,5,7], leisure: [3,9,4], transport: [8, 6], rent: [10,11,12]}; 
var ratios= {food: 0.25, leisure: 0.25, transport: 0.15, rent: 0.35}
var cities = [city1, city2];

var cityMeans = [];
var cityRatios = [];

var newArr = [];
var newCityMeans = [];


export default function calculateCityRatios(cities){

    var newCityRatios = [];
    var cityRatios = [];
    
    cities.forEach((c) => findMeansByCategory(c) );
        
    for(var i = 1; i < cityMeans.length; i++){
        cityMeans[i].forEach((m, index) => {
            newCityRatios.push( (m/cityMeans[0][index]) * ratios[Object.keys(categories)[i]]);
        })
        cityRatios.push(sum(newCityRatios));
    }

    return cityRatios;

}

function findMeansByCategory(city){

    for(var k in categories){
        categories[k].forEach((v) => {
            newArr.push(city[v]);//this is an array of all the values in the current category
        })
        newCityMeans.push(mean(newArr));
        newArr = [];
    };
    cityMeans.push(newCityMeans);
    newCityMeans = [];
}




function sum(values){

    let totalSum = 0;

    values.forEach(v => {
        if(v != 'NaN')
            totalSum += v;
    })

    return totalSum;

}

function mean(values, precision=3){

    let total = sum(values);
    let n = values.length;

    return Number((total / n).toFixed(precision));

}

function compareC2toC1(v1, v2, precision = 3){
    return Number(((v2)/v1).toFixed(precision));
}


