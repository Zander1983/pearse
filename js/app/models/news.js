define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
        id=1,
        xml,
        parsed = [], 
        title = "", 
        description = "", 
        pubDate = "", 
        News = Backbone.Model.extend({  

        }),

        
        NewsCollection = Backbone.Collection.extend({

            model: News,
            //url: 'http://pearse.schoolspace.ie/index.php?option=com_ninjarsssyndicator&feed_id=1&format=raw',
            
            //This is used so I can test on a browser. On a device, use the direct link
         
            
            url: function(){
                    return "/school-proxy.php?type=news";
                 },
            
        
            parse: function (data) {

                xml = data;

              
                $(xml).find('item').each(function (index) {
           
                    title = $(this).find('title').text();
                    
                    description = $(this).find('description').text();
                    
                    pubDate = $(this).find('pubDate').text();
                    
                    pubDate = pubDate.substring(0, pubDate.length-12);
                    
       
                    parsed.push({id:id, title: title,
                                description:description, pubDate:pubDate});
                    title, description, pubDate = "";
                   id++;
                });

                return parsed;
            },
                    

            fetch: function (options) {
                options = options || {};
                options.dataType = "xml";
                return Backbone.Collection.prototype.fetch.call(this, options);
            }

        });


    return {
        News: News,
        NewsCollection: NewsCollection
    };

});