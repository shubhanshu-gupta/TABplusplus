var d1=document.getElementById('t2');
var currentSessionID = -1;
function getAllWindows(callback){
          chrome.windows.getAll( {populate : true}, function (windows){
            currentSessionID = -1;
            callback(windows);
          });
}
function writeTabs (windows) {
      //chrome.tabs.query({'active': false, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(tabs){
        //var d=document.getElementById('t2');
        //d.insertAdjacentHTML('afterbegin','<li id="0">'+tabs[0].title+'</li>');

        currentWindows = windows;
        var sum=0, minus=0;
        for (var j= 0; j< windows.length; j++){
          var inputsyntax = '<br><label><br><input type="checkbox" name = "tab_checkbox" class="urlList" value=';

          if(j==0)
          {
            var s1 = '<div >'+inputsyntax+-1+'>Windows '+j+'</label><br></div>';
            d1.innerHTML = s1;
          }
          else
          {
          d1.insertAdjacentHTML('beforeend', '<div >'+inputsyntax+-1+'>Windows '+j+'</label><br></div>');    
          }

        
        var tabs = windows[j].tabs;
        for(var i=0;i<tabs.length;i++)
         {
          if(tabs[i].title=="tAB++" || tabs[i].title=="New Tab")
          {
            minus++;
          }
          else
        {
          d1.insertAdjacentHTML('beforeend', '<span id='+i+'>'+inputsyntax+i+'><a target = "_blank" href='+tabs[i].url+'>'+tabs[i].title+'</a>'+'</label><br></span>');
        }
         }
         sum += tabs.length;
          }
          sum -= minus;
          updateTabsNumber(sum);
        
}


function printAll()
{
 // var allkeys = ""; cnt =0;

  for(i=0; i<localStorage.length;i++)
  {
    var key = localStorage.key(i);
//    document.write('<button class="btn btn-default btn-lg" id='+key+'>'+key+'</button><br>');
  var d1=document.getElementById('SavedSession');
  var key1 = "@"+key+"@";
  d1.insertAdjacentHTML('afterend', '<input type="checkbox" id= '+key1+' name = "buttonbox">&nbsp &nbsp<button class="btn btn-primary btn-lg" id='+key+' style="width:250px;height:50px;">'+key+'</button><br>');

  var but = document.getElementById(key);
  but.addEventListener('click',function(){myfunc(this.id);})

  }

}




function save(windows){
  var storage = localStorage;
  var key = prompt("Enter New Session Name","Zero");
  if(key!=null)
  {
    var flag = localStorage[key];

    if(flag==undefined)
    {
  var item = JSON.stringify(windows);
  storage.setItem(key, item);
  alert(key+' Session Saved');
  var d1=document.getElementById('SavedSession');
  var key1 = "@"+key+"@";
  d1.insertAdjacentHTML('afterend', '<input type="checkbox" id= '+key1+' name = "buttonbox">&nbsp &nbsp<button class="btn btn-primary btn-lg" id='+key+' style="width:250px;height:50px;">'+key+'</button><br>');
 // d1.insertAdjacentHTML('afterend', '<input type="checkbox" id= '+key1+' name = "buttonbox">&nbsp &nbsp<button class="btn btn-primary btn-lg" id='+key+' style="width:250px;height:50px;">'+key+'</button><br>');


 // console.log(key);


  var but = document.getElementById(key);
  but.addEventListener('click',function(){myfunc(this.id);})    
    }
    else
    {
      var r = confirm("Do you want to merge???");
      if(r==true)
      {
        var oldwindows = JSON.parse(localStorage.getItem(key));
        var newwindows = oldwindows.concat(windows);
     var item = JSON.stringify(newwindows);
     localStorage.setItem(key, item);
     alert("Merge Done");
   }
   else{
    var item = JSON.stringify(windows);  
     storage.setItem(key, item);
     alert(key+' Session Saved');
   

      }
    }
  
}
}
function remove(){

  var checkboxes = document.getElementsByName("tab_checkbox");

 k=0;

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

  // var checkedhobbies=document.querySelectorAll('input[class="urlList"]:checked')
  // for (var i=0; i<checkedhobbies.length; i++){
  //  var value = checkedhobbies[i].value;
  //  var selected = document.getElementById(value);
  //  selected.parentNode.removeChild(selected);
  // }

  // updateTabsNumber(-1*checkedhobbies.length);


function updateTabsNumber(length){

          var d2=document.getElementById('number');
          var temp = parseInt(d2.innerHTML);
          d2.innerHTML = length;// + temp;
}

function openWindow(){

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
   if(i!=0)
   {
   chrome.windows.create({url:arr});
 }
 else
 {
  for(k=0; k<len; k++)
  {
    chrome.tabs.create({url:arr[k]});
  }
 }
 }
}


