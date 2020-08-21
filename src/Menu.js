import React, { Component } from 'react';

export default class MapFunctions extends Component {
  render() {
    return (
        <div className="menu">
            <div className="cityRow">
            {this.props.cities.map(
                        (city, i) =>
                        <div key={"city"+i} className="city_selector" onClick={() => this.props.callbackF("city",city)}> {city}</div>
                           
                    )}
           
            </div>

        </div>
       
      

    )
}

}

const SubMenuItem = ({ label,callbackF }) => (
    <div className = "submenu">
    <span className="label">  {label} </span>
    <ul>
        <li onClick={() => callbackF(label, "Temp1")}>
            Temp1
        </li>
        <li onClick={() => callbackF(label, "Temp2")}>
            Temp2
        </li>
        <li onClick={() => callbackF(label, "Temp3")}>
            Temp3
        </li>
    </ul>

</div>
)
