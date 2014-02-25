define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/DirectionsList.html'),
        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
         
            this.render();
            this.collection.on("reset", this.render, this);
        },

        render: function () {
            this.$el.html(template({directions:this.collection.toJSON()}));
            return this;
        },
          


    });

});