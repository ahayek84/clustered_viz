import FileManager from './../file_manager.js';
import Constants from './../constants.js';

var fm = new FileManager()
var con = new Constants()
var li = con.get_list_geojson()
var lang = "en"

var geo_id = ["1235", "2475", "2455","1110", "1240", "2460","2470","1120",
                "1101","2465", "1125", "1350","1230", "1105", "1115","1345"]

var geo_name_en = fm.get_geo_names(geo_id,lang)
var geo_json_map = fm.get_geojson_map(lang)

// var data = [{
//     type: "choroplethmapbox",
//     name: "US states",
//     geojson: fm.getFileJSON(li.us_states),
//     locations: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"],
//     z: [141, 140, 155, 147, 132, 146, 151, 137, 146, 136, 145, 141, 149, 151, 138, 158, 164, 141, 146, 145, 142, 150, 155, 160, 156, 161, 147, 164, 150, 152, 155, 167, 145, 146, 151, 154, 161, 145, 155, 150, 151, 162, 172, 169, 170, 151, 152, 173, 160, 176],
//     zmin: 25,
//     zmax: 280,
//     colorbar: {y: 0, yanchor: "bottom", title: {text: "US states", side: "right"}}
// }
// ];


var data = [{
    type: "choroplethmapbox",
    name: "US states",
    geojson: fm.getFileJSON(geo_json_map),
    locations: geo_name_en ,
    z: [141, 140, 155, 147, 132, 146, 151, 137, 146,
        136, 145, 141, 149, 151, 138,164],
    zmin: 25,
    zmax: 280,
    colorbar: {y: 0, yanchor: "bottom", title: {text: "Palestine", side: "right"}}
}
];

var layout = {
    mapbox: {style: fm.get_style_map(lang), center: {lon: 35.208116, lat: 31.814685}, zoom: 7.5},
    // width: 600,
    // height: 400,
    margin: {t: 0, b: 0}
};

var options = {
    mapboxAccessToken: 'pk.eyJ1IjoicG1hb3F1ZSIsImEiOiJjanZpMHNnNGowMHlvM3lxbHA3ZWdodzlyIn0.6m3CU9tWBXh1Jt7xMRYxOw'
}

Plotly.newPlot("myDiv", data, layout, options);
