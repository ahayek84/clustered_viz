import FileManager from './file_manager.js';
import Constants from './constants.js';
var fm = new FileManager()
var con = new Constants()
var li = con.get_list_geojson()
var allfet = fm.getFeatures(fm.getFileJSON(li.governorates))

var feats = [];
var i
for (i = 0; i < allfet.length; i++) {
    var feat = {geometry:{type: "MultiPolygon",coordinates:[]},
                type: "Feature",
                properties: {geoid: "", name: ""}}
    feat.geometry.type = allfet[i].geometry.type
    feat.geometry.coordinates = allfet[i].geometry.coordinates
    feat.type = allfet[i].type
    // feat.properties.geoid = allfet[i].properties.Locality_C
    // feat.properties.name = allfet[i].properties.NAMEAR

    feats.push(feat)
}


var redcounties = {
    type: "FeatureCollection",
    features:[feats[0]]
    //features:con.get_sample_features()
};

console.log(redcounties)

var data = [{
    type: 'scattermapbox',
    lat: ['45.5017'],
    lon: ['-73.5673'],
    mode: 'markers',
    marker: {
        size: 14
    },
    text: ['Montreal']

}
];

var layout = {
    autosize: true,
    hovermode: 'closest',
    mapbox: {
        bearing: 0,
        center: {
            lat: 27.2,
            lon: -84
        },
        pitch: 0,
        zoom: 5,
        // start fixing from here
        layers: [
            {
                sourcetype: 'geojson',
                source: redcounties,
                type: 'fill',
                color: 'rgba(163,22,19,0.8)'
            }
        ]
    },
};

var options = {
    mapboxAccessToken: 'pk.eyJ1IjoiYWpvcG9zb3IiLCJhIjoiY2pjN3RodGswMm95eTJ4cGZleGtzenI3aSJ9.0Hqih8MFZMZcYmRIrOBcNg'
}

Plotly.newPlot("myDiv", data, layout, options);



