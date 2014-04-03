document.addEventListener('DOMContentLoaded', function () {
  getmylist("map");
});

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
/*
	chrome.tabs.onCreated(function(tab)
  {  var k = tab.id ; 
     alert(k);
     //arr[k] = new Array();
  }
    )
  
  
  chrome.tabs.onUpdated(function(tabId , changeInfo , tab){
    //arr[k].push(changeInfo.url);
    //alert(changeInfo.url);
    document.getElementById(divName).innerHTML =  changeInfo.url ;
  })
  
  chrome.tabs.query({currentWindow: true, active: true},function(tabs) { 
  	
	 var d = tabs[0].url;

   document.getElementById(divName).innerHTML = d ;
  

   
	 for(i = 0 ; i < arr[d].length ; i++)
	 	{
	 		document.getElementById(divName).innerHTML =  " next link: " + arr[d][i];
	 	}
	 
	});
*/
/*
 chrome.tabs.query({currentWindow: true, active: true},function(tabs) { 
   //var d = tabs[0].url; 
   //window.alert(a[tabs[0].id]);
   document.getElementById(divName).innerHTML =  a[tabs[0].id];

  });

  chrome.tabs.onCreated.addListener(function(tab){ a[tab.id]=[];});

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo.status=='complete'){
    a[tabId].push(tab.url);
   document.getElementById(divName).innerHTML =  a[tabId];
  }

  }
); 

*/

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

