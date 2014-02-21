define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Contact.html'),
        side_nav            = require('text!tpl/SideNav.html'),
        side_template       = _.template(side_nav),
        template            = _.template(tpl);

    return Backbone.View.extend({

        initialize: function (options) {

            this.render();
        },

        render: function (options) {
         
            this.$el.html(template({side_nav:side_template({message_count:this.options.message_count})}));
            return this;
        },
                
        events: {
             //"click input": "formationClicked",
             "click #website-link"   : "linkClicked",
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

    });

});