import MapManager from './../map_manager.js';
var map = new MapManager()
map.init_map()

// In order to call function from module javascript Make it global
function refresh_map() {map.refresh_map()}
window.refresh_map = refresh_map;
// The Line above makes it global