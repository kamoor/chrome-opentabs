

var ot = (function(){
   return{

      openTabs : function(){
          
          var lines = document.getElementById("urls").value.split('\n');
          for(var i = 0;i < lines.length;i++){
             var url = lines[i];
             if(url.indexOf("http") != 0){
                url = "http://" + url;
             }
             var props = {
                url: url
             };
             chrome.tabs.create(props, function onSucess(){});
          }
         
      }
  };
})();

document.getElementById("btn-open-tabs").addEventListener("click",ot.openTabs);


