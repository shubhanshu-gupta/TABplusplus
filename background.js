var flag = 0;

chrome.browserAction.onClicked.addListener( function(tab) {

chrome.tabs.query({windowId:chrome.windows.WINDOW_ID_CURRENT},function(tabs){
       // alert(tabs.length);
       var size = tabs.length;
       flag = 0;
       for(i=0;i<size;i++){
               if(tabs[i].title == "tAB++"){
               	
               	chrome.tabs.update(tabs[i].id,{selected:true, url:'t2.html'});
                flag = 1;
                        // alert("loop  "+flag);
              //  console.log(flag);
                break;
               }
       }
       creat();
       // alert(tabs[tabs.length-1].title);});
});

function creat(){
       // alert(flag);
        if(flag==0)
                chrome.tabs.create({url: 't2.html'});
}

 //chrome.tabs.create({url: 't2.html'});

});