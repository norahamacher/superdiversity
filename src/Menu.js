import React, { Component } from 'react';

export default class MapFunctions extends Component {


 

    state = {
        subItem: {},
        city: "",
        year: 2006,
        width: "Ethnicity-index",
        height: "Population",
        color: "Income-index",
        bivariate: ["Ethnicity-index","Income-index"],
        activeWidth: false,
        activeHeight:true,
        activeColor:false,
        activeBivariate: false
    }
  render() {
    return (
        <div className="menu">
            <div className="citySection">
            <span>City: </span>
                <select className="cityDropdown" value={this.state.city} onChange={this.handleChange}>
                    {this.props.cities.map(
                        (city, i) =>
                         <option key={"city"+i} value={city.name}>{city.name}</option>
                    )}
                </select>
            </div>

            <div className="yearSection">
                <span>Year: </span>
                <div className="yearbuttons">
                    {   this.state.subItem.years ? 
                            this.state.subItem.years.map(
                                (item,i) =>
                                    <div onClick={() => this.toggleActive(item)} className={`yearButton ${this.state.year==item? "yearButton_active": ""}`} key={"yearButton"+i}>{item} </div>
                            
                            )
                        : "Loading..."
                    }
                </div>
            </div>
            
            <div className="attributeSection">
                <span>Bar Attributes: </span>
                {this.state.subItem.indices ? 
                    <div className="attributeGroup">
                    <AttributeSection children = {this.state.subItem.indices} title="Width" app={this} def={this.state.width} callback={this.changeWidth} active={this.state.activeWidth}/>
                    <AttributeSection children = {this.state.subItem.indices} title="Height" app={this} def={this.state.height} callback={this.changeHeight}active={this.state.activeHeight}/>
                    <AttributeSection children = {this.state.subItem.indices} title="Color" app={this} def={this.state.color} callback={this.changeColor}active={this.state.activeColor}/>
                    <AttributeSection children = {this.state.subItem.indices} title="Bivariate" app={this} def={this.state.bivariate} callback1={this.changeBivariate1} active={this.state.activeBivariate}callback2={this.changeBivariate1}/>
                    </div>
                    : 
                    "Loading..."
                }
            </div>
        </div>

    )
}

changeWidth = (event) => {
    console.log(event.target.value + " width")
    this.setState({
        width: event.target.value
    })
    this.props.callbackF("width",event.target.value)
}

changeHeight = (event) => {
    this.setState({
        height: event.target.value
    })
    this.props.callbackF("height",event.target.value)
}

changeColor = (event) => {
    this.setState({
        color: event.target.value
    })
    this.props.callbackF("color",event.target.value)
}

changeBivariate1 = (event) => {
    var arr = this.state.bivariate
    arr[0]=event.target.value
    this.setState({
        bivariate: arr
    })
    this.props.callbackF("bivariate1",event.target.value)
}

changeBivariate2 = (event) => {
    var arr = this.state.bivariate
    arr[1]=event.target.value
    this.setState({
        bivariate: arr
    })
    this.props.callbackF("bivariate2",event.target.value)
}

componentDidUpdate(){
   // console.log(this.props.cities)
    //console.log(this.state)
}
componentDidMount(){
    console.log(this.props.cities)
    console.log(this.props.currentCity)
    console.log(this.props.currentYear)
    for(var i = 0; i < this.props.cities.length; i++){
        if(this.props.cities[i].name===this.props.currentCity){
           
            this.setState({
                subItem: this.props.cities[i],
                city: this.props.currentCity,
                year: this.props.currentYear
            })
            break;
        }
    }
}

toggleActive = (y) => {
    this.setState({
        year: y
    })
    console.log(y)
    this.props.callbackF("year",y)
}

toggleAttribute = (attr) => {
    switch(attr){
        case"Width":
        this.setState(prevState => ({
            activeWidth: !prevState.activeWidth
        }));
        break;
        case"Height":
        this.setState(prevState => ({
            activeHeight: !prevState.activeHeight
        }));
        break;
        case"Color":
        this.setState(prevState => ({
            activeColor: !prevState.activeColor
        }));
        break;
        case"Bivariate":
        
        this.setState(prevState => ({
            activeBivariate: !prevState.activeBivariate
        }));
        this.props.callbackF("bivToggle",true)
        break;
    }
}
handleChange =(event)=>{
    this.props.callbackF("city",event.target.value)
    for(var i = 0; i < this.props.cities.length; i++){
        if(this.props.cities[i].name===event.target.value){
            this.setState({
                subItem: this.props.cities[i],
                city: event.target.value,
                year: this.props.cities[i].years[0]
            })
        }
    }
   
}



}
const AttributeSection = ({title, children, def, app, callback, callback1, callback2, active}) => (


        <div onClick={() => app.toggleAttribute(title)} className = {`attributePanel ${active ? "attributePanel_active": ""}`}>
            <div  className="attributeLabel"> {title}</div>    
            {title!=="Bivariate" ? 
                <select className="attributeDropdown" value={def} onChange={callback}>
                    {children.map(
                        (child, i) =>
                         <option key={"child"+i} value={child}>{child}</option>
                    )}
                </select>
             
            :   
            <div className="bivariateGroup">
                <select className="attributeDropdown" value={def[0]} onChange={callback1}>
                    {children.map(
                    (child, i) =>
                     <option key={"child"+i} value={child}>{child}</option>
                    )}
                </select>
                <select className="attributeDropdown" value={def[1]} onChange={callback2}>
                {children.map(
                    (child, i) =>
                    <option key={"child"+i} value={child}>{child}</option>
                 )}
                </select>
            </div>

            }
             
        </div>
    
)
      