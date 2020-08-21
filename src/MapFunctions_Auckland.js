import mapboxgl from 'mapbox-gl'
import React, { Component } from 'react';
import * as geolib from 'geolib'
import centerData96 from './data/Auckland/Auck1996_merged_min.json'
import centerData13 from './data/Auckland/Auck2013_merged_min.json'
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
        "1996":{"id": "mapbox://norahama.deq4a9rw", "sourcelayer" : "AucklandShape-19n187"},
        "2013":{"id": "mapbox://norahama.deq4a9rw", "sourcelayer" : "AucklandShape-19n187"},

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
                center: [174.76,-36.84]
            })

            var self = this;
            this.map.on('load', () => {
                // add source and layer for museums

                this.map.addSource('centerData96', {
                    type: 'geojson',
                    data: centerData96,
                    cluster: false
                })
                this.map.addSource('centerData13', {
                    type: 'geojson',
                    data: centerData13,
                    cluster: false
                })
                this.map.addSource('source2013', {
                    type: 'vector',
                    url: this.m_tilesets["2013"].id
                    // url: 'https://api.mapbox.com/v4/norahama.2cmdpwa5/8/0/1.mvt?access_token=pk.eyJ1Ijoibm9yYWhhbWEiLCJhIjoiY2ptaGFsZDR5MThrczN1dDhtajc1cTFmMSJ9.VEUImGmfsM77LfjErYxDdQ'
                });
                this.map.addSource('source1996', {
                    type: 'vector',
                    url: this.m_tilesets["1996"].id
                    // url: 'https://api.mapbox.com/v4/norahama.2cmdpwa5/8/0/1.mvt?access_token=pk.eyJ1Ijoibm9yYWhhbWEiLCJhIjoiY2ptaGFsZDR5MThrczN1dDhtajc1cTFmMSJ9.VEUImGmfsM77LfjErYxDdQ'
                });

                this.map.addLayer({
                    id: 'bars1996',
                    type: 'fill-extrusion',
                    source: 'centerData96',
                    layout: {
                        visibility:"none"
                    },
                    paint: {
                        'fill-extrusion-color': ['get','color'],
                        'fill-extrusion-height': ['get','Population'] ,
                        'fill-extrusion-opacity': 0.7
                    }

                })
                this.map.addLayer({
                    id: 'bars2013',
                    type: 'fill-extrusion',
                    source: 'centerData13',
                    layout: {
                        visibility:"visible"
                    },
                    paint: {
                        'fill-extrusion-color': ['get','color'],
                        'fill-extrusion-height': ['get','Population'] ,
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