var d1=document.getElementById('t2');
function getAllWindows(callback){
          chrome.windows.getAll( {populate : true}, function (windows){
            callback(windows);
          });
}
function writeTabs (windows) {
      //chrome.tabs.query({'active': false, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(tabs){
      	//var d=document.getElementById('t2');
      	//d.insertAdjacentHTML('afterbegin','<li id="0">'+tabs[0].title+'</li>');
        for (var j= 0; j< windows.length; j++){
          var inputsyntax = '<br><label><br><input type="checkbox" class="urlList" value=';
          d1.insertAdjacentHTML('beforeend', '<div >'+inputsyntax+-1+'>Windows '+j+'</label><br></div>');
        var tabs = windows[j].tabs;
      	for(var i=0;i<tabs.length;i++)
         {
         	d1.insertAdjacentHTML('beforeend', '<span id='+i+'>'+inputsyntax+i+'><a href='+tabs[i].url+'>'+tabs[i].title+'</a>'+'</label><br></span>');
         }
          updateTabsNumber(tabs.length);
        }                             
}

function save(windows){
  var storage = localStorage;
  var key = prompt("Enter New Session Name","Zero");
  var item = JSON.stringify(windows);
  storage.setItem(key, item);
  alert(key+' Session Saved');
}
function remove(){
  var checkedhobbies=document.querySelectorAll('input[class="urlList"]:checked')
  for (var i=0; i<checkedhobbies.length; i++){
   var value = checkedhobbies[i].value;
   var selected = document.getElementById(value);
   selected.parentNode.removeChild(selected);
  }
  updateTabsNumber(-1*checkedhobbies.length);
}

function updateTabsNumber(length){

          var d2=document.getElementById('number');
          var temp = parseInt(d2.innerHTML);
          d2.innerHTML = length + temp;
}
getAllWindows(writeTabs);
document.getElementById("Save").onclick = function () { getAllWindows(save); };
document.getElementById("Delete").onclick = remove//function () { alert('hello!'); };