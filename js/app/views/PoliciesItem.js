define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        UsefulFuncs         = require('app/utils/useful_func'),
        tpl                 = require('text!tpl/PoliciesItem.html'),
        side_nav                = require('text!tpl/SideNav.html'),
        side_template = _.template(side_nav),
        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.removeDescriptionStyles();
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

        render: function () {
            this.$el.html(template({side_nav:side_template({message_count:this.options.message_count}), model:this.model.attributes}));
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