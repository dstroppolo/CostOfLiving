var categories= {food: [0,1,2,5,7], leisure: [3,9,4], transport: [8, 6], rent: [10,11,12]}; 
var ratios= {food: 0.25, leisure: 0.25, transport: 0.15, rent: 0.35}

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

    console.log(cityRatios);
    let tempRatio = cityRatios[0];
    cityMeans = [];

    return tempRatio;

}

function findMeansByCategory(city){

    console.log(city);

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


