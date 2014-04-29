/*
 * display all stored sessions from local storage to main HTML page.
 * assign the onclick function for these stores sessions
* checkbox infront of Saved sessions have id @key@ and class savedsession
*/
function printAll()
{

  document.getElementById("savedsession_heading").innerHTML = "Saved Sessions in root";
  document.getElementById('SavedSession').parentNode.innerHTML = '<ul class="list-group" id="SavedSession"></ul>';
  document.getElementById('UnSavedSession').parentNode.innerHTML = '<ul class="list-group" id="UnSavedSession"></ul>';
  document.getElementById('SavedFolders').parentNode.innerHTML = '<ul class="list-group" id="SavedFolders"></ul>';

  for(i=0; i<localStorage.length;i++)
  {
    var key_without_space = localStorage.key(i);
    var key_with_space = key_without_space.replace(/_/g," ");
    var str = key_without_space.substr(0,10);
        
        if(str=="Last_Sync_"){

        queue.push(key_without_space);
        var d1 = document.getElementById('UnSavedSession');
        // UnSavedSessionNo++;
        d1.insertAdjacentHTML('afterend', '<button class="btn btn-primary btn-lg" id='+key_without_space+' style="width:250px;height:50px; background: #A40017; padding: 10px 20px 10px 20px;  border-radius: 0px; outline-color: white; border: solid #000000 0px;">'+key_with_space+'</button><br>');
        var but = document.getElementById(key_without_space);
        but.addEventListener('click',function() {SessionClickListener(this.id);});
      }

    else if(str=="_Folders__"){
        var d1 = document.getElementById('SavedFolders');
        // UnSavedSessionNo++;
        var key1 = "@"+key_without_space+"@";
        var key2 = key_with_space.slice(10);
        //var key3 = key.replace(/_/g,' ');
        d1.insertAdjacentHTML('afterend', '<input type="checkbox" class="folder" id= '+key1+'>&nbsp &nbsp<button class="btn btn-primary btn-lg" id='+key_without_space+' style="width:250px;height:50px; background: #A40017; padding: 10px 20px 10px 20px;  border-radius: 0px; outline-color: white; border: solid #000000 0px;">'+key2+'</button><br>');
        var but = document.getElementById(key_without_space);
        but.addEventListener('click',function() {showFolder(this.id);} );
      }
    else if(str=="_Parent__@"){

        if(key_without_space.indexOf("@root@") == -1) continue;
      var d1=document.getElementById('SavedSession');
      var key1 = "@"+key_without_space+"@";
        var key2 = key_without_space.substr( key_without_space.lastIndexOf("@")+1);
        var key3 = key2.replace(/_/g,' ');
      d1.insertAdjacentHTML('afterend', '<input type="checkbox" class="savedsession" id= '+key1+' name = "buttonbox">&nbsp &nbsp<button class="btn btn-primary btn-lg" id='+key_without_space+' style="width:230px;height:50px; background: #A40017; padding: 10px 20px 10px 20px;  border-radius: 0px; outline-color: white; border: solid #000000 0px;">'+key3+'</button><br>');
      var but = document.getElementById(key_without_space);
      but.addEventListener('click',function() {SessionClickListener(this.id);});
      }
  }
}

function getAllSynced(windows){
  
  chrome.storage.sync.get(null,function(obj){
    var allkeys = Object.keys(obj);
    var size = allkeys.length;
    console.log("sync "+size);
    for(i=0;i<size;i++){
      (function(i){
        var key = allkeys[i];
      // getValue(key,save);
      console.log(i);
      chrome.storage.sync.get(key,function(obj){
        var item = obj[key];
        localStorage.setItem(key,item);
        console.log("in getAllSynced "+key);
        
      });
    })(i);
    }
  });
}

function save(windows){
  
  var key_with_space, key_without_space;
 
     // console.log("-1");
     $("#savecallModal").remove();
     $( "body" ).append(getsavemodal());

      document.getElementById("ptextall").innerHTML = "Enter New Session Name";
       $("#savecallModal").modal('show');

    $(".savesubmit").click(function(){gettingName(windows);});

}

