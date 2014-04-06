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
  if(currentSessionID == -1)
  var key = prompt("Enter New Session Name","Default");
  else var key = currentSessionID;
  if(key!=null && key != "") {
    var flag = localStorage[key];
    //if(!(key in localstorage)) {
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
      var r = confirm("Do you want to update "+key+" session???");
      if(r==true) {
        //var finalwindows = JSON.parse(localStorage.getItem(key));
        //update_sessionWin(finalwindows.concat(windows));
        var item = JSON.stringify(sessionWin);
        localStorage.setItem(key, item);
        alert("Update Done");
      }
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

function getAllSavedSessions(){
  var session = new Array();
  for (var key in localStorage){
   var item = JSON.parse(localStorage.getItem(key));
   session.push(item);
  }
  return session;
}
function display(hashtags){
  var session = getAllSavedSessions();
  var windows = new Array();
  windows.push(new Window(0,null));
  //alert("hello")
  for(var k = 0; k < session.length; k++) {
    var win = session[k];//alert("hellobvvvvv")
  for (var i = 0; i < win.length; i++) {
    var tabs = win[i].tabs;
    for (var j = 0; j < tabs.length; j++) {
      for (var l = 0; l < hashtags.length; l++) {
        if(hashtags[l].indexOf('#') > -1)
        if(tabs[j].hashtags.indexOf(hashtags[l]) > -1) {
        //alert(k + "-"+i+"-"+j+tabs[j].title);
        windows[0].pushtab(tabs[j]);
      } 
      };     
    };
  };
};
   update_sessionWin(windows);
   writeTabs(sessionWin);
}
/*
 * retrievs session from localstorage and write it to main HTML 
*/
function myfunc(iid) {
   var tabs = JSON.parse(localStorage.getItem(iid));
   update_sessionWin(tabs);
   currentSessionID = iid;
   updateTabsNumber(0);
   document.getElementById("Save").innerHTML = "Update";
   writeTabs(tabs);
}
document.getElementById("Save").onclick = function () { save(sessionWin); };
document.getElementById("Merge").onclick = function(){mergeSession();};
document.getElementById("Delbutton").onclick = function(){deleteSession();};
printAll();