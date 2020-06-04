import DataManager from './../data_manager.js';
var data_m = new DataManager()
data_m.greet()
data_m.populate_html_table('my_table')


function showModal(button) {
    var idx = getRowIndex( button );
    var html = data_m.populate_modal_table(idx)
    document.getElementById('mbody').innerHTML = html
}
window.showModal = showModal;
// The Line above makes it global


function getRowIndex( el ) {
    while( (el = el.parentNode) && el.nodeName.toLowerCase() !== 'tr' );

    if( el )
        return el.rowIndex;
}