function saveCont(key_with_space,windows){
  var storage = localStorage;
  key_without_space = "_Parent__@" + currentFolder.replace(/ /g,"_") + "@"+ key_with_space.replace(/ /g,"_");

  if(key_without_space!=null && key_without_space != "") {
    var flag = localStorage[key_without_space];
    //if(!(key in localstorage)) {
    if(flag==undefined) {
    // console.log("undefined");         // The key is new and has not been used
      var item = JSON.stringify(windows);
      
      var jsonfile = {};
      jsonfile[key_without_space] = item;
      chrome.storage.sync.set(jsonfile,function(){
        console.log(key_without_space + " Synced");
      });

      // chrome.storage.sync.get(key_without_space,function(obj){
      //   var windows = JSON.parse(obj[key_without_space]);
      //   console.log("getting saved "+windows.length+" " + key_without_space);
      // });

      storage.setItem(key_without_space, item);
      updateFolder(key_without_space,1);
      showFolder("_Folders__"+ currentFolder);   
    }
    else {
      $("#savecallModal").on('hidden.bs.modal',function(){
      document.getElementById("confirmbody").innerHTML = "Do you want to update "+key_with_space+" session?";
      $("#updateconfirm").modal('show');
      });
      $("#confirmbutton").click(function(){
        
        var item = JSON.stringify(sessionWin);
        var jsonfile = {};
        jsonfile[key_without_space] = item;
        chrome.storage.sync.set(jsonfile,function(){
          console.log(key + " Synced");
        });

        localStorage.setItem(key_without_space, item);
      });
      
    }
  }
}


function gettingName(windows)
{
  console.log("getting");
  var k = $("#keytext").val();
  saveCont(k,windows);
 
 // saveCont(k);
}


/*
 * merge two or more saved sessions 
 * option to delete the sessions that are being merged 
 */
function mergeSession() {
 
var checkboxes =  document.querySelectorAll('input[class="savedsession"]:checked');

  if(checkboxes.length < 2) {
    //alert(checkboxes.length+"You must check atleast two checkbox");
    document.getElementById("chromealert").innerHTML = "You must check atleast 2 checkboxes" ;
     $("#myModal").modal('show');
    return;
  }
  var r = false, key = "nokey";
   var key_with_space;
  $("#mergemodal").remove();
  
  $( "body" ).append(getmergemodal());
   document.getElementById("mergeptextall").innerHTML = "Enter Name of the merged session:";
   document.getElementById("checkboxformerge").innerHTML = '<br><input type ="checkbox" id = "chtype">Delete merged sessions';
   $("#mergemodal").modal('show');

$("#mergesubmit").click(function(){
     // console.log("suckit babay");

     var chk = document.getElementById("chtype") ;
     key_with_space = $("#mergekeytext").val();
     if(chk.checked){
        r = true;
        mergeSessioncont(key_with_space,r);
        }
     else{
         
         r = false;

         mergeSessioncont(key_with_space,r);
         }
          //mergeSessioncont(key_with_space,r);
      
   });
  
}

function mergeSessioncont(key_with_space,r)
{  
  var checkboxes =  document.querySelectorAll('input[class="savedsession"]:checked');

  var key_without_space = "_Parent__@" + currentFolder.replace(/ /g,"_") + "@"+ key_with_space.replace(/ /g,"_");

  if(key_without_space!=null && key_without_space!= "") {
  var i =0,flag=0 ,finalwindows = new Array();
  for(i=0;i<checkboxes.length;i++){
     flag=1;
     var iiid = checkboxes[i].id;
     var size = iiid.length;
     var iid = iiid.substr(1,size-2);
     var windows = JSON.parse(localStorage.getItem(iid));
     finalwindows = finalwindows.concat(windows);
     if(r==true){
      chrome.storage.sync.remove(iid);
      localStorage.removeItem(iid);
      updateFolder(iid,-1);
    }
  }
    update_sessionWin(finalwindows);
    var item = JSON.stringify(sessionWin);
    var jsonfile = {};
    jsonfile[key_without_space] = item;
    chrome.storage.sync.set(jsonfile,function(){
      console.log(key + " Synced");
    });

    localStorage.setItem(key_without_space, item);
    updateFolder(key_without_space,1);

    /*var d1=document.getElementById('SavedSession');
    d1.insertAdjacentHTML('afterend', '<input type="checkbox" id= '+'@'+key_without_space+'@'+' class="savedsession">&nbsp &nbsp');
    createButton("SavedSession",key_without_space,key_with_space);
    
    var but = document.getElementById(key_without_space);
    but.addEventListener('click',function(){SessionClickListener(this.id);}) 
    //location.reload();*/
  printAll();
  }
  else {
   
  document.getElementById("chromealert").innerHTML = "Please enter a valid key" ;
     $("#myModal").modal('show');
      }

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
       chrome.storage.sync.remove(iid);
       // var win = JSON.parse(localStorage.getItem(iid));
       // stack.push(win);
       // stack.push(iid);
       // stack.push(1);

        localStorage.removeItem(iid); 
        updateFolder(iid,-1);  
   }
    showFolder("_Folders__"+currentFolder);
    getAllWindows(writeTabs);
}

