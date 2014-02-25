define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/SetupShell.html'),
        template            = _.template(tpl);

    return Backbone.View.extend({

        initialize: function (options) {

            this.render();
        },

        render: function (options) {
         
            //this.$el.html(template({side_nav:side_template({message_count:0})}));
            //return this;

            this.options.body.append(template({message_count:0}));
            
            this.doBinds();
        },

        doBinds: function(){
   

                  this.options.body.find("div#side-nav-cont a").click( function() {
                      //console.log('in side nav click');


                      $( this ).parent().parent().parent().find('li').each(function(){
                          //console.log('in the each');
                          $( this ).removeClass( 'side-nav-active' );
                      });

                      $( this ).parent().addClass( 'side-nav-active' );

                   });

           
    
        },
      

    });

});