import Constants from "./constants.js";
import FileManager from './file_manager.js';
import MapManager from './map_manager.js';


export default class DataManager {
    constructor() {
        this.file = '';
        this.con = new Constants()
        this.fm = new FileManager()
        this.data = this.get_data_file_content()
        this.map = new MapManager()
    }

    /// it has to be added as directive
    function

    // Adding a method to the constructor Dont Delete it
    greet() {
        console.log(this.data)
    }

    get_data_file_content() {
        var data = this.fm.getDataJSON()
        var jsonData = data
        for (var eachItem in jsonData) {
            var dataObj = jsonData[eachItem];
            dataObj["ly_name"] = this.fm.get_geo_names([dataObj["ly_id"]], 'en')[0]
            dataObj["ly_parts_names"] = this.fm.get_geo_names(dataObj["ly_parts"], this.lang)
        }
        return jsonData
    }

    populate_html_table(tableId) {
        var tableHead = '<thead class="thead-light">\n' +
            '                <tr>\n' +
            '                    <th>Country</th>\n' +
            '                    <th>Label</th>\n' +
            '                    <th>Data</th>\n' +
            '                    <th>Color</th>\n' +
            '                    <th>Visulize</th>\n' +
            '                </tr>\n' +
            '                </thead>\n'
        var tableBody = ' <tbody>\n'
        //
        // build the body
        var jsonData = this.data
        for (var eachItem in jsonData) {
            var row_id = parseInt(eachItem, 10) + 1;
            tableBody += "<tr>";
            var dataObj = jsonData[eachItem];
            tableBody += "<td> <div>" + dataObj['ly_name'] + "</div> </td>";
            tableBody += "<td> <div>" + dataObj['ly_label'] + "</div> </td>";
            tableBody += "<td> <div>" + '<button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal" onclick="showModal(this)">Show Data</button>' + "</div> </td>";
            //tableBody += "<td> <div>" + this.populate_inner_table(dataObj['ly_parts'],dataObj['ly_values']) + "</div> </td>";
            tableBody += "<td> <div>" + '<input type="color" id="colr_' + row_id + '" onchange="clickColor(0, -1, -1, 5)" value="#ff0000" style="width:25%;">' + "</div> </td>";
            tableBody += "<td> <div>" + '<input type="checkbox" id="chk_' + row_id + '" name="vehicle1" onchange="viz(this)">' + "</div> </td>";
            tableBody += "</tr>";
        }
        //
        tableBody = tableBody + '</tbody>\n';
        var tableHTML = tableHead + tableBody
        document.getElementById(tableId).innerHTML = tableHTML;
    }

    zip(arrays) {
        return arrays[0].map(function (_, i) {
            return arrays.map(function (array) {
                return array[i]
            })
        });
    }


    // add data
    visulize_data_on_map(row_id, ly_color, show_flag) {
        var dat = this.get_data_row(row_id)
        if (dat != -1) {
            if (show_flag) {
                this.map.add_layer(dat['ly_id'],dat['ly_label'],ly_color,dat['ly_type'],dat['ly_parts'],dat['ly_values'])
                console.log('viz on map')
            } else {
                console.log('off viz on map')
            }
        }
    }

    populate_modal_table(row_id) {
        // change the ly_parts and ly_values into table
        var tableHead = '<thead>\n' +
            '<tr>\n' +
            '<th>Name</th>\n' +
            '<th>Value</th>\n' +
            '</tr>\n' +
            '</thead>'
        var tableBody = ' <tbody>\n'
        var dat = this.get_data_row(row_id)
        var html = ''
        if (dat != -1) {
            // create hTML elements for Modal
            var jsonData = this.zip([dat['ly_parts_names'], dat['ly_values']])
            for (var eachItem in jsonData) {
                var itemparts = jsonData[eachItem]
                tableBody += "<tr>";
                for (var part in itemparts) {
                    tableBody += "<td> <div>" + itemparts[part] + "</div> </td>";
                }
                tableBody += "</tr>";
            }
        }
        tableBody = tableBody + '</tbody>\n';
        var tableHTML = tableHead + tableBody
        return tableHTML
    }

    get_data_row(id) {
        var jsonData = this.data
        for (var eachItem in jsonData) {
            var dataObj = jsonData[eachItem];
            if (dataObj['id'] == id) {
                return dataObj
            }
        }
        return -1
    }

}