/* alert to ask if user if sure and lets disable undo in this*/
function deleteFolder(){
	var r = false ;
  $("#folderdeletemodal").remove();

  $('body').append(getfolderdelete());
  $("#folderdeletemodal").modal('show');
  $("#folderdeletesubmit").click(function(){

  var checkboxes =  document.querySelectorAll('input[class="folder"]:checked');
  console.log(checkboxes.length);
   for(i=0;i<checkboxes.length;i++){

       var iiid = checkboxes[i].id;
       var size = iiid.length;
       var iid = iiid.substr(1,size-2);
       var folder = JSON.parse(localStorage.getItem(iid));
       /*stack.push(folder);
       stack.push(iid);
       stack.push(3);*/
       for (var j = 0; j < folder.id.length; j++) {
        //console.log(folder.id[j])
        chrome.storage.sync.remove(folder.id[j]);
         localStorage.removeItem(folder.id[j]);
       };
       chrome.storage.sync.remove(iid);
       localStorage.removeItem(iid);   
   }
    currentFolder = "root";
    printAll();
});
}


function getAllSavedSessions(){
  var session = new Array();
  for(i=0; i<localStorage.length;i++)
  {
    var key = localStorage.key(i);
    console.log("all "+key)
    var str = key.substr(0,10);
    if(str!="Last_Sync_" && str!="_Folders__"){
   var item = JSON.parse(localStorage.getItem(key));
   session.push(item);
 }
  }
  session.push(sessionWin);
  return session;
}

function display(hash){

  var hashtags = new Array();
  if(hash instanceof Array) {
  for (var m = 0; m < hash.length; m++) {
  if(hash[m].indexOf('#') == -1) continue;
  hashtags.push(hash[m]);
  //console.log(hashtags);
  };}
  else 
    hashtags.push("#"+hash.substr(0,hash.length - 4));
  var found = "";
  var session = getAllSavedSessions();
  var windows = new Array();
  windows.push(new Window(0,null));
  for(var k = 0; k < session.length; k++) {
    var win = session[k];
  for (var i = 0; i < win.length; i++) {
    var tabs = win[i].tabs;
    for (var j = 0; j < tabs.length; j++) {
      for (var l = 0; l < hashtags.length; l++) {
          var tags = tabs[j].hashtags.split(' ');
          for(var tg=0; tg<tags.length; tg++) {
            if(tags[tg]==hashtags[l]) {
              windows[0].pushtab(tabs[j]);
              if(found.indexOf(hashtags[l]) == -1)
                found += hashtags[l] + " ";
            }
          }        
      };     
    };
  };
};

   update_sessionWin(windows);
   writeTabs(sessionWin);
  document.getElementById("midpane").innerHTML = found + "&nbsp";
}
/*
 * retrievs session from localstorage and write it to main HTML 
*/
function SessionClickListener(iid) {
  console.log(iid);
   var tabs = JSON.parse(localStorage.getItem(iid));
   console.log("session123 "+tabs.length);
   update_sessionWin(tabs);
   currentSessionID = iid;
   updateTabsNumber(0);
   var d1 = document.getElementById("midpane");
   d1.innerHTML = iid.substr( iid.lastIndexOf("@")+1) + "&nbsp";
   writeTabs(sessionWin);
}

function saveFolder(){
  var checkboxes =  document.querySelectorAll('input[class="savedsession"]:checked');
   var r = false;

  $("#savefoldermodal").remove();
  
  $("body").append(getsavefoldermodal());
   document.getElementById("savefoldertextall").innerHTML = "Enter Name of the Folder:";
   document.getElementById("checkboxforsavefolder").innerHTML = '<br><input type ="checkbox" id = "savefolderchtype">Delete selected sessions';
   $("#savefoldermodal").modal('show');

  //var key_with_space = prompt("Enter Name of the Folder: ");
  //r = confirm("Do you want the selected sessions to be deleted?");

  $("#savefoldersubmit").click(function(){

     var chk = document.getElementById("savefolderchtype") ;
     key_with_space = $("#savefolderkeytext").val();
     if(chk.checked){
        r = true;
        }
     else{
         r = false;
         }
  currentFolder = key_with_space;
  var key_without_space = '_Folders__' + key_with_space.replace(/ /g,"_");
  var folder = JSON.parse(localStorage.getItem(key_without_space));
  if(folder == null)
  folder = new Session(null);

   for(i=0;i<checkboxes.length;i++){
       var iiid = checkboxes[i].id;
       var size = iiid.length;
       var iid = iiid.substr(1,size-2);
        var windows = localStorage.getItem(iid);
        var name = iid.substr( iid.lastIndexOf("@")+1);
        var id = "_Parent__@" + key_with_space.replace(/ /g,"_") + "@"+ name.replace(/ /g,"_");
        console.log(id);
        if(folder.id.indexOf(id) == -1){
          var jsonfile = {};
          jsonfile[id] = windows;
          chrome.storage.sync.set(jsonfile,function(){
            console.log(id + " Synced");
          });
          folder.id.push(id); 
          localStorage.setItem(id, windows); 
        }  
   }
   if(folder.id.length == undefined) {
    //alert("Error"); 
    document.getElementById("chromealert").innerHTML = "Error" ;
     $("#myModal").modal('show');
    return;
   }
   var item = JSON.stringify(folder);
   var jsonfile = {};
   jsonfile[key_without_space] = item;
   chrome.storage.sync.set(jsonfile,function(){
        console.log(key_without_space + " Synced");
   });

    localStorage.setItem(key_without_space, item);
    if(r == true)
    deleteSession();
    else {
    	printAll();
    	showFolder("_Folders__"+key_with_space);
    }
  });
  
}

