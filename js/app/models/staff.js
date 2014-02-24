define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
        id=1,
        xml,
        parsed = [], 
        title = "", 
        description = "", 
        pubDate = "", 
        Staff = Backbone.Model.extend({  

        }),

        
        StaffCollection = Backbone.Collection.extend({

            model: Staff,
            //url: 'http://pearse.schoolspace.ie/index.php?option=com_ninjarsssyndicator&feed_id=5&format=raw',
            
            //This is used so I can test on a browser. On a device, use the direct link
            
            url: function(){
                    return "/school-proxy.php?type=staff";
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
        Staff: Staff,
        StaffCollection: StaffCollection
    };

});