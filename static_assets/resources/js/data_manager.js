import Constants from "./constants.js";
import FileManager from './file_manager.js';

export default class DataManager {
    constructor() {
        this.file = '';
        this.con = new Constants()
        this.fm = new FileManager()
        this.data = this.get_data_file_content()
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
            tableBody += "<tr>";
            var dataObj = jsonData[eachItem];
            tableBody += "<td> <div>" + dataObj['ly_name'] + "</div> </td>";
            tableBody += "<td> <div>" + dataObj['ly_label'] + "</div> </td>";
            tableBody += "<td> <div>" + this.populate_inner_table(dataObj['ly_parts'],dataObj['ly_values']) + "</div> </td>";
            tableBody += "<td> <div>" + '<input type="color" id="html5colorpicker" onchange="clickColor(0, -1, -1, 5)" value="#ff0000" style="width:25%;">'+ "</div> </td>";
            tableBody += "<td> <div>" + '<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">' + "</div> </td>";
            tableBody += "</tr>";
        }
        //
        tableBody = tableBody + '</tbody>\n';
        var tableHTML = tableHead + tableBody
        document.getElementById(tableId).innerHTML = tableHTML;
    }

    populate_inner_table(ly_parts,ly_values){
        // change the ly_parts and ly_values into table
       return ''
    }

}

