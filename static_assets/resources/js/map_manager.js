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
        var clientHeight = document.getElementById('WmyDiv').clientHeight;
        console.log(clientHeight)
        this.layout = {
            mapbox: {style: this.fm.get_style_map(this.lang), center: {lon: 35.208116, lat: 31.814685}, zoom: 7.5},
            // width: 600,
            height: clientHeight,
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
            row_id: 0,
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

    re_init_map() {
        var geo_name_en = this.fm.get_geo_names(this.geo_id, this.lang)
        var geo_json_map = this.fm.get_geojson_map(this.lang)
        this.data.push({
            row_id: 0,
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
    }

    refresh_map() {
        Plotly.react("myDiv", this.data, this.layout);
    }

    remove_layer(row_id) {
        var jsonData = this.data
        for (var eachItem in jsonData) {
            var dataObj = jsonData[eachItem];
            if (dataObj['row_id'] == row_id) {
                this.data.splice(eachItem, 1)
            }
        }
        if (this.data.length == 0){
            this.re_init_map()
        }
        this.refresh_map()
    }

    add_layer(rw_id, ly_id, ly_label, ly_color, ly_type, ly_parts, zvalues) {
        /*
        * ly_type : 1 for geos , 2 for localities
        * */
        var vzmin = Math.round(Math.min.apply(Math, zvalues) / 1.7)
        var vzmax = Math.round(Math.max.apply(Math, zvalues) * 1.7)
        var ly_name = this.fm.get_geo_names([ly_id], this.lang)[0]
        var geo_json_map = this.fm.get_geojson_layer(ly_id, this.lang)
        var geo_locals_names = this.fm.get_names(ly_type, ly_parts, this.lang)
        this.data.push(
            {
                row_id: rw_id,
                type: "choroplethmapbox",
                autocolorscale: false,
                colorscale: [[0, 'rgb(255,255,255)'], [1, ly_color]],
                name: ly_name + ' ' + ly_label,
                geojson: this.fm.getFileJSON(geo_json_map),
                locations: geo_locals_names,
                z: zvalues,
                zmin: vzmin,
                zmax: vzmax,
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
}