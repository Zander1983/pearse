define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        UsefulFuncs         = require('app/utils/useful_func'),
        tpl                 = require('text!tpl/VideoItem.html'),
        template = _.template(tpl),
        key;

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
    
            key = $(this.model.attributes.description).find('object').attr('data');
            
            var start = key.indexOf('/v/');
            var end = key.indexOf('?');
            
            key = key.substring(start+3, end);

            console.log('key is ');
            console.log(key);
        },

        render: function () {
            this.$el.html(template({model:this.model.attributes, key:key, platform:window.device.platform}));
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