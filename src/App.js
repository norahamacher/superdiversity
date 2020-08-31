
import React, { Component } from 'react';
import './App.css';
import MapFunctions from './MapFunctions';


//data
import centerData96Auckland from './data/Auckland/Auck1996___min.json'
import centerData13Auckland from './data/Auckland/Auck2013___min.json'

import centerData06Melb from './data/Melbourne/Melb06_____min.json'
import centerData11Melb from './data/Melbourne/Melb11_____min.json'
import centerData16Melb from './data/Melbourne/Melb16_____min.json'


import centerData2001Syd from './data/Sydney/Syd01___m__min.json'
import centerData2006Syd from './data/Sydney/Syd06___m__min.json'
import centerData2011Syd from './data/Sydney/Syd11___m__min.json'
import centerData2016Syd from './data/Sydney/Syd16___m__min.json'

import centerData96Vanc from './data/Vancouver/Vanc96_____min.json'
import centerData06Vanc from './data/Vancouver/Vanc06_____min.json'
import centerData16Vanc from './data/Vancouver/Vanc16_____min.json'

import bivariateImage from './images/bivariate_scheme1.png'
import Menu  from './Menu';
import * as turf from '@turf/turf'

import getHighestValue from './Helpers.js'
export default class App extends Component { 
  



  m_datasets = [ 
    centerData96Auckland,
    centerData13Auckland,
    centerData06Melb,
    centerData11Melb,
    centerData16Melb,
    centerData2001Syd,
    centerData2006Syd,
    centerData2011Syd,
    centerData2016Syd,
    centerData96Vanc,
    centerData06Vanc,
    centerData16Vanc
  ]
  m_biVariateColors = {
      "00": "#e8e8e8",
      "01": "#b0d5df",
      "02": "#64acbe",
      "10": "#e4acac",
      "11": "#ad9ea5",
      "12": "#627f8c",
      "20": "#c85a5a",
      "21": "#985356",
      "22": "#574249"
  }
  m_selectorStructure = {
    "Melbourne":{
      "2006": centerData06Melb,
      "2011":centerData11Melb,
      "2016":centerData16Melb
    },
    "Vancouver":{
      "1996": centerData96Vanc,
      "2006":centerData06Vanc,
      "2016":centerData16Vanc
    },
    "Auckland":{
      "1996": centerData96Auckland,
      "2013":centerData13Auckland,

    },
    "Sydney":{
      "2001":centerData2001Syd,
      "2006": centerData2006Syd,
      "2011":centerData2011Syd,
      "2016":centerData2016Syd
    }
  }

  m_long_indices = ["Population",
  "Ethnicity-raw-count",
  "Ethnicity-count",
  "Ethnicity-index",
  "Ethnicity-raw-normalized",
  "Ethnicity-raw-norm",
  "Ethnicity-norm",
  "Ethnicity-norm-index",
  "Mobility-raw-pct",
  "Mobility-pct",
  "Mobility-index",
  "Generation-raw-SI",
  "Generation-SI",
  "Generation-index",
  "Income-raw-SI",
  "Income-SI",
  "Education-raw-SI",
  "Education-SI",
  "Income-index",
  "Education-index",
  "Income-SE",
  "Immig-category-index",
  "Immig-category-raw-SI",
  "Total-pop"]
m_short_indices = ["a", "b","ba","c","d","da","db","e","f","fa","g","h","ha","i","j","ja","k","ka","l","m","n","o","p","q"]
  m_menu_structure =  [ 
      {"name":"Melbourne",
      "years": [2006,2011,2016],
      "indices": ["Population", "Ethnicity-raw-count",	"Ethnicity-index",	"Ethnicity-raw-normalized",	"Ethnicity-norm-index",	"Mobility-raw-pct",	"Mobility-index",	"Generation-raw-SI",
    	  "Generation-index",	"Income-raw-SI",	"Income-index",	"Education-raw-SI",	"Education-index"],
      },
     { 
      "name":"Sydney",
      "years": [ 2001,2006,2011,2016],
      "indices":  ["Population", "Ethnicity-raw-count",	"Ethnicity-index",	"Ethnicity-raw-normalized",	"Ethnicity-norm-index",	"Mobility-raw-pct",	"Mobility-index",	"Generation-raw-SI",
      "Generation-index",	"Income-raw-SI",	"Income-index",	"Education-raw-SI",	"Education-index"],
    },
     { 
      "name": "Vancouver",
      "years": [1996,2006,2016],
      "indices" : ["Population", "Ethnicity-raw-count",	"Ethnicity-index",	"Ethnicity-norm-index",	"Mobility-raw-pct",	"Mobility-index",	"Generation-raw-SI",
      "Generation-index",	"Income-raw-SI",	"Income-index",	"Education-raw-SI",	"Education-index","Income-SE","Ethnicity-raw-norm","Immig-category-raw-SI",	"Immig-category-index"	],
    },
    { 
      "name": "Auckland",
      "years":[1996,2013],
      "indices" : ["Population","Ethnicity-count",	"Ethnicity-index",	"Ethnicity-norm",	"Ethnicity-norm-index",	"Mobility-pct",	"Mobility-index",	"Generation-SI",	"Generation-index",	"Income-SI",	"Income-index",
    	"Education-SI",	"Education-index"]
    }]
  

