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
<<<<<<< HEAD

           if(j==0)
          {
            var s1 = '<div >'+inputsyntax+-1+'>Windows '+j+'</label><br></div>';
            d1.innerHTML = s1;
          }
          else
          {
          d1.insertAdjacentHTML('beforeend', '<div >'+inputsyntax+-1+'>Windows '+j+'</label><br></div>');    
          }


=======
          d1.insertAdjacentHTML('beforeend', '<div >'+inputsyntax+-1+'>Windows '+j+'</label><br></div>');
>>>>>>> 1a2ff406b215324a8ba2efe8aa7a34da065f8d0c
        var tabs = windows[j].tabs;
      	for(var i=0;i<tabs.length;i++)
         {
         	d1.insertAdjacentHTML('beforeend', '<span id='+i+'>'+inputsyntax+i+'><a href='+tabs[i].url+'>'+tabs[i].title+'</a>'+'</label><br></span>');
         }
          updateTabsNumber(tabs.length);
<<<<<<< HEAD
        }
}


function printAll()
{
 // var allkeys = ""; cnt =0;

  for(i=0; i<localStorage.length;i++)
  {
    var key = localStorage.key(i);
//    document.write('<button class="btn btn-default btn-lg" id='+key+'>'+key+'</button><br>');
  var d1=document.getElementById('SavedSession');
  d1.insertAdjacentHTML('afterend', '<button class="btn btn-primary btn-lg" id='+key+' style="width:300px;height:60px;">'+key+'</button><br>');

  var but = document.getElementById(key);
  but.addEventListener('click',function(){myfunc(this.id);})

  }

}




=======
        }                             
}

>>>>>>> 1a2ff406b215324a8ba2efe8aa7a34da065f8d0c
function save(windows){
  var storage = localStorage;
  var key = prompt("Enter New Session Name","Zero");
  var item = JSON.stringify(windows);
<<<<<<< HEAD
  item[0]
  storage.setItem(key, item);
  alert(key+' Session Saved');
  var d1=document.getElementById('SavedSession');
  d1.insertAdjacentHTML('afterend', '<button class="btn btn-primary btn-lg" id='+key+' style="width:300px;height:60px;">'+key+'</button><br>');

  var but = document.getElementById(key);
  but.addEventListener('click',function(){myfunc(this.id);})

=======
  storage.setItem(key, item);
  alert(key+' Session Saved');
>>>>>>> 1a2ff406b215324a8ba2efe8aa7a34da065f8d0c
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
<<<<<<< HEAD

printAll();

document.getElementById("Save").onclick = function () { getAllWindows(save); };
document.getElementById("Delete").onclick = remove//function () { alert('hello!'); };

function myfunc(iid) {

//document.write(iid);
   var tabs = JSON.parse(localStorage.getItem(iid))

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
=======
document.getElementById("Save").onclick = function () { getAllWindows(save); };
document.getElementById("Delete").onclick = remove//function () { alert('hello!'); };
>>>>>>> 1a2ff406b215324a8ba2efe8aa7a34da065f8d0c
