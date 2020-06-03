import Constants from "./constants.js";
import FileManager from './file_manager.js';

export default class MapManager {
    constructor() {
        this.file = '';
        this.con = new Constants()
        this.fm = new FileManager()
        this.li = this.con.get_list_geojson()
        this.geo_id = ["1235", "2475", "2455", "1110", "1240", "2460", "2470", "1120",
            "1101", "2465", "1125", "1350", "1230", "1105", "1115", "1345"]
        this.local_id = [
            13452170, 13452175, 13452180, 13452185, 13452190, 13452195, 13452200, 13452360, 13452660
        ]
        this.lang = 'en'
        this.data = []
        this.layout = {
            mapbox: {style: this.fm.get_style_map(this.lang), center: {lon: 35.208116, lat: 31.814685}, zoom: 7.5},
            // width: 600,
            //height: 500,
            margin: {t: 0, b: 0}
        }
        this.options = {
            mapboxAccessToken: 'pk.eyJ1IjoicG1hb3F1ZSIsImEiOiJjanZpMHNnNGowMHlvM3lxbHA3ZWdodzlyIn0.6m3CU9tWBXh1Jt7xMRYxOw',
            responsive: true
        }
    }

    /// it has to be added as directive
    function

    // Adding a method to the constructor Dont Delete it
    greet() {
        console.log('haha')
    }

    init_map() {
        var geo_name_en = this.fm.get_geo_names(this.geo_id, this.lang)
        var geo_json_map = this.fm.get_geojson_map(this.lang)
        this.data.push({
            type: "choroplethmapbox",
            name: "Palestine",
            geojson: this.fm.getFileJSON(geo_json_map),
            locations: geo_name_en,
            z: [null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null],
            zmin: 25,
            zmax: 280,
            showlegend: false,
            showscale: false
        })
        Plotly.newPlot("myDiv", this.data, this.layout, this.options);
    }

    refresh_map() {
        Plotly.react("myDiv", this.data, this.layout);
    }

    add_layer(ly_id,ly_label,ly_type,ly_parts,zvalues) {
        /*
        * ly_type : 1 for geos , 2 for localities
        * */
        var ly_name = this.fm.get_geo_names([ly_id],this.lang)[0]
        var geo_json_map = this.fm.get_geojson_layer(ly_id,this.lang)
        var geo_locals_names = this.fm.get_names(ly_type,ly_parts, this.lang)
        console.log(ly_name)
        console.log(geo_json_map)
        console.log(geo_locals_names)
        this.data.push(
            {
                type: "choroplethmapbox",
                autocolorscale: false,
                colorscale: [[0, 'rgb(255,255,255)'], [1, 'rgb(255,0,0)']],
                name: ly_name + ' ' + ly_label,
                geojson: this.fm.getFileJSON(geo_json_map),
                locations: geo_locals_names,
                z: zvalues,
                zmin: 25,
                zmax: 280,
                showlegend: true,
                showscale: false,
                hovertemplate: '<b>Name</b>: <b>%{text}</b>' +
                '<br><b>Val </b>: %{z}<br>',
                text: geo_locals_names,
                colorbar: {y: 0, yanchor: "bottom", title: {text: "Palestine", side: "right"}}
            }
        )
        this.refresh_map()
    }

    plot_map() {
        var geo_name_en = this.fm.get_geo_names(this.geo_id, this.lang)
        var geo_json_map = this.fm.get_geojson_map(this.lang)
        var geo_json_loc_map = this.fm.get_geojson_locality_map(this.lang, 1345) // betheleme
        var data = [{
            type: "choroplethmapbox",
            name: "Palestine",
            geojson: this.fm.getFileJSON(geo_json_map),
            locations: geo_name_en,
            z: [141, 140, 155, 147, 132, 146, 151, 137, 146,
                136, 145, 141, 149, 151, 138, 164],
            zmin: 25,
            zmax: 280,
            showlegend: true,
            showscale: false,
            hovertemplate: '<b>Name</b>: <b>%{text}</b>' +
            '<br><b>Val </b>: %{z}<br>',
            text: geo_name_en,
            colorbar: {y: 0, yanchor: "bottom", title: {text: "Palestine", side: "right"}}
        },
            {
                type: "choroplethmapbox",
                autocolorscale: false,
                colorscale: [[0, 'rgb(0,0,255)'], [1, 'rgb(255,0,0)']],
                name: "Bethlehem",
                geojson: this.fm.getFileJSON(geo_json_loc_map),
                locations: this.fm.get_local_names(this.local_id, this.lang),
                z: [141, 140, 155, 147, 132, 146, 151, 100, 50],
                zmin: 25,
                zmax: 280,
                showlegend: true,
                showscale: false,
                hovertemplate: '<b>Name</b>: <b>%{text}</b>' +
                '<br><b>Val </b>: %{z}<br>',
                text: this.fm.get_local_names(this.local_id, this.lang),
                colorbar: {y: 0, yanchor: "bottom", title: {text: "Palestine", side: "right"}}
            }
        ];

        Plotly.newPlot("myDiv", data, this.layout, this.options);
    }
}