define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/NewsList.html'),
        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
         
            this.render();
            this.collection.on("reset", this.render, this);

        },

        render: function () {
            this.$el.html(template({news:this.collection.toJSON()}));
            return this;
        },
 

    });

});