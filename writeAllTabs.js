/* 
To write all the tabs to HTML 
tabs should be of type tab defined by chrome
*/

var node = document.getElementById('urls');
var focusfunction = "return false;";

function writeAllTabs () {
	if(node)
	console.log("node not null");
	chrome.tabs.query( { }, function (tabs){
		//var form = document.createElement('form');
		//form.setAttribute('id','myform');
	for (var i = 0; i < tabs.length; i++) {
		
    	var item = tabs[i].url;
    	var title = tabs[i].title;
    	var icon = tabs[i].favIconUrl;
    	//console.log(item);
    	writeToHtml(item,title,icon);
	}
	});
}

function writeToHtml(item,title,icon){

	var newlink = document.createElement('a');	
	var createAText = document.createTextNode(title);
	var br = document.createElement('br');
	var favIcon = document.createElement('img');

	favIcon.setAttribute('src',icon);
	favIcon.setAttribute('height','16');
	favIcon.setAttribute('width','16');
	node.appendChild(favIcon);

	newlink.setAttribute('href', item);
	newlink.setAttribute('class', 'focus');
	newlink.setAttribute('onClick',"return false;");
	newlink.appendChild(createAText);
	node.appendChild(newlink);
	
	node.appendChild(br);
}
writeAllTabs();
