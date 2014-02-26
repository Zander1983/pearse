define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        UsefulFuncs         = require('app/utils/useful_func'),
        tpl                 = require('text!tpl/VideoItem.html'),
        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.removeDescriptionStyles();
            this.getYouTubeLink();
            this.checkImagePaths();
            this.render();     
        },
        
        events: {
            "click #slide-menu-button"   : "slideMenu",
            "click #inner-container a"   : 'linkClicked'
        },
        
        
        linkClicked: function(e){
    
            e.preventDefault();
    
            var href = $(e.currentTarget).attr('href');
            
            if (window.device.platform == 'android' || window.device.platform == 'Android') {
                //Android ONLY - ios can you inAppBrowser
                navigator.app.loadUrl(href, { openExternal:true });
            
            }
            else{
                window.open(href, '_blank');
            }
            
        },
                

        getYouTubeLink: function() {
    
            alert('opening links...');
    
            if (window.device.platform == 'android' || window.device.platform == 'Android') {
                //Android ONLY - ios can you inAppBrowser
                navigator.app.loadUrl('https://www.youtube.com/watch?feature=player_embedded&v=1KRdf8Aif7M', { openExternal:true });
            
            }
            else{
                window.open('https://www.youtube.com/watch?feature=player_embedded&v=1KRdf8Aif7M', '_blank');
            }
            
            
            ////www.youtube-nocookie.com/v/1KRdf8Aif7M?version=3&hl=en_GB 
            //this.model.attributes.description
            var url = $(this.model.attributes.description).find('object').attr('data');
            console.log('url is ');
            console.log(url);
            
            var start = url.indexOf('/v/');
            var end = url.indexOf('?');
            
            url = url.substring(start+3, end);

            
            //var isYouTube = RegExp(/\.youtube\.com.+v=([\w_\-]+)/i);
            //var r = isYouTube.exec(url);
            //if (r && r[1]) {
              var video = 'http://www.youtube.com/v/' + url + '&hl=en&fs=1&';
              var youtube =  '<embed src="' + video + '" type="application/x-shockwave-flash"' + 
                ' allowscriptaccess="always"' + 
                ' allowfullscreen="true" width="90" height="60"></embed>';
           
            //}
            
            console.log('youtube is ');
            console.log(youtube);
            
            this.model.set({description: youtube});
        },

        render: function () {
            this.$el.html(template({model:this.model.attributes}));
            return this;
        },
        
        removeDescriptionStyles: function(){
      
            var description = UsefulFuncs.removeStyles(this.model.attributes.description);
            
            if(description.length>0){
                this.model.set({description: description});
            }     
        },
                
        /*
         * Check to see if image paths are relative
         */     
        checkImagePaths: function(){
    
            var src = "";
            var description = this.model.attributes.description;     
            $(description).find('img').each(function(i, obj){
                

                    src = $(obj).attr('src');
                    if(src.indexOf('http') === -1){
                        //therefore its a relative path
                        description = description.replace(src,"http://mallowcollege.ie"+src);                         
                    }
            });
            
            this.model.set({description: description});
    
        }

    });

});