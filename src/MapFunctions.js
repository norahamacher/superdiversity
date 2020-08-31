import mapboxgl from 'mapbox-gl'
import React, { Component } from 'react';

import {getHighestValue} from './Helpers.js'
//import geojson from 'geojson'
export default class MapFunctionsVancouver extends Component {

    // set to 2017 initially despite play preview or you get a bug when using the type dropdown
    m_initiated = false
    map = null


    tooltipContainer
    popup

    m_tilesets
     init() {
        if (!this.m_initiated) {

            var center = []
            switch(this.props.city){
                case "Vancouver":
                    this.m_tilesets = [
                        {"year":1996, "id": "mapbox://norahama.1jokwrkx", "sourcelayer" : "Vancouver2006-2eyjv2", "sourceName":"source1996"},
                        {"year":2006, "id":"mapbox://norahama.1jokwrkx", "sourcelayer" : "Vancouver2006-2eyjv2", "sourceName":"source2006"},
                        {"year":2016, "id": "mapbox://norahama.2pk73wv6", "sourcelayer" : "Vancouver2016-1nzu7l", "sourceName":"source2016"}
                    ]
                    
                    center = [-122.576, 49.028]
                    break;
                case "Melbourne":
                    this.m_tilesets = [
                        // "2001":{"id": "mapbox:/norahama.anl71j5p", "sourcelayer" : "Melbourne2001-23s20v"},
                         {"year":2006,"id": "mapbox://norahama.bm41q2of", "sourcelayer" : "Melbourne2006-6b3o6h", "sourceName" : "source2006"},
                         {"year":2011,"id": "mapbox://norahama.dzjhyft8", "sourcelayer" : "Melbourne2011-csnnwo", "sourceName" : "source2011"},
                         {"year":2016,"id":  "mapbox://norahama.cc4vdfad", "sourcelayer" : "Melbourne2016-47i90b", "sourceName" :"source2016"}
                ]
                     center =  [144.96,-37.84]
                    break;
                case "Auckland":
                   this.m_tilesets = [
                        {"year":1996,"id": "mapbox://norahama.deq4a9rw", "sourcelayer" : "AucklandShape-19n187", "sourceName" : "source1996"},
                        {"year":2013,"id": "mapbox://norahama.deq4a9rw", "sourcelayer" : "AucklandShape-19n187", "sourceName" : "source2013"}
                
                   ]
                    center =  [174.76,-36.84]
                    break;
                case "Sydney":
                    this.m_tilesets = [
                        {"year":2001,"id": "mapbox://norahama.8m5ctm9s", "sourcelayer" : "Sydney2001-2hwwxg", "sourceName" : "source2001"},
                        {"year":2006,"id":  "mapbox://norahama.6tv4znv6", "sourcelayer" : "Sydney2006-6nogcm", "sourceName" : "source2006"},
                        {"year":2011,"id":  "mapbox://norahama.dmybv4hi", "sourcelayer" : "Sydney2011-6m951w", "sourceName" : "source2011"},
                        {"year":2016,"id":  "mapbox://norahama.darbn0un", "sourcelayer" : "Sydney2016-71t1cr", "sourceName" : "source2016"}
                    ]
                    center =  [151.21, -33.87]
                    break;
            }
          //  console.log(centerData)
            mapboxgl.accessToken = "pk.eyJ1Ijoibm9yYWhhbWEiLCJhIjoiY2ptaGFsZDR5MThrczN1dDhtajc1cTFmMSJ9.VEUImGmfsM77LfjErYxDdQ"
            this.map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/norahama/ckcoa4nbq00zr1imv7shjhzo1",
                zoom: [10],
                center: center
            })

          
            this.map.on('load', () => {
                // add source and layer for museums

                this.map.addSource('centerData', {
                    type: 'geojson',
                    data: this.props.data,
                    cluster: false
                })
                
                for(var i = 0; i < this.m_tilesets.length; i++){
                    this.map.addSource(this.m_tilesets[i].sourceName, {
                        type:'vector',
                        url: this.m_tilesets[i].id
                    })

                }
             
     /*           this.map.addLayer({
                    id: 'vanc3d',
                    type: 'fill-extrusion',
                    source: 'vancouver2016',
                    layout: {
                        visibility: 'none'
                    },
                    'source-layer': this.m_tilesets["2016"].sourcelayer,
                    paint: {
                        'fill-extrusion-height':
                            [
                                'match',
                                ['get', 'CSDUID'],
                                "5915840", 500,
                                "5915830", 500,
                                "5915825", 1800,
                                "5915816", 200,
                                "5915813", 4000,
                                0
                            ],
                        'fill-extrusion-color': [
                            'match',
                            ['get', 'CSDUID'],
                            "5915840", "#d41111",
                            "5915830", "#d41111",
                            "5915825", "#d41111",
                            "5915816", "#d41111",
                            "5915813", "#d41111",
                            "#888281"
                        ]
                        ,
                        "fill-extrusion-opacity": 0.7
                    }
                })*/
                var index = -1
                for(i = 0; i<this.m_tilesets.length; i++){
                    if(this.m_tilesets[i].year==this.props.year){
                        index=i;
                        break;
                    }
                }
                this.map.addLayer({
                    id: 'fill'+this.props.year,
                    type: 'fill',
                    source: this.m_tilesets[index].sourceName,   
                    layout: {
                        // make layer visible by default
                        visibility: 'visible',
                    },
                    'source-layer': this.m_tilesets[index].sourcelayer,                    
                    paint: {
                        'fill-color': 
                            "#888281"
                        ,
                        'fill-outline-color': "black",
                        "fill-opacity": 0.4
                    }

                });
            
                this.map.addLayer({
                    id: 'bars' + this.props.year,
                    type: 'fill-extrusion',
                    source: "centerData",
                    layout: {
                        // make layer visible by default
                        visibility: 'visible',
                    },
                   // 'source-layer': this.m_tilesets[ this.props.year].sourcelayer,
                    paint: {
                        'fill-extrusion-color': ['get','color'],
                        'fill-extrusion-height': ["to-number", ['get',this.props.heightParam]] ,
                        'fill-extrusion-opacity': 0.7
                    }

                })
    

         /*       this.map.on('mouseenter', 'layer2016', function (e) {
                    // Change the cursor style as a UI indicator.
                    //    console.log("enter: " + e.features[0].properties.site)
                    if (message !== e.features[0].properties) {
                        message = e.features[0].properties
                 //           console.log(e.features[0])
                        //  console.log(e.lngLat.wrap())
                    }
                    //      console.log(e)
                    if (!onlyOnce) {



                  //      self.randomiseData();
                        var newgeoJson = []
                        //get centers

                     
               
               
                        //create Polygon JSON from available data
                       var newgeoJson = []
                        var features = self.map.queryRenderedFeatures({ layers: ['layer2016'] })

                  //      console.log(features)
                        for (var i = 0; i < features.length; i++) {
                            var poly = features[i].geometry.coordinates[0]
                            var input = []
                         //   console.log(poly)
                            for (var j = 0; j < poly.length; j++) {
                                
                                input.push({ "latitude": poly[j][1], "longitude": poly[j][0] })
                            } 
                          //  console.log(input)
                      
                            if(input.length > 1) {
                             var center = geolib.getCenter(input)
                          //   console.log(center)
                             if(!isNaN(center.longitude) && !isNaN(center.latitude)){
                           //  newgeoJson.push({ 'type': 'Feature', 'geometry': { "type":"Point","coordinates":[center.longitude,center.latitude] }})
                                var circlepoly = turf.circle([center.longitude,center.latitude], 0.3, { steps: 20 })
                                newgeoJson.push({ 'type': 'Feature', 'geometry': circlepoly.geometry,'properties': { 'id':features[i].id, 'properties':features[i].properties, 'color':self.m_colors[Math.floor(Math.random() * Math.floor(7))],'height':  Math.floor(Math.random() * (20000 - 5000)) + 5000}})
                             }
                            }
                
                        }
      
                        var FinalJson = { "type": "FeatureCollection", "features": newgeoJson }
                        console.log(JSON.stringify(FinalJson))  
                        onlyOnce = true
                    }
                })
                this.map.on('mousemove', 'vancCirc', function (e) {
                    // Change the cursor style as a UI indicator.
                    //    console.log("enter: " + e.features[0].properties.site)
                    if (message !== e.features[0].properties) {
                        message = e.features[0].properties
                        //       console.log(e.features[0].properties)
                    }

                })

                this.map.on('mouseleave', 'vanc', function (e) {
                    // Change the cursor style as a UI indicator.
                    //    console.log("enter: " + e.features[0].properties.site)
                    console.log("out")
                    message = ""

                })*/



            })
            // Change the cursor style as a UI indicator.
            this.map.getCanvas().style.cursor = 'pointer';
            this.m_initiated = true;



        }

    }

    //data wrangling
   
    updateDataset() {

    }


    componentDidMount() {
        this.tooltipContainer = document.createElement('div');
        if(this.props.data!==[]) {
            console.log("MapComponent Got Data")
            this.init()
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.data!==[]){
            //console.log(this.props.data)
            this.init()
        }
        //city changed, load the correct sources and layers for the new city.
        if(this.props.city!==prevProps.city){
            this.m_initiated =false;
            this.init()
        }
        //console.log(this.props.data)
        if(this.props.heightParam !== prevProps.heightParam) {
            // 'fill-extrusion-height': ["to-number", ['get',this.props.heightParam]] ,
            //console.log(this.props.heightParam)
            console.log(this.props.data)
            /*  m_long_indices = ["Population",
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
  "Total-pop"]*/
         
            var val = getHighestValue(this.props.data,this.props.heightParam)
            this.map.setPaintProperty('bars' + this.props.year,'fill-extrusion-height', ["*",["/",["to-number", ['get',this.props.heightParam]],val],5000])
            
          
        }
        if(this.map.getSource("centerData"))
            this.map.getSource("centerData").setData(this.props.data)
    }
    render() {
        return (

            <div style={{ height: this.props.height }} className="mapContainer" id="map" />

        )
    }

    

}


/*
The data stays the same except for the radius of the polygon.

The thing that changes is the paint.

Height, colour, possibly opacity, and radius can change based on different attributes.

As attributes change based on the input:
a) Normalise the data field
b) map the data field to the chosesn attribute 


*/