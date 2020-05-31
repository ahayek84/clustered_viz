// module "file_manager.js"
import Constants from './constants.js';
export default class FileManager {
    constructor() {
        this.file = '';
        this.con = new Constants()
    }
    /// it has to be added as directive
    function

    // Adding a method to the constructor Dont Delete it
    greet() {
        console.log('haha')
    }

    getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }

    // Adding a method to the constructor
    get_geo_names(codes, type = 'en') {
        var dic = this.con.get_geoname_lookup(type)
        var newcodes = codes.map(x => dic[x])
        console.log(newcodes)
        return newcodes
    }

    get_style_map(type = 'en'){
        var res = "mapbox://styles/pmaoque/cjvnmbu4v03c51dp9ztq1vfnw"
        if (type == 'ar'){
            res = "mapbox://styles/pmaoque/cjvnm9c5w01o71cptm2xe655j"
        }
        return res
    }

    get_geojson_map(type = 'en'){
        var li = this.con.get_list_geojson()
        var res = li.governorates_en
        if (type == 'ar'){
            res = li.governorates_ar
        }
        return res
    }

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