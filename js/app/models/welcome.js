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
            
            url: function(){
                    return "/school-proxy.php?type=welcome";
                 },
            
        
            parse: function (data) {
        
                    console.log('in the model parse');

                    xml = data;


                    title = $(xml).find('item').find('title').text();
                    
                    description = $(xml).find('item').find('description').text();
                    
                    pubDate = $(xml).find('item').find('pubDate').text();
                    
                    pubDate = pubDate.substring(0, pubDate.length-12);
                
                    
                    
       
                    parsed.push({id:id, title: title,
                                description:description, pubDate:pubDate});
                    title, description, pubDate = "";
                   id++;
              
              

                console.log('parsed is ');
                console.log(parsed);
                
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