define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
        id=1,
        xml,
        parsed = [], 
        title = "", 
        description = "", 
        pubDate = "", 
        
        
        Welcome = Backbone.Model.extend({  
            
            //url: 'http://pearse.schoolspace.ie/index.php?option=com_ninjarsssyndicator&feed_id=16&format=raw',
            
            
            url: function(){
                    return "/school-proxy.php?type=welcome";
                 },
            
        
            parse: function (xml) {

                title = $(xml).find('item').find('title').text();

                description = $(xml).find('item').find('description').text();

                pubDate = $(xml).find('item').find('pubDate').text();

                pubDate = pubDate.substring(0, pubDate.length-12);

                parsed.title = title;
                parsed.description = description;
                parsed.pubDate = pubDate;
                
                return parsed;
            },
                    

            fetch: function (options) {
                options = options || {};
                options.dataType = "xml";
                
                return Backbone.Model.prototype.fetch.call(this, options);
            }

        });



    return {
        Welcome: Welcome
    };

});