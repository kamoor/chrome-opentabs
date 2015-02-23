
/**
 * A simple script to save, open, clear URLS in chrome extension OpenTabs
 * @param  {[type]} ){                   getGoodUrls [description]
 * @return {[type]}     [description]
 */
var ot = (function(){

   /* Get all Urls 
    **/
   getGoodUrls = function(urlText){
    var lines = urlText.split("\n");
    var result = [];
    var count = 0;
    for(var i = 0;i < lines.length;i++){
          if(lines[i].length == 0){
            continue;
          }
          result[count] = lines[i];
          if(lines[i].indexOf("http") != 0){
                result[count] = "http://" + lines[i];
          }  
          count++;
    }
    return result;
  }

  getSelectedContent = function(textArea){
    if(document.getElementById("urls").selectionEnd > document.getElementById("urls").selectionStart){
      return document.getElementById("urls").value.substr(document.getElementById("urls").selectionStart, document.getElementById("urls").selectionEnd);
    }else{
      return document.getElementById("urls").value;
    }
  }

  saveUrls = function(urls){
    localStorage.setItem("urls-1", urls);
  }

  getUrls = function(){
    return localStorage.getItem("urls-1");
  }

  onLoad = function(){
    document.getElementById("urls").value = getUrls();
  }

   return{

      openTabs : function(){
          var lines = getGoodUrls(getSelectedContent(document.getElementById("urls")));
          for(var i = 0; i < lines.length; i++){
            var props = {
                url: lines[i]
            };
            chrome.tabs.create(props, function onSucess(){});
          }
      },
      saveUrls : function(){
         saveUrls(document.getElementById("urls").value);
      },
      onLoad : function(){
        onLoad();
      },
      clear :  function(){
        document.getElementById("urls").value = "";
      }
  };


})();

document.getElementById("btn-open-tabs").addEventListener("click",ot.openTabs);
document.getElementById("btn-save-urls").addEventListener("click",ot.saveUrls);
document.getElementById("btn-clear-urls").addEventListener("click",ot.clear);
document.body.onload =  ot.onLoad;


