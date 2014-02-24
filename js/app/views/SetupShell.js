define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/SetupShell.html'),
        side_nav            = require('text!tpl/SideNav.html'),
        template            = _.template(tpl);

    return Backbone.View.extend({

        initialize: function (options) {

            this.render();
        },

        render: function (options) {
         
            //this.$el.html(template({side_nav:side_template({message_count:0})}));
            //return this;
            console.log('this.options.body is ');
            console.log(this.options.body);
            this.options.body.append(template({message_count:0}));
        },
                
      

    });

});