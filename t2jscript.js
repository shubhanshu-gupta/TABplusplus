/*
* global variables 
* 
*/
var sessionWin = new Array();
var currentSessionID = -1;


function Tab(tab){
  this.id = tab.id;
  this.title = tab.title;
  this.url = tab.url;
  this.favIconUrl = tab.favIconUrl;
  this.hashtags = " ";
  this.annotation = "";
  //this.tabhistory = getTabHistory(this.id);
}

Tab.prototype.pushHashTags = function (hashtags) {
  this.hashtags += hashtags + " ";
}

Tab.prototype.pushAnnotation = function (annotation) {
  this.annotation += annotation;
}
/*Tab.prototype.updateTabHistory = function () {
  this.tabhistory = getTabHistory(this.id);
}*/
function Window(id,tabs){
  this.id = id;
  this.tabs = tabs==null ? new Array() : tabs;
}


Window.prototype.pushtab = function (tab) {
  this.tabs.push( new Tab(tab) );
}

function update_sessionWin(windows){
  sessionWin.length = 0;
  var tabpp = new Tab({id:-1, title: "tAB++", url: " tab++", favIconUrl: "null"});
  var newtab = new Tab({id:-2, title: "New Tab", url: " new tab", favIconUrl: "null"});
  var alltabs = new Array(); alltabs.push(tabpp); alltabs.push(newtab);

  for (var i = 0; i < windows.length; i++) {
      var tempwindow = new Window(windows[i].id,null);
      var tabs = windows[i].tabs;

      for (var j = 0; j < tabs.length; j++) {
          for(var x=0,flag=true, y=alltabs.length; x < y; x++) {
            if(alltabs[x].title == tabs[j].title){
              flag = false; break;
            }
            alltabs.push(tabs[j]);
          }
          if(flag)
          tempwindow.pushtab(tabs[j]);    
      }
      if(tempwindow.tabs.length > 0) 
        sessionWin.push(new Window(tempwindow.id,tempwindow.tabs));
    }
}
/*
 * returns all open windows to callback function
*/
function getAllWindows(callback){
  chrome.windows.getAll( {populate : true}, function (windows){
    update_sessionWin(windows);
    currentSessionID = -1;
    callback(sessionWin);
  });
}

/*
 * write tabs to the main html page with checkbox;
 * all windows displaying label has id of type ##win;  ## represent number
 * all checkboxes tabs displaying tags have id of type ##tab; 
 * all a tags have id tab.id+url which is unique 
 * both windows and tabs labels have class 'urlList' 
 * checkbox are present before each url and window 
*/
function writeTabs (windows) {

  var d1=document.getElementById('t2');
  d1.innerHTML = '<div></div>';
  updateTabsNumber(0);

  var winid = 0, tabid = 0;
  var label = '<label style="margin: 1em 0 0 1em;"><input type="checkbox" class="urlList" value=';

  for (var j= 0; j< windows.length; j++){
    winid = j+"win";
    d1.insertAdjacentHTML('beforeend','<div id='+'@'+winid+'@>'+label+winid+' id="null"><a href=# id='+j+'winbutton> Windows '+j+'</button></label><br>');    
    var d2 = document.getElementById('@'+winid+'@');

    var tabs = windows[j].tabs;
    for(var i=0;i<tabs.length;i++) {

      tabid = i +'tab';
      var favIcon = '<img height="16" width="16" hspace="8" src='+tabs[i].favIconUrl+'>  ';
      var atag = '<a href='+tabs[i].url+' id='+tabs[i].id + 'url>'+tabs[i].title+'</a>';
      var hash = '&nbsp<button type="button" id='+tabid+j+'hash value='+winid+'>Hash</button>';      
      var annotation = '&nbsp<button type="button" id='+tabid+j+'annotation value='+winid+'>Annotation</button>';

      d2.insertAdjacentHTML('beforeend','<span>'+label+winid+' id='+tabid+'>'+favIcon+atag+hash+annotation+'</label><br></span>'); 
      
      document.getElementById(tabs[i].id + 'url').onclick = function(){ openUrl(this); return false; };
      document.getElementById(tabid + j+'hash').onclick = function(){ additional(this,'hash'); };
      document.getElementById(tabid + j+'annotation').onclick = function(){ additional(this,'annotation'); };
     }

     d1.insertAdjacentHTML('beforeend','</div>');
     document.getElementById(j+"winbutton").onclick = function(){  openWindow(sessionWin, parseInt(this.id) ) };
      updateTabsNumber(tabs.length);
    }
}

