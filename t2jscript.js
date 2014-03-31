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
  //this.tabhistory = tabhistory;
}
/*
Tab.prototype.getHashTags = function () {
  return this.hashtags;
}
*/
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
 * all tabs displaying tags have id of type ##tab;
 * both windows and tabs labels have class 'urlList' 
 * checkbox are present before each url and window 
*/
function writeTabs (windows) {

  var d1=document.getElementById('t2');
  d1.innerHTML = '<div></div>';
  updateTabsNumber(0);

  var winid = 0, tabid = 0;
  var label = '<label style="margin: 1em 0 0 1em;"><input type="checkbox" name = "tab_checkbox" class="urlList" value=';

  for (var j= 0; j< windows.length; j++){
    winid = windows[j].id+"win";
    d1.insertAdjacentHTML('beforeend','<div id='+winid+'>'+label+'@'+winid+'@><a href=# id='+j+'winbutton> Windows '+j+'</button></label><br>');    
    var d2 = document.getElementById(winid);

    var tabs = windows[j].tabs;
    for(var i=0;i<tabs.length;i++) {
      tabid = tabs[i].id +'tab';
      var favIcon = '<img height="16" width="16" hspace="8" src='+tabs[i].favIconUrl+'>  ';
      var atag = '<a href='+tabs[i].url+'>'+tabs[i].title+'</a>';
      d2.insertAdjacentHTML('beforeend','<span id='+tabid+'>'+label+'@'+tabid+'@>'+favIcon+atag+'</label><br></span>');
     }

     d1.insertAdjacentHTML('beforeend','</div>');
     document.getElementById(j+"winbutton").onclick = function(){  alert("open window "+ this.id) };
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
  d1.insertAdjacentHTML('afterend', '<input type="checkbox" id= '+'@'+key+'@'+' name = "savedsession">&nbsp &nbsp');
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
      d1.insertAdjacentHTML('afterend', '<input type="checkbox" id= '+'@'+key+'@'+' name = "savedsession">&nbsp &nbsp');
      createButton("SavedSession",key,key);

      var but = document.getElementById(key);
      but.addEventListener('click',function(){myfunc(this.id);})    
    }
    else {
      var r = confirm("Do you want to merge???");
      if(r==true) {
        var finalwindows = JSON.parse(localStorage.getItem(key));
        var newwindows = finalwindows.concat(windows);
        var item = JSON.stringify(newwindows);
        localStorage.setItem(key, item);
        alert("Merge Done");
      }
    }
  }
}
/*
* remove tabs that are selected using checkboxes from the main HTML page 
*/
function removeCheckedboxes(){
  var checkedboxes=document.querySelectorAll('input[class="urlList"]:checked');
  for (var i=0; i<checkedboxes.length; i++){
   var value = checkedboxes[i].value;
   value.substr(1,value.size-2);console.log(value);
   var intvalue = parseInt(value);
   var element = document.getElementById(value);
   //element.parentNode.removeChild(element);
   if(value.indexOf("win") !=-1)
    sessionWin.splice(intvalue, 1);
    /*else if(value.indexOf("tab") != -1){
    for (var j=0; j<sessionWin.length; j++) {
      var tabs = sessionWin[j].tabs;console.log("foung");
      for (var i = 0; i < tabs.length; i++) {console.log("foung tabsjgdsfjh");
        if(tabs[i].id == intvalue) {
            console.log("foung tabsjgdsfjh");tabs.splice(i,1);
            break; break;
          }
        };
      }
    }*/

  }
  writeTabs(sessionWin);
}


function remove(){

  var checkboxes = document.getElementsByName("tab_checkbox");
 k=0;
currentWindows = sessionWin;
  for(i=0;i<currentWindows.length;i++)
  {
    var tabs = currentWindows[i].tabs;
    k++;
    for(j=0;j<tabs.length;)//j++)
    {
      if(tabs[j].title!="tAB++" && tabs[j].title!="New Tab")
      {
      if(checkboxes[k].checked)
      {
        currentWindows[i].tabs.splice(j,1);
      }
      else
      {
        j++;
      }
      k++;
    }
    else
    {
      j++;
    }
  }
}
    writeTabs(currentWindows);

    if(currentSessionID!=-1)
    {
      key = currentSessionID;
      var item = JSON.stringify(currentWindows);
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
function openWindow(windows){

  for(i=0;i <= windows.length;i++){
   var tabs = windows[i].tabs;
   var arr = new Array();
   var len = 0;
   for(j=0; j<tabs.length;j++){
       arr[len] = tabs[j].url;
       len++;
     }
   }
   if(i!=0)
   chrome.windows.create({url:arr});
    else
      for(k=0; k<len; k++)
        chrome.tabs.create({url:arr[k]});
}


function mergeSession(display){
  var checkboxes = document.getElementsByName("savedsession");
  
  var r = false, key = "nokey";
  if( display == false) {
  key = prompt("Enter Name of the merged session: ");
  r = confirm("Do you want the merged sessions to be deleted?");
}
  if(key!=null && key!= "") {
  var i =0,flag=0 ,finalwindows = new Array();
  for(i=0;i<checkboxes.length;i++){
   if(checkboxes[i].checked){
     flag=1;
     var iiid = checkboxes[i].id;
     var size = iiid.length;
     var iid = iiid.substr(1,size-2);
     var windows = JSON.parse(localStorage.getItem(iid));
     finalwindows = finalwindows.concat(windows);
     if(r==true)
      localStorage.removeItem(iid);
   } 
  }

  if(i<2) {
    alert("You must check atleast one checkbox");
    return;
  }

  else {
    update_sessionWin(finalwindows);
    if(display == true) {
      writeTabs(sessionWin);
      alert("Please check merged session");
      return;
    }
    var item = JSON.stringify(sessionWin);
    localStorage.setItem(key, item);
    var d1=document.getElementById('SavedSession');
    d1.insertAdjacentHTML('afterend', '<input type="checkbox" id= '+'@'+key+'@'+' name = "savedsession">&nbsp &nbsp');
    createButton("SavedSession",key,key);

    var but = document.getElementById(key);
    but.addEventListener('click',function(){myfunc(this.id);}) 
   location.reload();
  }
  }
}
/*
 * delete sessions from localstorage and write it to main HTML 
*/

function deleteSession()
{
  var checkboxes = document.getElementsByName("savedsession");

   var flag=0;
   for(i=0;i<checkboxes.length;i++){
     if(checkboxes[i].checked){
       flag=1;
       var iiid = checkboxes[i].id;
       var size = iiid.length;
       var iid = iiid.substr(1,size-2);
        localStorage.removeItem(iid);  
    } 
   }
   location.reload();
}

/*
 * retrievs session from localstorage and write it to main HTML 
*/
function myfunc(iid) {
   var tabs = JSON.parse(localStorage.getItem(iid));
   currentWindows = tabs;
   currentSessionID = iid;
   updateTabsNumber(0);
   writeTabs(tabs);
}

document.getElementById("Save").onclick = function () { save(sessionWin); };
document.getElementById("Delete").onclick = function() { removeCheckedboxes(); };
document.getElementById("Restore").onclick = function() { openWindow();};
document.getElementById("currentSession").onclick = function(){getAllWindows(writeTabs);};
document.getElementById("Merge").onclick = function(){mergeSession(false);};
document.getElementById("Display").onclick = function(){mergeSession(true);};
document.getElementById("Delbutton").onclick = function(){deleteSession();};

getAllWindows(writeTabs);
printAll();