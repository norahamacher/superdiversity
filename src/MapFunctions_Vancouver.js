import mapboxgl from 'mapbox-gl'
import React, { Component } from 'react';
import * as geolib from 'geolib'
import centerData96 from './data/Vancouver/Vanc96_merged_min.json'
import centerData06 from './data/Vancouver/Vanc06_merged_min.json'
import centerData16 from './data/Vancouver/Vanc16_merged_min.json'
import * as turf from '@turf/turf'
//import geojson from 'geojson'
export default class MapFunctions_Vancouver extends Component {

    // set to 2017 initially despite play preview or you get a bug when using the type dropdown
    m_initiated = false
    map = null


    tooltipContainer
    popup
    self = null

    m_colors = ["blue","red","purple","green","yellow","black","white"]

    m_tilesets = {
        "1996":{"id": "mapbox://norahama.1jokwrkx", "sourcelayer" : "Vancouver2006-2eyjv2"},
        "2006":{"id": "mapbox://norahama.1jokwrkx", "sourcelayer" : "Vancouver2006-2eyjv2"},
        "2016":{"id":  "mapbox://norahama.2pk73wv6", "sourcelayer" : "Vancouver2016-1nzu7l"},
    }
    init() {
        if (!this.m_initiated) {
          //  console.log(centerData)
            mapboxgl.accessToken = "pk.eyJ1Ijoibm9yYWhhbWEiLCJhIjoiY2ptaGFsZDR5MThrczN1dDhtajc1cTFmMSJ9.VEUImGmfsM77LfjErYxDdQ"
            this.map = new mapboxgl.Map({
                container: "map",
                //   style:"mapbox://styles/mapbox/dark-v10",
                // style: 'mapbox://styles/mapbox/satellite-v9',
                style: "mapbox://styles/norahama/ckcoa4nbq00zr1imv7shjhzo1",
                zoom: [10],
                center: [-122.576, 49.028]
            })

            var self = this;
            this.map.on('load', () => {
                // add source and layer for museums

                this.map.addSource('centerData96', {
                    type: 'geojson',
                    data: centerData96,
                    cluster: false
                })
                this.map.addSource('centerData06', {
                    type: 'geojson',
                    data: centerData06,
                    cluster: false
                })
                this.map.addSource('centerData16', {
                    type: 'geojson',
                    data: centerData16,
                    cluster: false
                })
                this.map.addSource('source2016', {
                    type: 'vector',
                    url: this.m_tilesets["2016"].id
                    // url: 'https://api.mapbox.com/v4/norahama.2cmdpwa5/8/0/1.mvt?access_token=pk.eyJ1Ijoibm9yYWhhbWEiLCJhIjoiY2ptaGFsZDR5MThrczN1dDhtajc1cTFmMSJ9.VEUImGmfsM77LfjErYxDdQ'
                });

                this.map.addSource('source2006', {
                    type: 'vector',
                    url: this.m_tilesets["2006"].id
                    // url: 'https://api.mapbox.com/v4/norahama.2cmdpwa5/8/0/1.mvt?access_token=pk.eyJ1Ijoibm9yYWhhbWEiLCJhIjoiY2ptaGFsZDR5MThrczN1dDhtajc1cTFmMSJ9.VEUImGmfsM77LfjErYxDdQ'
                });
                this.map.addSource('source1996', {
                    type: 'vector',
                    url: this.m_tilesets["1996"].id
                    // url: 'https://api.mapbox.com/v4/norahama.2cmdpwa5/8/0/1.mvt?access_token=pk.eyJ1Ijoibm9yYWhhbWEiLCJhIjoiY2ptaGFsZDR5MThrczN1dDhtajc1cTFmMSJ9.VEUImGmfsM77LfjErYxDdQ'
                });
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
                })
                this.map.addLayer({
                    id: 'vanc',
                    type: 'fill',
                    source: 'vancouver2016',
                    layout: {
                        // make layer visible by default
                        visibility: 'visible',
                    },
                    'source-layer': this.m_tilesets["2016"].sourcelayer,                    
                    paint: {
                        'fill-color': 
                            "#888281"
                        ,
                        'fill-outline-color': "black",
                        "fill-opacity": 0.4
                    }

                });*/

     /*           this.map.addLayer({
                    id: 'layer2016',
                    type: 'circle',
                    source: 'source2016',
                    layout: {
                        // make layer visible by default
                        visibility: 'visible',
                    },
                    'source-layer': this.m_tilesets["2016"].sourcelayer,
                    paint: {
                        'circle-radius': 2,
                        'circle-color': 'red'
                    }

                });
                this.map.addLayer({
                    id: 'layer2006',
                    type: 'circle',
                    source: 'source2006',
                    layout: {
                        // make layer visible by default
                        visibility: 'none',
                    },
                    'source-layer': this.m_tilesets["2006"].sourcelayer,
                    paint: {
                        'circle-radius': 2,
                        'circle-color': 'red'
                    }

                });*/
            
                this.map.addLayer({
                    id: 'bars2006',
                    type: 'fill-extrusion',
                    source: 'centerData06',
                    layout: {
                        // make layer visible by default
                        visibility: 'none',
                    },
                    paint: {
                        'fill-extrusion-color': ['get','color'],
                        'fill-extrusion-height': ["to-number", ['get','Total-pop']] ,
                        'fill-extrusion-opacity': 0.7
                    }

                })
                this.map.addLayer({
                    id: 'bars1996',
                    type: 'fill-extrusion',
                    source: 'centerData96',
                    layout: {
                        // make layer visible by default
                        visibility: 'none',
                    },
                    paint: {
                        'fill-extrusion-color': ['get','color'],
                        'fill-extrusion-height': ["to-number", ['get','Total-pop']] ,
                        'fill-extrusion-opacity': 0.7
                    }

                })
                this.map.addLayer({
                    id: 'bars2016',
                    type: 'fill-extrusion',
                    source: 'centerData16',
                    layout: {
                        // make layer visible by default
                        visibility: 'visible',
                    },
                    paint: {
                        'fill-extrusion-color': ['get','color'],
                        'fill-extrusion-height': ["to-number", ['get','Total-pop']],
                        'fill-extrusion-opacity': 0.7
                    }

                })
                let message = ""
                var onlyOnce = false

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
        this.init()
        console.log(this.props.data)
    }

    componentDidUpdate() {
        

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