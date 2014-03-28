
/*
 * returns all open windows to callback function
*/
function getAllWindows(callback){
          chrome.windows.getAll( {populate : true}, function (windows){
            callback(windows);
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

  for (var j= 0; j< windows.length; j++){
    var label = '<label style="margin: 1em 0 0 0;"><input type="checkbox" class="urlList" value=';
    winid = "win" + j;
    d1.insertAdjacentHTML('beforeend', '<div id='+winid+'>'+label+winid+'> Windows '+j+'</label></div>');    

    var tabs = windows[j].tabs;
    tabid = winid;
    for(var i=0;i<tabs.length;i++) {
      tabid += i;
      var atag = '<a href='+tabs[i].url+'>'+tabs[i].title+'</a>';
      d1.insertAdjacentHTML('beforeend','<span id='+tabid+'>'+label+tabid+'>'+atag+'</label><br></span>');
     }
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
function openWindow(currentwindows){

  for(i=0;i<currentWindows.length;i++){
   var tabs = currentWindows[i].tabs;
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