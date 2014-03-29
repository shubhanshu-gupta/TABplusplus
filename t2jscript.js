function Tab(title, url, favIconUrl){
  this.title = title;
  this.url = url;
  this. favIconUrl = favIconUrl;
  //this.hashtags = hashtags;
}
/*
Tab.prototype.getHashTags = function () {
  return this.hashtags;
}
*/
function Window(id){
  this.id = id;
  this.tabs = new Array();
}

Window.prototype.pushtab = function (tab) {
  var newtab = new Tab(tab.title, tab.url, tab.favIconUrl);
  this.tabs.push(newtab);
}

Window.prototype.update(value){
  var id = parseInt(value);
  if (str.indexOf("win") >= 0){
    
  }
}
var sessionWin = new Array();

/*
 * returns all open windows to callback function
*/
function getAllWindows(callback){
          chrome.windows.getAll( {populate : true}, function (windows){
            for (var i = 0; i < windows.length; i++) {
              sessionWin.push(new Window(windows[i].id) );
              var tabs = windows[i].tabs;
              for (var j = 0; j < tabs.length; j++) {
                sessionWin[i].pushtab(tabs[j]);
              };
            };
            //callback(windows);
            callback(sessionWin);
          });
}
/*
 * write tabs to the main html page with checkbox;
 * all windows displaying label has id of type win##;  ## represent number
 * all tabs displaying tags have id of type win##tab##;
 * both windows and tabs labels have class 'urlList' 
 * checkbox are present before each url and window 
*/
function writeTabs (windows) {

  var d1=document.getElementById('t2');
  d1.innerHTML = '<div></div>'; // Empty div for start
  var winid = 0, tabid = 0;
  var label = '<label style="margin: 1em 0 0 0;"><input type="checkbox" class="urlList" value=';
  var winbutton =  '<button style="background:none;border:none;" id="winbuttonno"';
  for (var j= 0; j< windows.length; j++){
    winid = "win" + j;
    d1.insertAdjacentHTML('beforeend','<div id='+winid+'>'+label+winid+'>'+winbutton+j+'> Windows '+j+'</button></label><br></div>');    
    var winnode = document.getElementById(winid);
    //winnode.onclick = function(){  alert("open window "+ j) };
    var tabs = windows[j].tabs;
    for(var i=0;i<tabs.length;i++) {
      tabid = winid+"tab"+i;
      var favIcon = '<img height="16" width="16" hspace="8" src='+tabs[i].favIconUrl+'>  ';
      var atag = '<a href='+tabs[i].url+'>'+tabs[i].title+'</a>';
      winnode.insertAdjacentHTML('beforeend','<span id='+tabid+'>'+label+tabid+'>'+favIcon+atag+'</label><br></span>');
     }
     //d1.insertAdjacentHTML('beforeend', '</div>');  //end jth windows div 
      updateTabsNumber(tabs.length);
    }
}

/*
 * create button inside the element with id documentid 
 * button has id and name given by parameters
*/
function createButton(documentid, buttonid, buttonname){

  var d1=document.getElementById(documentid);
  var button = '<button class="btn btn-primary btn-lg" ';
  var buttonstyle = 'style="width:300px;height:60px;">';
  d1.insertAdjacentHTML('afterend', button+'id='+buttonid+buttonstyle+buttonname+'</button><br>');
}

/*
 * display all stored sessions from local storage to main HTML page.
 * assign the onclick function for these stores sessions
*/
function printAll() {

  for(i=0; i<localStorage.length;i++) {

    var key = localStorage.key(i);
    createButton('SavedSession', key, key);

    var but = document.getElementById(key);
    but.addEventListener('click',function(){myfunc(this.id);})

  }
}
/*
* save the windows to local storage 
* key is provided by user and is used both as session name and key in localstorage
*/
function save(windows){
  var storage = localStorage;
  var key = prompt("Enter New Session Name","");
  if(key != null)
  var item = JSON.stringify(windows);
  storage.setItem(key, item);
  alert(key+' Session Saved');

  createButton('SavedSession', key, key);

  var but = document.getElementById(key);
  but.addEventListener('click',function(){myfunc(this.id);})

}
/*
* remove tabs that are selected using checkboxes from the main HTML page 
*/
function removeTabs(){
  var checkedhobbies=document.querySelectorAll('input[class="urlList"]:checked')
  for (var i=0; i<checkedhobbies.length; i++){
   var value = checkedhobbies[i].value;
   var selected = document.getElementById(value);
   selected.parentNode.removeChild(selected);
   sessionWin.update(value);
  }
  updateTabsNumber(-1*checkedhobbies.length);
}
/*
 * update tabs number on following events
 * displaying currently open session
 * removing some windows or tabs from main HTML
 * displaying stored session
 * to reset tab number length is passed as zero
 */
function updateTabsNumber(length){
  var d2=document.getElementById('number');
  var temp = parseInt(d2.innerHTML);
  if(length == 0 ) temp = 0;
  d2.innerHTML = length + temp;
}
/*
 * open the windows in new window
 */
function openWindow(windows){

  for(i=0;i <= windows.length;i++){
   var tabs = windows[i].tabs;
   var arr = new Array();
   var len = 0;
   for(j=0; j<tabs.length;j++){
     if(tabs[j].title != "tAB++" && tabs[j].title != "New Tab"){
       arr[len] = tabs[j].url;
       len++;
     }
   }
   chrome.windows.create({url:arr});
 }
}
/*
 * retrievs session from localstorage and write it to main HTML 
*/
function myfunc(iid) {
   var tabs = JSON.parse(localStorage.getItem(iid));
   currentWindows = tabs;
   updateTabsNumber(0);
   writeTabs(tabs);
}

document.getElementById("Save").onclick = function () { getAllWindows(save) };
document.getElementById("Delete").onclick = function() { removeTabs(); };
document.getElementById("Restore").onclick = function() { openWindow();};

getAllWindows(writeTabs);
printAll();