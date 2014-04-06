/*
 * Refocus the tab++ page if it is open else create new 
*/
chrome.browserAction.onClicked.addListener( function(tab) {

chrome.tabs.query({windowId:chrome.windows.WINDOW_ID_CURRENT},function(tabs){

 for(i=0;i<tabs.length;i++){
    if(tabs[i].title == "tAB++"){
    	chrome.tabs.update(tabs[i].id,{selected:true, url:'t2.html'});
      return;
    }
  }
    chrome.tabs.create({url: 't2.html'});
  });
});

/*
 * Checks for changes in all open tabs 
*/

var a = new Array();

chrome.tabs.onCreated.addListener(function(tab){ 
  a[tab.id]= new Array();
  //alert(tab.id);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo.status=='complete'){
    a[tabId].push(tab.url);
   //alert();
  }
  }
); 

chrome.extension.onMessage.addListener(function(request, sender , sendResponse){
  sendResponse(a);  
});