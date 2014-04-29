/*
* global variables 
* 
*/
var currentFolder = "root";
var sessionWin = new Array();
var currentSessionID = -1;
var stack = [];
var queue = [];

function Tab(tab){
  this.id = tab.id;
  this.title = tab.title;
  this.url = tab.url;
  this.favIconUrl = tab.favIconUrl;
  this.hashtags = tab.hashtags==null ? "" : tab.hashtags;
  this.annotation = tab.annotation==null ? "" :tab.annotation;
  this.tabhistory = tab.tabhistory==null ? { } :tab.tabhistory;
}

Tab.prototype.pushHashTags = function (hashtag) {
  this.hashtags += hashtag + " ";
}

Tab.prototype.clear = function (){
  this.hashtags = "";
}

Tab.prototype.searchHashTag = function (hashtag) {
  var flag = this.hashtags.indexOf(hashtag);
  if(flag == -1) return false;
  else return true;
}

Tab.prototype.pushAnnotation = function (annotation) {
  this.annotation += annotation;
}

Tab.prototype.pushTabhistory = function (history) {
  for(var j = 0 ; j < history.length ; j++) {
    if (history[j] == "chrome://newtab/") 
      history.splice(j,1); 

    else if( j+1 < history.length) {
      if (history[j] == history[j+1]) { 
        var z = 1 ;
        do {
          z++;
        } while( j+z < history.length && history[j] == history[j+z])
          
        history.splice(j,z-1);
      }
    }
  }
  this.tabhistory = history;
  //alert(this.tabhistory.url);
}

function Window(id,tabs){
  this.id = id;
  this.tabs = tabs==null ? new Array() : tabs;
}


Window.prototype.pushtab = function (tab) {
  this.tabs.push( new Tab(tab) );
}

function Session(id){
  if(this.id == null || id==null) this.id = new Array();
  if(id)
  this.id.push(id);
}
/*
function Tabposition(sessionKey, windowindex, tabid){
  this.sessionKey = sessionKey;
  this.windowindex = windowindex;
  this.tabid = tabid;
  //alert(this.tabid);
}

Tabposition.prototype.getTab = function (hashtag){
  var session = localStorage.getItem(this.sessionKey);
  if(session != null){    
      var result = null;
    var win = session[this.windowindex];
    if(win != null){
      var tabs = win.tabs;
      for (var i = 0; i < tabs.length; i++) {
        if(tabs[i].id == this.tabid)
        //if(tabs[i].hashtags.indexOf(hashtag) > -1)
          result = tabs[i];
      };
      //alert(result);
      return result;
    }
  }
}

function updateAllHashtags(hashtag, tabposition){
  if( allHashtags[hashtag] == undefined)
    allHashtags[hashtag] = new Array();
  allHashtags[hashtag].push(tabposition);
  //alert(allHashtags[hashtag][0].sessionKey + "ytatatta");
}
*/
function update_sessionWin(windows){
  sessionWin.length = 0;
  var alltabs = {};
  alltabs["tAB++"] = true;
  alltabs["New Tab"] = true;
  for (var i = 0; i < windows.length; i++) {
      var tempwindow = new Window(windows[i].id,null);
      var tabs = windows[i].tabs;

      for (var j = 0; j < tabs.length; j++) {
        var flag = true;
          if(alltabs[tabs[j].title] == true){
              flag = false;
          }
          alltabs[tabs[j].title] = true;
          if(flag)
          tempwindow.pushtab(tabs[j]);    
      }
      if(tempwindow.tabs.length > 0) 
        sessionWin.push(new Window(tempwindow.id,tempwindow.tabs));
    }
}