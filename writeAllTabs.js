/* 
To write all the tabs to HTML 
tabs should be of type tab defined by chrome
*/

var form = document.getElementById('formspace');

function writeAllTabs () {
	chrome.tabs.query( { }, function (tabs){
		//var form = document.createElement('form');
		//form.setAttribute('id','myform');
	for (var i = 0; i < tabs.length; i++) {
    	writeToHtml(tabs[i],i);
	}
	});
}

//function writeToHtml(item,title,icon){
function writeToHtml(tab,number){
	var item = tab.url;
	var title = tab.title;
	var icon = tab.favIconUrl;
	var newlink = document.createElement('a');	
	var createAText = document.createTextNode(title);
	var br = document.createElement('br');
	var favIcon = document.createElement('img');
	var newinput = document.createElement('input');
	var node = document.createElement('span');

//<input class="hobbies" type="checkbox" value="movies" href="www.google.com"/>Movies
	newinput.setAttribute('class', 'urlList');
	newinput.setAttribute('type','checkbox');
	newinput.setAttribute('value', number);
	node.appendChild(newinput);

	favIcon.setAttribute('src',icon);
	favIcon.setAttribute('height','16');
	favIcon.setAttribute('width','16');
	node.appendChild(favIcon);

	newlink.setAttribute('href', item);
	newlink.setAttribute('class', 'clickable');
	newlink.setAttribute('onClick',"return false;");
	newlink.appendChild(createAText);
	node.appendChild(newlink);
	
	node.appendChild(br);
	node.setAttribute('id',number);
	node.setAttribute('class','content');
	form.appendChild(node);
}

function check(){
	if (document.querySelector){
 document.querySelector('#myform').onsubmit=function(){
  var checkedhobbies=this.querySelectorAll('input[class="urlList"]:checked')
  for (var i=0; i<checkedhobbies.length; i++){
   //alert(checkedhobbies[i].value)
   var value = checkedhobbies[i].value;
   var selected = document.getElementById(value);
   selected.parentNode.removeChild(selected);
  }
  return false
 }
}
}
function focus(taburl){
	console.log("infocus");
	chrome.tabs.query( { url: taburl}, function (tabs){
		if(tabs != null){
			chrome.tabs.update(tabs[0].id, {active : true});
		}
	});
}
writeAllTabs();
check();