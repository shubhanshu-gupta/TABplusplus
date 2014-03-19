
chrome.browserAction.onClicked.addListener(function create(){
	console.log("hello");
	Url = typeof Url !== 'undefined' ? Url : 'output.html';  
	chrome.tabs.create({url : Url, active : true});
});
//document.getElementById('saveall').onclick = create;

