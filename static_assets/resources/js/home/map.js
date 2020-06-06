import MapManager from './../map_manager.js';
var map = new MapManager()
map.init_map()

// In order to call function from module javascript Make it global
function refresh_map() {
    var ly_id = 1
    var ly_parts = [
           "1235", "2475", "2455", "1110", "1240", "2460", "2470", "1120",
            "1101", "2465", "1125", "1350", "1230", "1105", "1115", "1345"
        ]
    var ly_values = [141, 140, 155, 147, 132, 146, 151, 137, 146,
                136, 145, 141, 149, 151, 138, 164]
    var ly_type = 1 // Palestine
    var ly_label = ''
    var ly_color = 'rgb(255,0,0)'
    map.add_layer(1,ly_id,ly_label,ly_color,ly_type,ly_parts,ly_values)

    var ly_id = 1345
    var ly_parts = [
            13452415
        ]
    var ly_values = [1041]
    var ly_type = 2 // localities
    var ly_label = 'Econmics'
    var ly_color = 'rgb(0,0,255)'
    map.add_layer(2,ly_id,ly_label,ly_color,ly_type,ly_parts,ly_values)
}
window.refresh_map = refresh_map;
// The Line above makes it global

// remove plotly bar
document.getElementsByClassName("modebar modebar--hover ease-bg")[0].style.display = "none"