/* This will save the tabs in localStorage*/

var storage = localStorage;

function set(key, item){
	storage.setItem(key, item);
}

function get(key){
	return storage.getItem(key);
}
function saveTabs(key, tabs){
	var store = JSON.stringify(tabs);
	set(key, store);
}