import mapboxgl from 'mapbox-gl'
import React, { Component } from 'react';
import * as geolib from 'geolib'
import centerData06 from './data/Melbourne/Melb06_merged_min.json'
import centerData11 from './data/Melbourne/Melb11_merged_min.json'
import centerData16 from './data/Melbourne/Melb16_merged_min.json'
import * as turf from '@turf/turf'
//import geojson from 'geojson'
export default class MapFunctions_Melbourne extends Component {

    // set to 2017 initially despite play preview or you get a bug when using the type dropdown
    m_initiated = false
    map = null


    tooltipContainer
    popup
    self = null

    m_colors = ["blue","red","purple","green","yellow","black","white"]

    m_tilesets = {
       // "2001":{"id": "mapbox:/norahama.anl71j5p", "sourcelayer" : "Melbourne2001-23s20v"},
        "2006":{"id": "mapbox://norahama.bm41q2of", "sourcelayer" : "Melbourne2006-6b3o6h"},
        "2011":{"id": "mapbox://norahama.dzjhyft8", "sourcelayer" : "Melbourne2011-csnnwo"},
        "2016":{"id":  "mapbox://norahama.cc4vdfad", "sourcelayer" : "Melbourne2016-47i90b"},
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
                center: [144.96,-37.84]
            })


      
            
            var self = this;
   
            this.map.on('load', () => {
                // add source and layer for museums

                this.map.addSource('centerData06', {
                    type: 'geojson',
                    data: centerData06,
                    cluster: false
                })
                this.map.addSource('centerData11', {
                    type: 'geojson',
                    data: centerData11,
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
     /*          this.map.addSource('source2001', {
      8              type: 'vector',
                    url: this.m_tilesets["2001"].id
                    // url: 'https://api.mapbox.com/v4/norahama.2cmdpwa5/8/0/1.mvt?access_token=pk.eyJ1Ijoibm9yYWhhbWEiLCJhIjoiY2ptaGFsZDR5MThrczN1dDhtajc1cTFmMSJ9.VEUImGmfsM77LfjErYxDdQ'
                });*/
                this.map.addSource('source2011', {
                    type: 'vector',
                    url: this.m_tilesets["2011"].id
                    // url: 'https://api.mapbox.com/v4/norahama.2cmdpwa5/8/0/1.mvt?access_token=pk.eyJ1Ijoibm9yYWhhbWEiLCJhIjoiY2ptaGFsZDR5MThrczN1dDhtajc1cTFmMSJ9.VEUImGmfsM77LfjErYxDdQ'
                });

                this.map.addSource('source2006', {
                    type: 'vector',
                    url: this.m_tilesets["2006"].id
                    // url: 'https://api.mapbox.com/v4/norahama.2cmdpwa5/8/0/1.mvt?access_token=pk.eyJ1Ijoibm9yYWhhbWEiLCJhIjoiY2ptaGFsZDR5MThrczN1dDhtajc1cTFmMSJ9.VEUImGmfsM77LfjErYxDdQ'
                });

  
                this.map.addLayer({
                    id: 'bars2006',
                    type: 'fill-extrusion',
                    source: 'centerData06',
                    layout: {
                        // make layer visible by default
                        visibility: 'visible',
                    },
                    paint: {
                        'fill-extrusion-color': ['get','color'],
                        'fill-extrusion-height': ['get','Population'] ,
                        'fill-extrusion-opacity': 0.7
                    }

                })
                this.map.addLayer({
                    id: 'bars2011',
                    type: 'fill-extrusion',
                    source: 'centerData11',
                    layout: {
                        // make layer visible by default
                        visibility: 'none',
                    },
                    paint: {
                        'fill-extrusion-color': ['get','color'],
                        'fill-extrusion-height': ['get','Population'] ,
                        'fill-extrusion-opacity': 0.7
                    }

                })
                this.map.addLayer({
                    id: 'bars2016',
                    type: 'fill-extrusion',
                    source: 'centerData16',
                    layout: {
                        // make layer visible by default
                        visibility: 'none',
                    },
                    paint: {
                        'fill-extrusion-color': ['get','color'],
                        'fill-extrusion-height': ['get','Population'],
                        'fill-extrusion-opacity': 0.7
                    }

                })
                let message = ""
                var onlyOnce = false

           
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