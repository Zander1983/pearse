define(function (require) {

    "use strict";

 
    var UsefulFuncs = {};

   
    UsefulFuncs.getMonth = function(date_str) {
    
        var objDate = new Date(date_str);

    };
  
  
    UsefulFuncs.hideAlert = function() {
        $('.alert').hide();
    };
    

    UsefulFuncs.loadURL = function (url){
        navigator.app.loadUrl(url, { openExternal:true });
        return false; 
    };
    
    
    UsefulFuncs.linkClicked = function (e) {    
        e.preventDefault();
        var url = $(e.currentTarget).attr("rel"); 
        UsefulFuncs.loadURL(url);
    };

    UsefulFuncs.walk_the_DOM = function walk(node, func) {
        func(node);
        node = node.firstChild;
        while (node) {
            walk(node, func);
            node = node.nextSibling;
        }
    };
    
    /*
     * Very important function which removes all inner styling but leaves the tags. 
     * It also removes image height and width attributes
     */
    UsefulFuncs.removeStyles = function(html){
            
            var $html = $("<div>"+html+"</div>");
            
            $html.find('[style]').removeAttr('style');     
            $html.find('img').removeAttr('width').removeAttr('height');
            
            return $html.html();
    };
    
    
    UsefulFuncs.replaceURLWithHTMLLinks = function (text) {
            var exp = /(\b(www\.|http\:\/\/)\S+\b)/ig;
            return text.replace(exp,"<a href='$1'>$1</a>"); 
    };
    
    UsefulFuncs.updateCountEl = function (count) {
          
            var el = $('#message-count');
        
            if(count>0){
         
                el.html(count);
                if(!el.hasClass('topcoat-notification')){
                    el.addClass('topcoat-notification');
                }
         
            }
            else{
          
                //so its 0, remove class and empty html
                el.removeClass('topcoat-notification');
                el.empty();
            }

    };
    
    UsefulFuncs.correctView = function(body){
            
           body.removeClass('left-nav');
           body.scrollTop(0);
    };
    

    
    UsefulFuncs.showAlert = function(text, title) {
 
        navigator.notification.alert(
            text,  // message
            function(){},         // callback
            title            // title
        );
    };
    
    UsefulFuncs.showConfirm = function(text, title, klass) {
        return confirm(text);
        
        //navigator.notification.confirm();
        /*$('.alert').removeClass("alert-error alert-warning alert-success alert-info");
        $('.alert').addClass(klass);
        $('.alert').html('<strong>' + title + '</strong> ' + text);
        $('.alert').show();*/
    };
    
    
    UsefulFuncs.showSpinner = function(body){
            
            try {
              spinnerplugin.show();
            } 
            catch(e) {
            } 
            finally {

            }
    };
    
    UsefulFuncs.hideSpinner = function(body){
            
            try {
              spinnerplugin.hide();
            } 
            catch(e) {
            } 
            finally {

            }
    };
    


    UsefulFuncs.checkNetwork = function(){
        
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            console.log('Connection type: ' + states[networkState]);
            
            //do this for Andriod, check for ios
            if(networkState===Connection.NONE){
                console.log('returning false');
                return false;
            }
            else{
                
                console.log('returnung true');
                console.log('networkState is ');
                console.log(networkState);
                console.log('Connection.NONE is ');
                console.log(Connection.NONE);
                return true;
            }
        
    };

    
    return UsefulFuncs;

    
});