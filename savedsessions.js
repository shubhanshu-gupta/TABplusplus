/*
 * display all stored sessions from local storage to main HTML page.
 * assign the onclick function for these stores sessions
* checkbox infront of Saved sessions have id @key@ and class savedsession
*/
function printAll()
{
  for(i=0; i<localStorage.length;i++)
  {
    var key_without_space = localStorage.key(i);
    var key_with_space = key_without_space.replace(/_/g," ");
//    document.write('<button class="btn btn-default btn-lg" id='+key+'>'+key+'</button><br>');
    // console.log(key_without_space);
    if(key_without_space.length>15){
        var str = key_without_space.substr(0,10);
        
        if(str=="Last_Sync_"){
        // console.log("here");
        // UnSavedSessions[UnSavedSessionNo] = key_without_space;
        queue.push(key_without_space);
        var d1 = document.getElementById('UnSavedSession');
        // UnSavedSessionNo++;
        d1.insertAdjacentHTML('afterend', '<button class="btn btn-primary btn-lg" id='+key_without_space+' style="width:250px;height:50px;">'+key_with_space+'</button><br>');
        var but = document.getElementById(key_without_space);
        but.addEventListener('click',function() {SessionClickListener(this.id);});
      }
    }

    else{


        // var key = localStorage.key(i);
        // var d1=document.getElementById('SavedSession');
        // d1.insertAdjacentHTML('afterend', '<input type="checkbox" id= @'+key+'@ class="savedsession">&nbsp &nbsp');
        // createButton("SavedSession",key,key);

        // var but = document.getElementById(key);
        // but.addEventListener('click',function(){myfunc(this.id);})
  

      var d1=document.getElementById('SavedSession');
      var key1 = "@"+key_without_space+"@";
      d1.insertAdjacentHTML('afterend', '<input type="checkbox" id= '+key1+' name = "buttonbox">&nbsp &nbsp<button class="btn btn-primary btn-lg" id='+key_without_space+' style="width:250px;height:50px;">'+key_with_space+'</button><br>');
      var but = document.getElementById(key_without_space);
      but.addEventListener('click',function() {SessionClickListener(this.id);});
     }
  }
}
/*
* save the windows to local storage 
* key is provided by user and is used both as session name and key in localstorage
* checkbox infront of Saved sessions have id @key@ and class savedsession
*/
function save(windows){
  var storage = localStorage;
  var key_with_space, key_without_space;
  if(currentSessionID == -1)
    key_with_space = prompt("Enter New Session Name","Default");
  else key_with_space = currentSessionID;

  key_without_space = key_with_space.replace(/ /g,"_");

  if(key_without_space!=null && key_without_space != "") {
    var flag = localStorage[key_without_space];
    //if(!(key in localstorage)) {
    if(flag==undefined) {         // The key is new and has not been used
      var item = JSON.stringify(windows);
      storage.setItem(key_without_space, item);
      alert(key_without_space+' Session Saved');
      var d1=document.getElementById('SavedSession');
      d1.insertAdjacentHTML('afterend', '<input type="checkbox" id= @'+key_without_space+'@'+' class="savedsession" >&nbsp &nbsp');
      createButton("SavedSession",key_without_space,key_with_space);

      var but = document.getElementById(key_without_space);
      but.addEventListener('click',function(){SessionClickListener(this.id);})    
    }
    else {
      var r = confirm("Do you want to update "+key_with_space+" session???");
      if(r==true) {
        //var finalwindows = JSON.parse(localStorage.getItem(key));
        //update_sessionWin(finalwindows.concat(windows));
        var item = JSON.stringify(sessionWin);
        localStorage.setItem(key_without_space, item);
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
  var key_with_space = prompt("Enter Name of the merged session: ");
  r = confirm("Do you want the merged sessions to be deleted?");
  var key_without_space = key_with_space.replace(/ /g,"_");

  if(key_without_space!=null && key_without_space!= "") {
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
    localStorage.setItem(key_without_space, item);
    var d1=document.getElementById('SavedSession');
    d1.insertAdjacentHTML('afterend', '<input type="checkbox" id= '+'@'+key_without_space+'@'+' class="savedsession">&nbsp &nbsp');
    createButton("SavedSession",key_without_space,key_with_space);

    var but = document.getElementById(key_without_space);
    but.addEventListener('click',function(){SessionClickListener(this.id);}) 
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
  session.push(sessionWin);
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
function SessionClickListener(iid) {
   var tabs = JSON.parse(localStorage.getItem(iid));
   // update_sessionWin(tabs);
   currentSessionID = iid;
   updateTabsNumber(0);
   document.getElementById("Save").innerHTML = "Update";
   writeTabs(tabs);
}
document.getElementById("Save").onclick = function () { save(sessionWin); };
document.getElementById("Merge").onclick = function(){mergeSession();};
document.getElementById("Delbutton").onclick = function(){deleteSession();};
printAll();