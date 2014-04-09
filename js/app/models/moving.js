define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
        id=1,
        xml,
        parsed = [], 
        title = "", 
        description = "", 
        pubDate = "", 
        Moving = Backbone.Model.extend({  

        }),

        
        MovingCollection = Backbone.Collection.extend({

            model: Moving,
        
            url: function(){
                    if(in_browser===false){
                        return this.feed_domain+'/index.php?option=com_ninjarsssyndicator&feed_id=13&format=raw'
                    }
                    else{
                        return "/school-proxy.php?type=moving&feed_domain="+this.feed_domain;
                    }
            },
            
            initialize: function(options){
                this.feed_domain = options.feed_domain;
        
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
        Moving: Moving,
        MovingCollection: MovingCollection
    };

});