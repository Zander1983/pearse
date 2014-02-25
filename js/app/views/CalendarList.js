define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/CalendarList.html'),
        template = _.template(tpl);


    return Backbone.View.extend({

        initialize: function (options) {
            this.render();
            this.changeTitle();
        },

        render: function (options) {
            
            this.$el.html(template({calendar:this.collection.toJSON()}));

        },
                
        changeTitle: function(){
    
            $('.topcoat-navigation-bar__title').html('Calendar');
        
        },


    });

});