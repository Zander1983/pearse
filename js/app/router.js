define(function (require) {

    "use strict";

    var Backbone    = require('backbone'),
        PageSlider  = require('app/utils/pageslider'),
        Useful      = require('app/utils/useful_func'),
        slider      = new PageSlider($('body')),
        news,
        calendar,
        newsletter,
        staff,
        policies,
        directions,
        facilities,
        support,
        that;

    return Backbone.Router.extend({

        routes: {
            "": "getNews",
            "news": "getNews",
            "news-item/:id": "getNewsItem",
            "support": "getSupport",
            "support-item/:id": "getSupportItem",
            "directions": "getDirections",
            "directions-item/:id": "getDirectionsItem",
            "staff": "getStaff",
            "staff-item/:id": "getStaffItem",
            "policies": "getPolicies",
            "policies-item/:id": "getPoliciesItem",
            "newsletter": "getNewsLetter",
            "newsletter-item/:id": "getNewsLetterItem",
            "calendar": "getCalendar",
            "calendar-item/:id": "getCalendarItem",
            "facebook": "getFacebook",
            "facilities": "getFacilities",
            "facilities-item/:id": "getFacilitiesItem",
        },
        
        initialize: function() {   
            
            that = this;
            that.body = $('body');
            
            //this.bind( "route", this.routeChange);
            
            this.storage = window.localStorage;

            this.setDeviceDetails();
 
            if(typeof(this.device_id)!=='undefined' && this.device_id!==null){
                //only update counter if we know device_id. the first time gets installed, 
                //we wont be able to get device_id cos it can take some time to come back from registering
                //with apple/google
                this.updateMessageCounter();
            }
       

            $.ajaxPrefilter( function( options, originalOptions, jqXHR ) { 
                
                if(options.pure_ajax==true){
                    return;
                }

                if(options.api==true){
                    //172.16.22.68
                    //options.url = "http://localhost/schoolspace/device_api" + options.url;
                    
                    if(options.update_notification==true){
                       //options.url = "http://localhost/schoolspace/device_api/update_notification" + options.url+"";   
                       options.url = server_url+"/device_api/update_notification" + options.url+"";   
                    }
                    else{
                        //options.url = "http://localhost/schoolspace/device_api" + options.url;   
                        options.url = server_url+"/device_api" + options.url;          

                    }
                    
                }
                else{
                    if(options.full_url==true){
   
                    }
                    else{
                        //this is when testing in a browser
                        options.url = 'http://localhost/schoolspace/cli/pearse/www/scripts' + options.url
                    }
                }
  
           });

        },
                
        setDeviceDetails: function(){
  
            this.device_id = this.storage.getItem(project_title+'_device_id');
            this.api_key = this.storage.getItem(project_title+'_api_key');
        },
                
        routeChange: function(){
    
            $('html,body').scrollTop(0);
    
        },
                      

        getNews: function (id) {

                require(["app/models/news", "app/views/NewsList"], function (model, NewsList) {

                    if(typeof(news)==='undefined' || news===null){
                        
                        news = new model.NewsCollection();

                        news.fetch({
                            full_url: false,
                            success: function (collection) {
                                Useful.correctView(that.body);
                                if(Backbone.history.fragment==="" || Backbone.history.fragment==="news"){
                                    slider.slidePage(new NewsList({collection: collection, message_count:that.message_count}).$el);                         
                                }    
                            }
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new NewsList({collection: news, message_count:that.message_count}).$el);
                    }

                });
                
            

        },
        
        
        getNewsItem: function (id) {
            
            require(["app/views/NewsItem"], function (NewsItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new NewsItem({model: news.get(id), message_count:that.message_count}).$el);
                                 
            });
        },
                
        getSupport: function (id) {

                require(["app/models/support", "app/views/SupportList"], function (model, SupportList) {

                    if(typeof(support)==='undefined' || support===null){
                        
                        support = new model.SupportCollection();

                        support.fetch({
                            full_url: false,
                            success: function (collection) {
                                Useful.correctView(that.body);
                                slider.slidePage(new SupportList({collection: collection, message_count:that.message_count}).$el);                         
                                
                            }
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new SupportList({collection: support, message_count:that.message_count}).$el);
                    }

                });
                
            

        },
        
        
        getSupportItem: function (id) {
            
            require(["app/views/SupportItem"], function (SupportItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new SupportItem({model: support.get(id), message_count:that.message_count}).$el);
                                 
            });
        },
           
        getDirections: function (id) {

                require(["app/models/directions", "app/views/DirectionsList"], function (model, DirectionsList) {

                    if(typeof(directions)==='undefined' || directions===null){
                        
                        directions = new model.DirectionsCollection();

                        directions.fetch({
                            full_url: false,
                            success: function (collection) {
                                Useful.correctView(that.body);
                                slider.slidePage(new DirectionsList({collection: collection, message_count:that.message_count}).$el);                         
                                
                            }
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new DirectionsList({collection: directions, message_count:that.message_count}).$el);
                    }

                });
                
            

        },
        
        
        getDirectionsItem: function (id) {
            
            require(["app/views/DirectionsItem"], function (DirectionsItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new DirectionsItem({model: directions.get(id), message_count:that.message_count}).$el);
                                 
            });
        },         

        getStaff: function (id) {

                require(["app/models/staff", "app/views/StaffList"], function (model, StaffList) {

                    if(typeof(staff)==='undefined' || staff===null){
                        
                        staff = new model.StaffCollection();

                        staff.fetch({
                            full_url: false,
                            success: function (collection) {
                                Useful.correctView(that.body);
                                slider.slidePage(new StaffList({collection: collection, message_count:that.message_count}).$el);                         
                                
                            }
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new StaffList({collection: staff, message_count:that.message_count}).$el);
                    }

                });
                
            

        },
        
        
        getStaffItem: function (id) {
            
            require(["app/views/StaffItem"], function (StaffItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new StaffItem({model: staff.get(id), message_count:that.message_count}).$el);
                                 
            });
        },
            
                
        getPolicies: function (id) {

                require(["app/models/policies", "app/views/PoliciesList"], function (model, PoliciesList) {

                    if(typeof(policies)==='undefined' || policies===null){
                        
                        policies = new model.PoliciesCollection();

                        policies.fetch({
                            full_url: false,
                            success: function (collection) {
                                Useful.correctView(that.body);
                                slider.slidePage(new PoliciesList({collection: collection, message_count:that.message_count}).$el);                         
                                
                            }
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new PoliciesList({collection: policies, message_count:that.message_count}).$el);
                    }

                });
                
            

        },
        
        
        getPoliciesItem: function (id) {
            
            require(["app/views/PoliciesItem"], function (PoliciesItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new PoliciesItem({model: policies.get(id), message_count:that.message_count}).$el);
                                 
            });
        },
                
        getNewsLetter: function (id) {

                require(["app/models/newsletter", "app/views/NewsLetterList"], function (model, NewsLetterList) {

                    if(typeof(newsletter)==='undefined' || newsletter===null){
                        
                        newsletter = new model.NewsLetterCollection();

                        newsletter.fetch({
                            full_url: false,
                            success: function (collection) {
                                
                                Useful.correctView(that.body);
                                slider.slidePage(new NewsLetterList({collection: collection, message_count:that.message_count}).$el);                         
                                
                            }
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new NewsLetterList({collection: newsletter, message_count:that.message_count}).$el);
                    }

                });
                
            

        },
        
        
        getNewsLetterItem: function (id) {
            
            require(["app/views/NewsLetterItem"], function (NewsLetterItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new NewsLetterItem({model: newsletter.get(id), message_count:that.message_count}).$el);
                                 
            });
        },
                
        getCalendar: function () {

            require(["app/models/calendar", "app/views/CalendarList"], function (model, CalendarList) {
       
                if(typeof(calendar)==='undefined' || calendar===null){
                    calendar = new model.CalendarCollection();
                    
                    calendar.fetch({
                        full_url: false,
                        success: function (collection) {
                            Useful.correctView(that.body);
                            slider.slidePage(new CalendarList({collection: collection, message_count:that.message_count}).$el);                          
                        }
                    });
                }
                else{
                    Useful.correctView(that.body);
                    slider.slidePage(new CalendarList({collection: calendar, message_count:that.message_count}).$el);
                }
                            
            });
        },
       
                
        getCalendarItem: function (id) {
            require(["app/views/CalendarItem"], function (CalendarItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new CalendarItem({model: calendar.get(id), message_count:that.message_count}).$el);
                                 
            });
        },   
                
        getFacebook: function () {
            
            require(["app/views/Facebook"], function (Facebook) { 
                Useful.correctView(that.body);
                slider.slidePage(new Facebook({message_count:that.message_count}).$el);               
             });
        },
                
                
        getFacilities: function (id) {

                require(["app/models/facilities", "app/views/FacilitiesList"], function (model, FacilitiesList) {

                    if(typeof(facilities)==='undefined' || facilities===null){
                        facilities = new model.FacilitiesCollection();

                        facilities.fetch({
                            full_url: false,
                            success: function (collection) {
                                Useful.correctView(that.body);
                                slider.slidePage(new FacilitiesList({collection: collection, message_count:that.message_count}).$el);                         
                                
                            }
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new FacilitiesList({collection: facilities, message_count:that.message_count}).$el);
                    }

                });

        },
        
        
        getFacilitiesItem: function (id) {
            
            require(["app/views/FacilitiesItem"], function (FacilitiesItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new FacilitiesItem({model: facilities.get(id), message_count:that.message_count}).$el);
                                 
            });
        },
        
     
        updateMessageCounter: function(){
       
            require(["app/models/article_view"], function (models) {
           
                var article_view_count = new models.ArticleViewCount({device_id: that.device_id, 
                                                                      project_title: project_title
                                                                        });
                
                article_view_count.fetch( 
                    {
                    api: true,
                    headers: {device_id:that.device_id,api_key:that.api_key},
                    success: function (data) {
                        that.message_count = data.get('count');
                        Useful.updateCountEl(that.message_count);
     
                    },
                    error: function(){
                        console.log('failed updateMessageCounter');
                    }
                }); 
                
            });
            
        }

    });

});