  componentDidMount(){
   // d3.csv(vancData).then(this.updateStateData);
 
    
  
    //convert points in the datasets to polygons
    for(var i = 0; i < this.m_datasets.length; i++){
      this.m_datasets[i] = this.prepDatasets(this.m_datasets[i], 0.3)
    }
    
    console.log(centerData06Vanc)
    //initial dataset 
    this.setState({
      data:centerData06Vanc
     })
  }

  // preps the datasets for usage. Creates circle polygons to extrude as columns, initially all with the same width, and replaces the shortened indices with their proper ones for labelling etc.
  prepDatasets = (dataset, width) => {
    var features = dataset.features
    var circlepoly, newGeometry, i, j
    for( i = 0; i < features.length; i ++){
  
      circlepoly = turf.circle([features[i].geometry.coordinates[0],features[i].geometry.coordinates[1]], width, { steps: 12 })
      newGeometry = circlepoly.geometry
      features[i].geometry = newGeometry
      var propertyKeys = Object.keys(features[i].properties)

      for(j = 0; j < propertyKeys.length; j++){
        if(this.m_short_indices.indexOf(propertyKeys[j]) >= 0) {
          //console.log(propertyKeys[j])
          features[i].properties[this.m_long_indices[this.m_short_indices.indexOf(propertyKeys[j])]] = features[i].properties[propertyKeys[j]]
          delete features[i].properties[propertyKeys[j]]
        }
      }
    }
    return dataset
  }

  renameKey = (object,key,newKey) => {
   //console.log(key + " -- " + newKey)
    if(newKey!== undefined){
      var clonedObj = clone(object);
      var targetKey = clonedObj[key];
      delete clonedObj[key];
      clonedObj[newKey] = targetKey;
    return clonedObj;
    } else {
      return object
    }
  }
   state = {
    data: [],
    city: "Vancouver",
    year: "2006",
    heightParameter: "Population",
    showBivariate: false,
    showColor: true
  }
  menuCallback= (label, content) => {
    //console.log(label)
    //console.log(content)
    if(label==="city"){
      console.log(this.m_selectorStructure[content][Object.keys(this.m_selectorStructure[content])[0]])
      this.setState({
        city:content,
        year: Object.keys(this.m_selectorStructure[content])[0], //take the first available year of the new city
        data: this.m_selectorStructure[content][Object.keys(this.m_selectorStructure[content])[0]]
      })
    } else if(label==="year"){
      this.setState({
        year: content,
        data: this.m_selectorStructure[this.state.city][content]
      })
    } else if(label==="bivToggle"){
      this.setState(prevState => ({
        showBivariate: !prevState.showBivariate
      }))
    } 
    else if(label==="colorToggle"){
      this.setState(prevState => ({
        showColor: !prevState.showColor
      }))
    } 
    else if (label=="height"){
      this.calculateHeights(content)
    }
  }

  calculateHeights(parameter){
    console.log(parameter)
    this.setState({
      heightParameter: parameter
    })
  }
 

  // determines which map will be loaded.
  


  render() {
    
    return( 

    <div className="App">
      <div className="Container">
      {this.state.showBivariate ? <div id="bivariateImage"><img id="bivImg" src={bivariateImage} alt="bivariateScheme" /></div> : ""}
      <Menu callbackF={this.menuCallback} cities={this.m_menu_structure} currentCity={this.state.city} currentYear={this.state.year}/>
      {/*<MapFunctions height={800} data={this.state.data} year={this.state.year} city={this.state.city} heightParam={this.state.heightParameter}/>*/}
     
      
      </div>
   
    </div>
    )
  }
}

const clone = (obj) => Object.assign({}, obj);
