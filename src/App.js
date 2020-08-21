
import React, { Component } from 'react';
import './App.css';
import MapFunctions_Vancouver from './MapFunctions_Vancouver';
import MapFunctions_Melbourne from './MapFunctions_Melbourne';
import MapFunctions_Auckland from './MapFunctions_Auckland';
import MapFunctions_Sydney from './MapFunctions_Sydney'
import Menu  from './Menu';

export default class App extends Component { 
  


  m_cities = ["Melbourne","Sydney","Vancouver","Auckland"]
  componentDidMount(){
   // d3.csv(vancData).then(this.updateStateData);
   console.log(vancData)
    this.setState({
     data:vancData
    })
  }
  state = {
    data: [],
    city: "Vancouver"
  }
  

  menuCallback= (label, content) => {
    console.log(label)
    console.log(content)
    if(label==="city"){
      this.setState({
        city:content
      })
    }
  }
 randomData(){
   console.log.clickedButton()
 }
  updateStateData=(inputdata)=>{
    var found = false;

  }
  renderSwitch(param) {
    switch(param) {
      case 'Vancouver':
        return <MapFunctions_Vancouver height={800} data={this.state.data}/>
      case 'Melbourne':
        return <MapFunctions_Melbourne height={800} data={this.state.data}/>
      case 'Auckland':
        return <MapFunctions_Auckland height={800} data={this.state.data}/>
      case 'Sydney':
        return <MapFunctions_Sydney height={800} data={this.state.data}/>
      default:
        return 'foo';
    }
  }
  


  render() {
    
    return( 

    <div className="App">
      <div className="Container">

      <Menu callbackF={this.menuCallback} cities={this.m_cities}/>
      {this.renderSwitch(this.state.city)}
      
      </div>
   
    </div>
    )
  }
}