/*
 * create button inside the element with id documentid 
 * button has id and name given by parameters
*/
function createButton(documentid, buttonid, buttonname){

  var d1=document.getElementById(documentid);
  var button = '<button class="btn btn-primary btn-lg" id=';
  var buttonstyle = ' style="width:300px;height:60px;">';
  d1.insertAdjacentHTML('afterend', button+buttonid+buttonstyle+buttonname+'</button><br>');
}

/*
 * display all stored sessions from local storage to main HTML page.
 * assign the onclick function for these stores sessions
* checkbox infront of Saved sessions have id @key@ and class savedsession
*/
function printAll()
{
  for(i=0; i<localStorage.length;i++) {
  var key = localStorage.key(i);
  var d1=document.getElementById('SavedSession');
  d1.insertAdjacentHTML('afterend', '<input type="checkbox" id= @'+key+'@ class="savedsession">&nbsp &nbsp');
  createButton("SavedSession",key,key);

  var but = document.getElementById(key);
  but.addEventListener('click',function(){myfunc(this.id);})
  }
}
/*
* save the windows to local storage 
* key is provided by user and is used both as session name and key in localstorage
* checkbox infront of Saved sessions have id @key@ and class savedsession
*/
function save(windows){
  var storage = localStorage;
  var key = prompt("Enter New Session Name","Default");
  if(key!=null && key != "") {
    var flag = localStorage[key];
    if(flag==undefined) {         // The key is new and has not been used
      var item = JSON.stringify(windows);
      storage.setItem(key, item);
      alert(key+' Session Saved');
      var d1=document.getElementById('SavedSession');
      d1.insertAdjacentHTML('afterend', '<input type="checkbox" id= @'+key+'@'+' class="savedsession" >&nbsp &nbsp');
      createButton("SavedSession",key,key);

      var but = document.getElementById(key);
      but.addEventListener('click',function(){myfunc(this.id);})    
    }
    else {
      var r = confirm("Do you want to merge???");
      if(r==true) {
        var finalwindows = JSON.parse(localStorage.getItem(key));
        update_sessionWin(finalwindows.concat(windows));
        var item = JSON.stringify(sessionWin);
        localStorage.setItem(key, item);
        alert("Merge Done");
      }
    }
  }
}
/*
* remove tabs that are selected using checkboxes from the main HTML page 
* checkbox value is of type #win where # represent windows index in sessionWin
* checkbox id is of type #tab where # is tab index in tabs array
*/
function removeCheckedboxes(){

  var checkedboxes=document.querySelectorAll('input[class="urlList"]:checked');
  for (var i=0; i<checkedboxes.length; i++){
   var value = checkedboxes[i].value;
   var id = checkedboxes[i].id;
   //console.log(value + id);
   var winno = parseInt(value);

    if(id == 'null')
    sessionWin.splice(winno, 1);

    else {      
      var tabno = parseInt(id);
      sessionWin[winno].tabs.splice(tabno,1);
      
    }
  }
  writeTabs(sessionWin);
  if(currentSessionID!=-1)
    {
      key = currentSessionID;
      var item = JSON.stringify(sessionWin);
      localStorage.setItem(key,item);
      alert("Your changes have been saved in session named as: "+ key);
    }
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
function openWindow(windows , index){
  var win;
  if(index != -1){
    win = new Array();
    win.push(windows[index]);
  }
  else win = windows;
  for (var i = 0; i < win.length; i++) {
   var tabs = win[i].tabs;
   var arr = new Array();
   var len = 0;
   for(j=0; j<tabs.length;j++){
       arr[len] = tabs[j].url;
       len++;
     }
   chrome.windows.create({url:arr});
  }
}

/*
 * refocus the tab url if its already open 
 * else open tab in new tab 
 */
function openUrl(atag){
  var url = atag.href;
  alert(url);
}
/*
 * gets hash tags or annotation from user and push it in respective tabs
 * hashtags are of format #string and annotation are simple string
 */
 function additional(button, type){
  var winno = parseInt(button.value);
  var tabno = parseInt(button.id);
  var tab = sessionWin[winno].tabs[tabno];
  if(tab){    
    var value = prompt("Please Enter " +type);
    if(value == null || value == "") return;
    if(type == "hash") {
      var hashtags = value;
    if(hashtags.indexOf('#') > -1){
      tab.pushHashTags(hashtags);
      alert(tab.hashtags);
    }
    else alert("Error Please enter # in hash tags");
  }
    else if (type == "annotation"){
      //alert(tab.annotation);
      var annotation = value;
      tab.pushAnnotation(annotation);
      alert(tab.annotation);
    }
    
  }
 }
/*
 * merge two or more saved sessions 
 * option to delete the sessions that are being merged 
 */

function mergeSession() {
  var checkboxes =  document.querySelectorAll('input[class="savedsession"]:checked');

  if(checkboxes.length < 2) {
    alert(checkboxes.length+"You must check atleast two checkbox");
    return;
  }
  var r = false, key = "nokey";
  key = prompt("Enter Name of the merged session: ");
  r = confirm("Do you want the merged sessions to be deleted?");

  if(key!=null && key!= "") {
  var i =0,flag=0 ,finalwindows = new Array();
  for(i=0;i<checkboxes.length;i++){
     flag=1;
     var iiid = checkboxes[i].id;
     var size = iiid.length;
     var iid = iiid.substr(1,size-2);
     var windows = JSON.parse(localStorage.getItem(iid));
     finalwindows = finalwindows.concat(windows);
     if(r==true)
      localStorage.removeItem(iid);
  }
    update_sessionWin(finalwindows);
    var item = JSON.stringify(sessionWin);
    localStorage.setItem(key, item);
    var d1=document.getElementById('SavedSession');
    d1.insertAdjacentHTML('afterend', '<input type="checkbox" id= '+'@'+key+'@'+' class="savedsession">&nbsp &nbsp');
    createButton("SavedSession",key,key);

    var but = document.getElementById(key);
    but.addEventListener('click',function(){myfunc(this.id);}) 
    location.reload();
  }
  else 
    alert("Please enter valid key");
}
/*
 * delete sessions from localstorage and write it to main HTML 
*/

function deleteSession()
{ 
  var checkboxes =  document.querySelectorAll('input[class="savedsession"]:checked');
   var flag=0;
   for(i=0;i<checkboxes.length;i++){
       flag=1;
       var iiid = checkboxes[i].id;
       var size = iiid.length;
       var iid = iiid.substr(1,size-2);
        localStorage.removeItem(iid);   
   }
   location.reload();
}

/*
 * retrievs session from localstorage and write it to main HTML 
*/
function myfunc(iid) {
   var tabs = JSON.parse(localStorage.getItem(iid));
   update_sessionWin(tabs);
   currentSessionID = iid;
   updateTabsNumber(0);
   writeTabs(tabs);
}

document.getElementById("Save").onclick = function () { save(sessionWin); };
document.getElementById("Delete").onclick = function() { removeCheckedboxes(); };
document.getElementById("Restore").onclick = function() { openWindow(sessionWin , -1);};
document.getElementById("currentSession").onclick = function(){getAllWindows(writeTabs);};
document.getElementById("Merge").onclick = function(){mergeSession();};
document.getElementById("Delbutton").onclick = function(){deleteSession();};

getAllWindows(writeTabs);
printAll();