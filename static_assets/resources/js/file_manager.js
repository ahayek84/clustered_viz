// module "file_manager.js"
import Constants from './constants.js';
export default class FileManager {
    constructor() {
        this.file = '';
        this.con = new Constants()
    }

    // Adding a method to the constructor
    greet() {
        console.log('haha')
    }

    function

    readTextFile(file) {
        var rawFile = new XMLHttpRequest();
        var allText; // var declared in readTextFile scope
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    allText = rawFile.responseText;
                }
            }
        }
        rawFile.send(null);
        return allText; // here you can return the data filled in above
    }

    getFileJSON(file) {
        var text = this.readTextFile(this.getURL() + "static/resources/geojson/" + file)
        var data = JSON.parse(text);
        return data
    }

    getFeatures(js){
        return js['features']
    }

    getURL() {
        return window.location.href;
    }
}


//
// readTextFile(getURL()+"static/resources/geojson/Locality2017.json", function(text){
//     var data = JSON.parse(text);
//     console.log(data);
// });