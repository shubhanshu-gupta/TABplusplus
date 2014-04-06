
/*
 * returns all open windows to callback function
*/
function getAllWindows(callback){
  chrome.windows.getAll( {populate : true}, function (windows){
    update_sessionWin(windows);
    currentSessionID = -1;
    document.getElementById("Save").innerHTML = "Save";
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
  chrome.tabs.query({windowId:chrome.windows.WINDOW_ID_CURRENT},function(tabs){

 for(i=0;i<tabs.length;i++){
    if(tabs[i].url == url){
      chrome.tabs.update(tabs[i].id,{highlighted:true});
    return;
    }
  }
  //if(flag==0)
    chrome.tabs.create({url: url});
  });
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
  alert(tab.hashtags); 
    var value = prompt("Please Enter " + type);
    if(value == null || value == "") return;

    if(type == "hash") {
      var hashtags = value.split(" ");
      for (var i = 0; i < hashtags.length; i++) {
        if(hashtags[i].indexOf('#') > -1){
        tab.pushHashTags(hashtags[i]);
        updateAllHashtags(hashtags[i], new Tabposition(currentSessionID, winno, tab.id));
        
        }
        else alert("Error Please enter # in hash tags");
      };
    }
    else if (type == "annotation"){
      //alert(tab.annotation);
      var annotation = value;
      tab.pushAnnotation(annotation);
      alert(tab.annotation);
    }
    
  }
 }
function searchall(text){
  var hashtags;
  hashtags = text.split(" ");
  if(hashtags.length != undefined){
    display(hashtags)
    for (var i = 0; i < hashtags.length; i++) {
      /*if( hashtags[i] in allHashtags ){
        var h = allHashtags[hashtags[i]]      }*/
        if(hashtags[i].indexOf('#') > -1)
          display(hashtags[i])
    };
  }
}


document.getElementById("Save").onclick = function () { save(sessionWin); };
document.getElementById("Delete").onclick = function() { removeCheckedboxes(); };
document.getElementById("Restore").onclick = function() { openWindow(sessionWin , -1);};
document.getElementById("currentSession").onclick = function(){getAllWindows(writeTabs);};
document.getElementById("Search").onclick = function() { searchall(document.getElementById("searchtext").value);}
getAllWindows(writeTabs);