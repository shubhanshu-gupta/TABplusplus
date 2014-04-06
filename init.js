/*
* global variables 
* 
*/
var sessionWin = new Array();
var currentSessionID = -1;
var allHashtags = {}/*JSON.parse(localStorage.getItem("@hashtags@"));
if(allHashtags == null) allHashtags = {};*/


function Tab(tab){
  this.id = tab.id;
  this.title = tab.title;
  this.url = tab.url;
  this.favIconUrl = tab.favIconUrl;
  this.hashtags = tab.hashtags==null ? "" : tab.hashtags;
  this.annotation = tab.annotation==null ? "" :tab.annotation;
  //this.tabhistory = getTabHistory(this.id);
}

Tab.prototype.pushHashTags = function (hashtag) {
  this.hashtags += hashtag + " ";
}

Tab.prototype.searchHashTag = function (hashtag) {
  var flag = this.hashtags.indexOf(hashtag);
  if(flag == -1) return false;
  else return true;
}

Tab.prototype.pushAnnotation = function (annotation) {
  this.annotation += annotation;
}

/*Tab.prototype.updateTabHistory = function () {
  this.tabhistory = getTabHistory(this.id);
}*/

function Window(id,tabs){
  this.id = id;
  this.tabs = tabs==null ? new Array() : tabs;
}


Window.prototype.pushtab = function (tab) {
  this.tabs.push( new Tab(tab) );
}

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

function update_sessionWin(windows){
  sessionWin.length = 0;
  var tabpp = new Tab({id:-1, title: "tAB++", url: " tab++", favIconUrl: "null"});
  var newtab = new Tab({id:-2, title: "New Tab", url: " new tab", favIconUrl: "null"});
  var alltabs = new Array(); alltabs.push(tabpp); alltabs.push(newtab);

  for (var i = 0; i < windows.length; i++) {
      var tempwindow = new Window(windows[i].id,null);
      var tabs = windows[i].tabs;

      for (var j = 0; j < tabs.length; j++) {
          for(var x=0,flag=true, y=alltabs.length; x < y; x++) {
            if(alltabs[x].title == tabs[j].title){
              flag = false; break;
            }
            alltabs.push(tabs[j]);
          }
          if(flag)
          tempwindow.pushtab(tabs[j]);    
      }
      if(tempwindow.tabs.length > 0) 
        sessionWin.push(new Window(tempwindow.id,tempwindow.tabs));
    }
}