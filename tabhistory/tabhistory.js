
function onAnchorClick(event) {
  chrome.tabs.create({
    selected: true,
    url: event.srcElement.href
  });
  return false;
}

function buildPopupDom(divName, data) {
  document.getElementById(divName).innerHTML += "Tab" ;
  var popupDiv = document.getElementById(divName);

  var ul = document.createElement('ul');
  popupDiv.appendChild(ul);

  for (var i = 0, ie = data.length; i < ie; ++i) {
    var a = document.createElement('a');
    a.href = data[i];
    a.target = '_blank';
    a.appendChild(document.createTextNode(data[i]));
    a.addEventListener('click', onAnchorClick);

    var li = document.createElement('li');
    li.appendChild(a);

    ul.appendChild(li);
  }

}


function getmylist(divName)
{ 

chrome.extension.sendMessage("request",function(response){
 var b = response ;
  
chrome.tabs.query({},function(tabs) {
    
    for(var i = 0 ; i < tabs.length ; i++)
      {  
        var arr = b[tabs[i].id] ;
        if(arr)
         { for(var j = 0 ; j < arr.length ; j++)
            {
              if(arr[j] == "chrome://newtab/")
              {
                arr.splice(j,1); 
              }
              else if( j+1 < arr.length)
              {
                if(arr[j] == arr[j+1])
                { 
                  var z = 1 ;
                  do{z++ ;}
                  while( j+z < arr.length && arr[j] == arr[j+z])
                    
                  arr.splice(j,z-1);
                }
              }
            }
            buildPopupDom(divName,arr);
            //document.getElementById(divName).innerHTML += arr + "<br>" ;
          }
      }
  });
});
}

getmylist("map");
