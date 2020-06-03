import MapManager from './../map_manager.js';
var map = new MapManager()
map.init_map()

// In order to call function from module javascript Make it global
function refresh_map() {
    var ly_id = 1345
    var ly_parts = [
            13452170, 13452175, 13452180, 13452185, 13452190, 13452195, 13452200, 13452360, 13452660
        ]
    var ly_values = [141, 140, 155, 147, 132, 146, 151, 100, 50]
    var ly_type = 2 // localities
    var ly_label = 'econmics'
    map.add_layer(ly_id,ly_label,ly_type,ly_parts,ly_values)

    var ly_id = 1
    var ly_parts = [
           "1235", "2475", "2455", "1110", "1240", "2460", "2470", "1120",
            "1101", "2465", "1125", "1350", "1230", "1105", "1115", "1345"
        ]
    var ly_values = [141, 140, 155, 147, 132, 146, 151, 137, 146,
                136, 145, 141, 149, 151, 138, 164]
    var ly_type = 1 // Palestine
    var ly_label = ''
    map.add_layer(ly_id,ly_label,ly_type,ly_parts,ly_values)


}
window.refresh_map = refresh_map;
// The Line above makes it global