function mergeSession(){
  var checkboxes = document.getElementsByName("buttonbox");
 // alert(checkboxes.length);
   var key = prompt("Enter Name of the merged session: ");

  
   //var key = "merged";
   
   if(key!=null)
   {
   var cnt = 0;
   var flag=0;
   var oldwindows = new Array();
   for(i=0;i<checkboxes.length;i++){
     if(checkboxes[i].checked){
       // cnt++;
       flag=1;
       var iiid = checkboxes[i].id;
       var size = iiid.length;
       var iid = iiid.substr(1,size-2);
       var windows = JSON.parse(localStorage.getItem(iid));
       oldwindows = oldwindows.concat(windows);
     }
     
   }

   if(flag==0)
   {
    alert("You must check atleast one checkbox");
   }
   else
   {

     var r = confirm("Do you want the merged sessions to be deleted?");
    // console.log(oldwindows.length);
   // alert(cnt);
   var item = JSON.stringify(oldwindows);
   localStorage.setItem(key, item);
   var d1=document.getElementById('SavedSession');
   // d1.insertAdjacentHTML('afterend', '<img src="cross.png" id = "@%'+key+'%@"  style="max-height: 20px; max-width: 20px;" title = "Delete Session"/> <button class="btn btn-primary btn-lg" id='+key+' style="width:260px;height:60px;" >'+key+'</button><br>');
   var key1 = "@"+key+"@";
   d1.insertAdjacentHTML('afterend', '<input type = "checkbox" id = '+key1+'name = "buttonbox" >&nbsp &nbsp<button class="btn btn-primary btn-lg" id='+key+' style="width:250px;height:50px;" >'+key+'</button><br>');

   
   var but = document.getElementById(key);
   but.addEventListener('click',function(){myfunc(this.id);})
    // alert(key);
}
    if(r==true)
{

  for(i=0;i<checkboxes.length;i++){
     if(checkboxes[i].checked){
       // cnt++;
       var iiid = checkboxes[i].id;
       var size = iiid.length;
       var iid = iiid.substr(1,size-2);
       localStorage.removeItem(iid);

     }
   }
   location.reload();
   //printAll();
}
else
{
  //Do nothing
}
}
}


function deleteSession()
{
  var checkboxes = document.getElementsByName("buttonbox");
 // alert(checkboxes.length);
 
  
   //var key = "merged";
   var cnt = 0;
   var flag=0;
   var oldwindows = new Array();
   for(i=0;i<checkboxes.length;i++){
     if(checkboxes[i].checked){
       // cnt++;
       flag=1;
       var iiid = checkboxes[i].id;
       var size = iiid.length;
       var iid = iiid.substr(1,size-2);
        localStorage.removeItem(iid);  
    }
     
   }
   location.reload();
}


getAllWindows(writeTabs);

printAll();


//The list of ClickListeners
document.getElementById("Save").onclick = function () { save(currentWindows) };
document.getElementById("Delete").onclick = function () {remove() ;};
document.getElementById("Restore").onclick = function() { openWindow();};
document.getElementById("currentSession").onclick = function(){getAllWindows(writeTabs);};
document.getElementById("Merge").onclick = function(){mergeSession();};
document.getElementById("Delbutton").onclick = function(){deleteSession();};

function myfunc(iid) {

//document.write(iid);
   var tabs = JSON.parse(localStorage.getItem(iid));
   currentWindows = tabs;
   currentSessionID = iid;

   writeTabs(tabs);

  // for(var i=0; i<tabs.length; i++){
    
  //   var tabur = tabs[i].title;
  //   var t = tabs[i].url;
  //   var loc = "http://";
  //   var l = loc.concat(t);
  //   var l1 = loc+t;
  //   var tabur1 = tabs[i].favIconUrl
  // //  document.write('<a href="'+l+'">tabur</a>');

  //   document.write("<a href=");
  //   document.write(tabur1 + ">");
  //   document.write(tabur1);
  //   document.write("</a>");

  //   //document.write('<br>');


  //   document.write("<a href=");
  //   document.write(l1 + ">");
  //   document.write(tabur);
  //   document.write("</a>");

  //   document.write('<br>');

//}

}