function showFolder(id){
  currentFolder = id.substr(10);
  if(currentFolder == "root") {
  	printAll();
  	return;
  }
  var folder = JSON.parse(localStorage.getItem(id));
 document.getElementById('SavedSession').parentNode.innerHTML = '<ul class="list-group" id="SavedSession"></ul>';
 var d1=document.getElementById('SavedSession');
  for (var i = 0; i < folder.id.length; i++) {
    var key_without_space = folder.id[i];
    var key_with_space = key_without_space.replace(/_/g," ");
    //alert(key_with_space);
    document.getElementById("savedsession_heading").innerHTML = "Saved Sessions in " + id.slice(10).replace(/_/g," ");
  var key1 = "@"+key_without_space+"@";
  var key2 = key_with_space.substr( key_with_space.lastIndexOf("@")+1);
  d1.insertAdjacentHTML('afterend', '<input type="checkbox" class="savedsession" id= '+key1+' name = "buttonbox">&nbsp &nbsp<button class="btn btn-primary btn-lg" id='+key_without_space+' style="width:230px;height:50px; background: #A40017; padding: 10px 20px 10px 20px;  border-radius: 0px; outline-color: white; border: solid #000000 0px;">'+key2+'</button><br>');
  var but = document.getElementById(key_without_space);
  but.addEventListener('click',function() {SessionClickListener(this.id);});
};
}
/*alert to change  34u3u3498uer8u*/
function updateFolder(iid, type){
  if(currentFolder == "root") return;
  var folder = JSON.parse(localStorage.getItem("_Folders__"+currentFolder));

  if(type == -1)
  folder.id.splice(folder.id.indexOf(iid),1);
  
  else 
  folder.id.push(iid);
      
      var jsonfile = {};
      jsonfile["_Folders__"+currentFolder] = JSON.stringify(folder);

      chrome.storage.sync.set(jsonfile,function(){
        console.log("_Folders__"+currentFolder + " Synced");
      });

      localStorage.setItem("_Folders__"+currentFolder, JSON.stringify(folder));
}

function allHashtags(){
  var session = getAllSavedSessions();
  console.log("hash "+ session.length);
  var hashtags = new Array();
  //alert("hello")
  for(var k = 0; k < session.length; k++) {
    var win = session[k];//alert("hellobvvvvv")
  for (var i = 0; i < win.length; i++) {
    var tabs = win[i].tabs;
    for (var j = 0; j < tabs.length; j++) {
      if(tabs[j].hashtags !=null){
      var temp = tabs[j].hashtags.split(" ");
      for (var l = 0; l < temp.length; l++) {
        if(temp[l].indexOf('#') > -1 && hashtags.indexOf(temp[l]) == -1)
        hashtags.push(temp[l]);
        };
        }
      };
    };
  };
document.getElementById("SavedHashTag").parentNode.innerHTML = '<ul id = "SavedHashTag" class = "list-group">';
var d1 = document.getElementById("SavedHashTag");
for (var i = 0; i < hashtags.length; i++) {
  var iid = hashtags[i].substr(1,hashtags[i].length-1);
  d1.insertAdjacentHTML('afterend', '<a style="color:#c20017" href=# id='+iid+ '@url >'+ hashtags[i] + '</a>   ');
  document.getElementById(iid+'@url').onclick = function(){ display(this.id);};
};
}

document.getElementById("Save").onclick = function () { save(sessionWin); };
document.getElementById("Merge").onclick = function(){mergeSession();};
document.getElementById("Delbutton").onclick = function(){deleteSession();};
document.getElementById("savefolder").onclick = function() { saveFolder(); };
document.getElementById("DelFolder").onclick = function() { deleteFolder(); };
document.getElementById("Root").onclick = function() { printAll(); };
// savan();
getAllSynced();
printAll();
allHashtags();