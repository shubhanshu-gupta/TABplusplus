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
    var key_with_space = key_without_space.replace(/_/g," ");    //replace spaces with underscores

    if(key_without_space.length>15){
        var str = key_without_space.substr(0,10);
        
        if(str=="Last_Sync_"){        // If clause is for unsaved sessions          
          UnSavedSessions[UnSavedSessionNo] = key_without_space;
          var d1 = document.getElementById('UnSavedSession');
          UnSavedSessionNo++;
          d1.insertAdjacentHTML('afterend', '<button class="btn btn-primary btn-lg" id='+key_without_space+' style="width:250px;height:50px;">'+key_with_space+'</button><br>');
          var but = document.getElementById(key_without_space);
          but.addEventListener('click',function() {SessionClickListener(this.id);});
        }
    }

    else{                             // Else clause is for saved sessions
      var d1=document.getElementById('SavedSession');
      var checkbox_key = "@"+key_without_space+"@";
      d1.insertAdjacentHTML('afterend', '<input type="checkbox" id= '+checkbox_key+' name = "buttonbox">&nbsp &nbsp<button class="btn btn-primary btn-lg" id='+key_without_space+' style="width:250px;height:50px;">'+key_with_space+'</button><br>');
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
  var key_with_space;
  if(currentSessionID == -1)
    key_with_space = prompt("Enter New Session Name","Default");
  else 
    key_with_space = currentSessionID;
  var key_without_space = key_with_space.replace(/ /g," ");

  if(key_without_space!=null && key_without_space != "") {
    var flag = localStorage[key_without_space];
    if(flag==undefined) {         // The key is new and has not been used
      var item = JSON.stringify(windows);
      storage.setItem(key_without_space, item);
      alert(key_with_space+' Session Saved');
      var d1=document.getElementById('SavedSession');
      d1.insertAdjacentHTML('afterend', '<input type="checkbox" id= @'+key_without_space+'@'+' class="savedsession" >&nbsp &nbsp');
      createButton("SavedSession",key_without_space,key_with_space);

      var but = document.getElementById(key_without_space);
      but.addEventListener('click',function(){SessionClickListener(this.id);})    
    }
    else {                        // The key is used
      var r = confirm("Do you want to update "+key_with_space+" session???");
      if(r==true) {
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
  var r = false, key_with_space = "nokey";
  key_with_space = prompt("Enter Name of the merged session: ");
  var key_without_space = key_with_space.replace(/ /g," ");

  r = confirm("Do you want the merged sessions to be deleted?");

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

/*
 * retrievs session from localstorage and write it to main HTML 
*/
function SessionClickListener(iid) {
   var tabs = JSON.parse(localStorage.getItem(iid));
   update_sessionWin(tabs);
   currentSessionID = iid;
   updateTabsNumber(0);
   writeTabs(tabs);
}
document.getElementById("Save").onclick = function () { save(sessionWin); };
document.getElementById("Merge").onclick = function(){mergeSession();};
document.getElementById("Delbutton").onclick = function(){deleteSession();};
printAll();