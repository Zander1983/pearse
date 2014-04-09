define(function (require) {

    "use strict";

    var Backbone    = require('backbone'),
        PageSlider  = require('app/utils/pageslider'),
        Useful      = require('app/utils/useful_func'),
        slider      = new PageSlider($('body')),
        projectModel = require("app/models/project"),
        news,
        event,
        newsletter,
        staff,
        policies,
        photos,
        albums,
        directions,
        facilities,
        support,
        courses,
        moving,
        money,
        welcome,
        video,
        articles,
        deviceModel,
        certification,
        calendar,
        shoutout,
        flickr_api_key,
        flickr_user_id,
        feed_domain,
        project,
        tweets,
        that;

    return Backbone.Router.extend({

        routes: {
            "": "getHome",
            "news": "getNews",
            "news-item/:id": "getNewsItem",
            "shout-out": "getShoutOut",
            "shout-out-item/:id": "getShoutOutItem",
            "support": "getSupport",
            "support-item/:id": "getSupportItem",
            "directions": "getDirections",
            "directions-item/:id": "getDirectionsItem",
            "staff": "getStaff",
            "staff-item/:id": "getStaffItem",
            
            "video": "getVideo",
            "video-item/:id": "getVideoItem",
            "welcome": "getWelcome",
            "certification": "getCertification",
            "certification-item/:id": "getCertificationItem",
            "moving-on": "getMoving",
            "moving-item/:id": "getMovingItem",
            "money-matters": "getMoney",
            "money-matters-item/:id": "getMoneyItem",
            "policies": "getPolicies",
            "policies-item/:id": "getPoliciesItem",
            "newsletter": "getNewsLetter",
            "newsletter-item/:id": "getNewsLetterItem",
            "events": "getEvent",
            "events-item/:id": "getEventItem",
            "calendar": "getCalendar",
            "calendar-item/:id": "getCalendarItem",
            "facebook": "getFacebook",
            "facilities": "getFacilities",
            "facilities-item/:id": "getFacilitiesItem",
            "courses": "getCourse",
            "course-item/:id": "getCourseItem",
            "map": "getMap",
            "contact": "getContact",
            "albums": "getAlbums",
            "photos/:id": "getPhotos",
            "photo-item/:id": "getPhotoItem",
            
            /*****In Every Project**************/
            "notification": "getNotification",
            "messages/:project_title": "getArticles",
            "message/:id": "getArticle",
            "tweets": "getTweets",
            "tweets-item/:id": "getTweetsItem",
        },
        
        initialize: function() {   
            
            that = this;
            that.body = $('body');
            this.setupShell();
            
            //this.bind( "route", this.routeChange);
            
            this.storage = window.localStorage;
            
            this.setProjectDetails();

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
                    
                    if(in_browser===true){
                        options.url = "http://localhost/schoolspace.me/device_api" + options.url;    
                    }
                    else{
                        if(options.update_notification==true){
                           //options.url = "http://localhost/schoolspace/device_api/update_notification" + options.url+"";   
                           options.url = push_server_url+"/device_api/update_notification" + options.url+"";   
                        }
                        else{
                            //options.url = "http://localhost/schoolspace/device_api" + options.url;   
                            options.url = push_server_url+"/device_api" + options.url;          

                        }
                    }
                }
                else{
                    if(in_browser===true){
                        //this is when testing in a browser
                        options.url = 'http://localhost/schoolspace/cli/'+project_title+'/www/scripts' + options.url   
                    }
                }
   
  
           });


            
        },
          
                
         /******************STANDARD HELPER FUNCTIONS*******************/       
         getHome: function(){
    
            require(["app/views/Home"], function (Home) {

                if(is_push===false){
                    slider.slidePage(new Home().$el);                       
                }
                is_push = false;

            });
            
    
        },

 
        setupShell: function(){
    
            require(["app/views/SetupShell"], function (SetupShell) {

                new SetupShell({body:that.body});

            });
            
    
        },
                
        setDeviceDetails: function(){
  
            this.device_id = this.storage.getItem(project_title+'_device_id');
            this.api_key = this.storage.getItem(project_title+'_api_key');
        },
                
        routeChange: function(){
    
            $('html,body').scrollTop(0);
    
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
            
        },
          
        /******************ENDING STANDARD HELPER FUNCTIONS*******************/
        
        /*******************ROUTES START HERE***************************/
        
        getNews: function (id) {
                
                require(["app/models/news", "app/views/NewsList"], function (model, NewsList) {

                    if(typeof(news)==='undefined' || news===null){

                        Useful.showSpinner();
                        
                        news = new model.NewsCollection({feed_domain:feed_domain});

                        news.fetch({
                            success: function (collection) {
                                
                                console.log('in success');
                                
                                Useful.correctView(that.body);
                                if(Backbone.history.fragment==="" || Backbone.history.fragment==="news"){
                                    slider.slidePage(new NewsList({collection: collection}).$el);                         
                                }
                                
                                Useful.hideSpinner();

                            },
                            error:   function(model, xhr, options){
                                
                                console.log('in the error and response is ')
                                console.log(xhr.responseText);
                            
                               Useful.hideSpinner();
                               Useful.checkNetwork(slider);
                               
                            },
                                    
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new NewsList({collection: news}).$el);
                    }
                    
        
                    
                });
                
            

        },
        
        
        getNewsItem: function (id) {
            
            require(["app/views/NewsItem"], function (NewsItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new NewsItem({model: news.get(id)}).$el);
                                 
            });
        },
                
                
        getShoutOut: function (id) {
                
                require(["app/models/shoutout", "app/views/ShoutOutList"], function (model, ShoutOutList) {

                    if(typeof(shoutout)==='undefined' || shoutout===null){
   
                        Useful.showSpinner();
                        
                        shoutout = new model.ShoutOutCollection({feed_domain:feed_domain});

                        shoutout.fetch({
                            success: function (collection) {
                                Useful.correctView(that.body);
                                slider.slidePage(new ShoutOutList({collection: collection}).$el);                                                       
                                
                                Useful.hideSpinner();

                            },
                            error:   function(model, xhr, options){
                               Useful.hideSpinner();
                               Useful.checkNetwork(slider);
                               
                            },
                                    
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new ShoutOutList({collection: shoutout}).$el);
                    }
                    
        
                    
                });
                
            

        },
        
        
        getShoutOutItem: function (id) {
            
            require(["app/views/ShoutOutItem"], function (ShoutOutItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new ShoutOutItem({model: shoutout.get(id)}).$el);
                                 
            });
        },
                
        getSupport: function (id) {

                require(["app/models/support", "app/views/SupportList"], function (model, SupportList) {

                    if(typeof(support)==='undefined' || support===null){
                        
                        Useful.showSpinner();
                        
                        support = new model.SupportCollection({feed_domain:feed_domain});

                        support.fetch({
                            success: function (collection) {
                                Useful.correctView(that.body);
                                slider.slidePage(new SupportList({collection: collection}).$el);                         
                                Useful.hideSpinner();
                            },
                            error: function(){
                        
                                Useful.hideSpinner();
                                Useful.checkNetwork(slider);        
                
                            }
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new SupportList({collection: support}).$el);
                    }

                });
                
            

        },
        
        
        getSupportItem: function (id) {
            
            require(["app/views/SupportItem"], function (SupportItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new SupportItem({model: support.get(id)}).$el);
                                 
            });
        },
           
        getDirections: function (id) {

                require(["app/models/directions", "app/views/DirectionsList"], function (model, DirectionsList) {

                    if(typeof(directions)==='undefined' || directions===null){
                        
                        Useful.showSpinner();
                        
                        directions = new model.DirectionsCollection({feed_domain:feed_domain});

                        directions.fetch({
                            success: function (collection) {
                                Useful.correctView(that.body);
                                slider.slidePage(new DirectionsList({collection: collection}).$el);                         
                                Useful.hideSpinner();
                            },
                            error:function(){
                        
                                Useful.hideSpinner();
                                Useful.checkNetwork(slider);
                        
                            }
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new DirectionsList({collection: directions}).$el);
                    }

                });
                
            

        },
        
        
        getDirectionsItem: function (id) {
            
            require(["app/views/DirectionsItem"], function (DirectionsItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new DirectionsItem({model: directions.get(id)}).$el);
                                 
            });
        },         

        getStaff: function (id) {
                
                require(["app/models/staff", "app/views/StaffList"], function (model, StaffList) {

                    if(typeof(staff)==='undefined' || staff===null){
                        Useful.showSpinner();
                        staff = new model.StaffCollection({feed_domain:feed_domain});

                        staff.fetch({
                            success: function (collection) {
                                Useful.correctView(that.body);
                                slider.slidePage(new StaffList({collection: collection}).$el);                         
                                Useful.hideSpinner();
                            },
                            error:function(){
                        
                                Useful.hideSpinner();
                                Useful.checkNetwork(slider);
                        
                            }
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new StaffList({collection: staff}).$el);
                    }
                    
                });
                
            

        },
        
        getStaffItem: function (id) {
            
            require(["app/views/StaffItem"], function (StaffItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new StaffItem({model: staff.get(id)}).$el);
                                 
            });
        },
           
           
        getVideo: function (id) {

                require(["app/models/video", "app/views/VideoList"], function (model, VideoList) {

                    if(typeof(video)==='undefined' || video===null){
                        Useful.showSpinner();
                        video = new model.VideoCollection({feed_domain:feed_domain});

                        video.fetch({
                            success: function (collection) {
                                Useful.correctView(that.body);
                                slider.slidePage(new VideoList({collection: collection}).$el);                         
                                Useful.hideSpinner();
                            },
                            error:function(){
                        
                                Useful.hideSpinner();
                                Useful.checkNetwork(slider);
                        
                            }
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new VideoList({collection: video}).$el);
                    }

                });
                
            

        },
        
        getVideoItem: function (id) {
            
            require(["app/views/VideoItem"], function (VideoItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new VideoItem({model: video.get(id)}).$el);
                                 
            });
        },
           
                
        getWelcome: function () {
                
                require(["app/models/welcome", "app/views/Welcome"], function (model, Welcome) {

                    if(typeof(welcome)==='undefined' || welcome===null){
                        Useful.showSpinner();
                        
                        welcome = new model.Welcome({feed_domain:feed_domain});

                        welcome.fetch({
                            success: function (model) {
                                
                                Useful.correctView(that.body);
                                slider.slidePage(new Welcome({model: model}).$el);                         
                                Useful.hideSpinner();
                            },
                            error:function(){
                        
                                Useful.hideSpinner();
                                Useful.checkNetwork(slider);
                        
                            }
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new Welcome({model: welcome}).$el);
                    }

                });

        },
            
        getCertification: function (id) {

                require(["app/models/certification", "app/views/CertificationList"], function (model, CertificationList) {

                    if(typeof(certification)==='undefined' || certification===null){
                        Useful.showSpinner();
                        certification = new model.CertificationCollection({feed_domain:feed_domain});

                        certification.fetch({
                            success: function (collection) {
                                Useful.correctView(that.body);
                                slider.slidePage(new CertificationList({collection: collection}).$el);                         
                                Useful.hideSpinner();
                            },
                            error:function(){                       
                                Useful.hideSpinner();
                                Useful.checkNetwork(slider);                       
                            }
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new CertificationList({collection: certification}).$el);
                    }

                });
                
            

        },
        
        
        getCertificationItem: function (id) {
            
            require(["app/views/CertificationItem"], function (CertificationItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new CertificationItem({model: certification.get(id)}).$el);
                                 
            });
        },
            
        getMoving: function (id) {

                require(["app/models/moving", "app/views/MovingList"], function (model, MovingList) {

                    if(typeof(moving)==='undefined' || moving===null){
                        Useful.showSpinner();
                        moving = new model.MovingCollection({feed_domain:feed_domain});

                        moving.fetch({
                            success: function (collection) {
                                Useful.correctView(that.body);
                                slider.slidePage(new MovingList({collection: collection}).$el);                         
                                Useful.hideSpinner();
                            },
                            error:function(){                       
                                Useful.hideSpinner();
                                Useful.checkNetwork(slider);                       
                            }
                    });
                }
                else{
                        Useful.correctView(that.body);
                        slider.slidePage(new MovingList({collection: moving}).$el);
                    }

                });
                
            

        },
        
        
        getMovingItem: function (id) {
            
            require(["app/views/MovingItem"], function (MovingItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new MovingItem({model: moving.get(id)}).$el);
                                 
            });
        },
            
            
        getMoney: function (id) {

                require(["app/models/money", "app/views/MoneyList"], function (model, MoneyList) {

                    if(typeof(money)==='undefined' || money===null){
                        Useful.showSpinner();
                        money = new model.MoneyCollection({feed_domain:feed_domain});

                        money.fetch({
                            success: function (collection) {
                                Useful.correctView(that.body);
                                slider.slidePage(new MoneyList({collection: collection}).$el);                         
                                Useful.hideSpinner();
                            },
                            error:function(){                       
                                Useful.hideSpinner();
                                Useful.checkNetwork(slider);                       
                            }
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new MoneyList({collection: money}).$el);
                    }

                });
                
            

        },
        
        
        getMoneyItem: function (id) {
            
            require(["app/views/MoneyItem"], function (MoneyItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new MoneyItem({model: money.get(id)}).$el);
                                 
            });
        },
            
                
        getPolicies: function (id) {

                require(["app/models/policies", "app/views/PoliciesList"], function (model, PoliciesList) {

                    if(typeof(policies)==='undefined' || policies===null){
                        Useful.showSpinner();
                        policies = new model.PoliciesCollection({feed_domain:feed_domain});

                        policies.fetch({
                            success: function (collection) {
                                Useful.correctView(that.body);
                                slider.slidePage(new PoliciesList({collection: collection}).$el);                         
                                Useful.hideSpinner();
                            },
                            error:function(){                       
                                Useful.hideSpinner();
                                Useful.checkNetwork(slider);                       
                            }
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new PoliciesList({collection: policies}).$el);
                    }

                });
                
            

        },
        
        
        getPoliciesItem: function (id) {
            
            require(["app/views/PoliciesItem"], function (PoliciesItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new PoliciesItem({model: policies.get(id)}).$el);
                                 
            });
        },
                
        getNewsLetter: function (id) {

                require(["app/models/newsletter", "app/views/NewsLetterList"], function (model, NewsLetterList) {

                    if(typeof(newsletter)==='undefined' || newsletter===null){
                        Useful.showSpinner();
                        newsletter = new model.NewsLetterCollection({feed_domain:feed_domain});

                        newsletter.fetch({
                            success: function (collection) {
                                
                                Useful.correctView(that.body);
                                slider.slidePage(new NewsLetterList({collection: collection}).$el);                         
                                Useful.hideSpinner();
                            },
                            error:function(){
                        
                                Useful.hideSpinner();
                                Useful.checkNetwork(slider);
                        
                            }
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new NewsLetterList({collection: newsletter}).$el);
                    }

                });
                
            

        },
        
        
        getNewsLetterItem: function (id) {
            
            require(["app/views/NewsLetterItem"], function (NewsLetterItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new NewsLetterItem({model: newsletter.get(id)}).$el);
                                 
            });
        },
                
        getEvent: function () {
            
            require(["app/models/event", "app/views/EventList"], function (model, EventList) {
       
                if(typeof(event)==='undefined' || event===null){
                    Useful.showSpinner();
                    
                    event = new model.EventCollection();
                    
                    event.fetch({
                        success: function (collection) {
                            Useful.correctView(that.body);
                            slider.slidePage(new EventList({collection: collection}).$el);                          
                            Useful.hideSpinner();
                        },
                            error:function(){

                                Useful.hideSpinner();
                                Useful.checkNetwork(slider);
                        
                            }
                    });
                }
                else{
                    Useful.correctView(that.body);
                    slider.slidePage(new EventList({collection: event}).$el);
                }
                
                
                            
            });
        },
       
                
        getEventItem: function (id) {
            require(["app/views/EventItem"], function (EventItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new EventItem({model: event.get(id)}).$el);
                                 
            });
        },   
                
                
        getCalendar: function () {
            
            require(["app/models/calendar", "app/views/CalendarList"], function (model, CalendarList) {
       
                if(typeof(calendar)==='undefined' || calendar===null){
                    Useful.showSpinner();
                    
                    calendar = new model.CalendarCollection({feed_domain:feed_domain});
                    
                    calendar.fetch({
                        success: function (collection) {
                            Useful.correctView(that.body);
                            slider.slidePage(new CalendarList({collection: collection}).$el);                          
                            Useful.hideSpinner();
                        },
                            error:function(){
                        
                                Useful.hideSpinner();
                                Useful.checkNetwork(slider);
                        
                            }
                    });
                }
                else{
                    Useful.correctView(that.body);
                    slider.slidePage(new CalendarList({collection: calendar}).$el);
                }
                
                
                            
            });
        },
       
                
        getCalendarItem: function (id) {
            require(["app/views/CalendarItem"], function (CalendarItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new CalendarItem({model: calendar.get(id)}).$el);
                                 
            });
        },
                
                
        getFacebook: function () {
            
            require(["app/views/Facebook"], function (Facebook) { 
                Useful.correctView(that.body);
                slider.slidePage(new Facebook().$el);               
             });
        },
                
                
        getFacilities: function (id) {

                require(["app/models/facilities", "app/views/FacilitiesList"], function (model, FacilitiesList) {

                    if(typeof(facilities)==='undefined' || facilities===null){
                        Useful.showSpinner();
                        facilities = new model.FacilitiesCollection({feed_domain:feed_domain});

                        facilities.fetch({
                            success: function (collection) {
                                Useful.correctView(that.body);
                                slider.slidePage(new FacilitiesList({collection: collection}).$el);                         
                                Useful.hideSpinner();
                            },
                            error:function(){                   
                                Useful.hideSpinner();
                                Useful.checkNetwork(slider);                  
                            }
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new FacilitiesList({collection: facilities}).$el);
                    }

                });

        },
        
        
        getFacilitiesItem: function (id) {
            
            require(["app/views/FacilitiesItem"], function (FacilitiesItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new FacilitiesItem({model: facilities.get(id)}).$el);
                                 
            });
        },
        
        
        getCourse: function () {

                require(["app/models/course", "app/views/CourseList"], function (model, CourseList) {
                    
                    if(typeof(courses)==='undefined' || courses===null){
                        Useful.showSpinner();
                        courses = new model.CourseCollection({feed_domain:feed_domain});

                        courses.fetch({
                            success: function (collection) {
                                Useful.correctView(that.body);
                                slider.slidePage(new CourseList({collection: collection}).$el);                         
                                Useful.hideSpinner();
                            },
                            error:function(){                   
                                Useful.hideSpinner();
                                Useful.checkNetwork(slider);                  
                            }
                        });
                    }
                    else{
                        Useful.correctView(that.body);
                        slider.slidePage(new CourseList({collection: courses}).$el);
                    }

                });
                
            

        },
        
        
        getCourseItem: function (id) {
            
            require(["app/views/CourseItem"], function (CourseItem) {
                Useful.correctView(that.body);
                 slider.slidePage(new CourseItem({model: courses.get(id)}).$el);
                                 
            });
        },
                
                
        getMap: function () {
            
            require(["app/views/Map"], function (Map) {    
                var mapView = new Map({body:that.body});
                //mapView.delegateEvents();
                Useful.correctView(that.body);
                slider.slidePage(mapView.$el);
                mapView.render();
                
                that.body.find('#main-content').css('min-height', '500px');
             });
        },
                
                
        getContact: function () {
            
            require(["app/views/Contact"], function (Contact) { 
                Useful.correctView(that.body);
                slider.slidePage(new Contact().$el);               
             });
        },
                
        getNotification: function () {
            
            require(["app/models/device", "app/views/Notification"], function (model, Notification) {
                
                  if(typeof(deviceModel)==='undefined' || deviceModel===null){
                        Useful.showSpinner();
                        
                        
                        if(typeof(that.device_id)==='undefined' || that.device_id===null){
                            that.setDeviceDetails();
                        }
                        
                        deviceModel = new model.Device({id:that.device_id});


                        if(typeof(that.device_id)==='undefined' || that.device_id===null || typeof(that.api_key)==='undefined' || that.api_key===null){
                            Useful.hideSpinner();
                            Useful.correctView(that.body);
                            Useful.showAlert('Could not get notification settings, please try again later', 'Problem');
                            window.location.hash = "news";
                        }
                        else{   
                            deviceModel.fetch({
                                api: true,
                                headers: {device_id:that.device_id,api_key:that.api_key},        
                                success: function (data) {
                                    Useful.correctView(that.body);
                                    slider.slidePage(new Notification({model: data
                                                                        }).$el);   
                                    Useful.hideSpinner();
                                },
                                error:function(model, xhr, options){    
                                    Useful.hideSpinner();
                                    Useful.checkNetwork(slider);                  
                                }
                            });
                        }
                    
                  }else{    
                        Useful.correctView(that.body);
                        slider.slidePage(new Notification({model: deviceModel
                                                            }).$el);    
                  }

       
             });
        },
        
        
                
        getArticle: function (id) {
            // alert('in getArticle');
            require(["app/models/article", "app/views/Article"], function (models, Article) {
                               
                if(typeof(articles)==='undefined' || articles===null){
                    Useful.showSpinner();
                    
                    if(typeof(that.device_id)==='undefined' || that.device_id===null){
                        that.setDeviceDetails();
                    }

                    var article = new models.Article({id: id});

                    article.fetch({
                        api: true,
                        headers: {device_id:that.device_id,api_key:that.api_key},
                        success: function (data) {
                            
                            var articleView = new Article({model: data});

                            Useful.correctView(that.body);
                            slider.slidePage(articleView.$el);
                            
                            Useful.hideSpinner();

                            $.when(articleView.saveView()).done(function(data){
                                that.message_count = data.count;
                            });
          
                            data.set('seen', '1');

                        },
                        error:function(){                   
                            Useful.hideSpinner();
                            Useful.checkNetwork(slider);                  
                        }
                    });
                    
                }
                else{
                    
                    var articleView = new Article({model: articles.get(id), 
                                                   device_id:that.device_id,
                                                   api_key:that.api_key
                                                    });
                                                    
                    Useful.correctView(that.body);
                    slider.slidePage(articleView.$el);

                    $.when(articleView.saveView()).done(function(data){
                        that.message_count = data.count;
                    });

                    articles.get(id).set('seen', '1');

                }

            });

        },
        
        
        getArticles: function (project_title) {
            
            require(["app/models/article", "app/views/ArticleList"], function (models, ArticleList) {
             
                if(typeof(articles)==='undefined' || articles===null){
                    Useful.showSpinner();
                    
                    if(typeof(that.device_id)==='undefined' || that.device_id===null){
                        that.setDeviceDetails();
                    }
                    
                    if(typeof(that.device_id)!=='undefined' && that.device_id!==null){
                       
                        articles = new models.ArticleCollection({device_id: that.device_id, project_title: project_title
                                                                });

                        articles.fetch({
                            api: true,
                            headers: {device_id:that.device_id,api_key:that.api_key},
                            success: function (collection) {
                                Useful.correctView(that.body);
                                slider.slidePage(new ArticleList({collection: collection}).$el);
                                Useful.hideSpinner();
                            }, 
                            error:function(){                   
                                Useful.hideSpinner();
                                Useful.checkNetwork(slider);                  
                            }
                        }); 
                        
                    }
                    else{
                        Useful.showAlert('There was aproblem accessing messages, please close and reopen app and try again', 'One moment...');
                    }


                }
                else{

                    Useful.correctView(that.body);
                    slider.slidePage(new ArticleList({collection: articles}).$el);
                }
  

            });
        },
        
        
    getAlbums: function (id) {
            //body.removeClass('left-nav');
            require(["app/models/album", "app/models/project", "app/views/AlbumList"], function (model, projectModel, AlbumList) {
       
                if(typeof(albums)==='undefined' || albums===null){
                    
                    Useful.showSpinner();
                    
                    /*
                     * FOR BROWSER TESTING
                     */
                    /*
                    if(in_browser===true){
                        that.device_id = test_device_id;
                        that.api_key = test_api_key;
                    }
                    
                    if(is_emulator===true){
                        that.device_id = test_device_id;
                        that.api_key = test_api_key;
                    }*/
                    
                    if(typeof(that.device_id)==='undefined' || that.device_id===null){
                        that.setDeviceDetails();
                    }
                    
                    
                    if(typeof(flickr_api_key)==='undefined' || flickr_api_key===null){

                        console.log('before the when');
                        $.when(that.setProjectDetailsWait()).done(function(data){

                        });
                        console.log('after the when');
                    }

                    albums = new model.AlbumCollection({flickr_api_key:flickr_api_key, flickr_user_id:flickr_user_id});

                    albums.fetch({
                        full_url: false,
                        success: function (collection) {
                            Useful.correctView(that.body);
                            slider.slidePage(new AlbumList({collection: collection}).$el);
                            Useful.hideSpinner();
                        },
                        error: function(){
                                Useful.correctView(that.body);
                                Useful.hideSpinner();
                                Useful.checkNetwork(slider);
                        }
                    });
         


                }
                else{ 
                    Useful.correctView(that.body);
                    slider.slidePage(new AlbumList({collection: albums}).$el);
                }
                            
            });
        },
        
        
        
         getPhotos: function (id) {
            //body.removeClass('left-nav');
            require(["app/models/photo", "app/views/PhotoList"], function (model, PhotoList) {
                
                    Useful.showSpinner();
                    photos = new model.PhotoCollection([], {flickr_api_key:flickr_api_key,
                                                            flickr_user_id:flickr_user_id,
                                                            photoset_id:id});
                    
                    photos.fetch({
                        full_url: true,
                        success: function (collection) {
                            Useful.correctView(that.body);
                            slider.slidePage(new PhotoList({collection: collection}).$el);
                            Useful.hideSpinner();
                            
                            $('img.lazy').lazyload();                            
                            setTimeout(function(){
                                $(window).trigger('scroll');
                            },1000);
                        
                        },
                        error: function(){
                                Useful.correctView(that.body);
                                Useful.hideSpinner();
                                Useful.checkNetwork(slider);
                        }
                    });
                            
            });
        },
        
        getPhotoItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/PhotoItem"], function (PhotoItem) {
                 Useful.correctView(that.body);
                 slider.slidePage(new PhotoItem({model: photos.get(id)}).$el);
                           
            });
        },
                
        
        getTweets: function () {

            require(["app/models/tweet", "app/views/TweetList"], function (models, TweetList) {
     
                if(typeof(tweets)==='undefined' || tweets===null){
                    
                    Useful.showSpinner();
                    
                    tweets = new models.TweetCollection(); 
          
                    tweets.fetch({
                        api: true,
                        headers: {device_id:that.device_id,api_key:that.api_key},
                        success: function (collection) {
                            Useful.correctView(that.body);
                            slider.slidePage(new TweetList({collection: collection}).$el);                      
                            Useful.hideSpinner();
                        }, 
                        error: function(){
                                Useful.correctView(that.body);
                                Useful.hideSpinner();
                                Useful.checkNetwork(slider);
                        }
                    }); 
                    
                    
                }
                else{
                    Useful.correctView(that.body);
                    slider.slidePage(new TweetList({collection: tweets}).$el);
                }
                                 
            });
           
        },
        
        getTweetsItem: function (id) {
            
            require(["app/views/TweetItem"], function (TweetItem) {

                Useful.correctView(that.body);
                 slider.slidePage(new TweetItem({model: tweets.get(id)}).$el);
                                 
            });
        },
        
                
        setProjectDetails: function(){
    
            require(["app/models/project"], function (projectModel) {
              
                
                    project = new projectModel.Project({id:project_title});
                    //get flicker details

                    project.fetch({
                        api: true,
                        headers: {device_id:standard_device_id,api_key:standard_api_key},        
                        success: function (data) {

                            console.log('');

                            flickr_user_id = data.get('flickr_user_id');
                            flickr_api_key = data.get('flickr_api_key');
                            feed_domain = data.get('feed_domain');
         
                        },
                        error:   function(model, xhr, options){
                           console.log('in setProjectDetails error');
                        },
                    });     
            });    
        },
        
        
        setProjectDetailsWait: function(){
     
                    project = new projectModel.Project({id:project_title});

                    return project.fetch({
                        api: true,
                        async:false,
                        headers: {device_id:standard_device_id,api_key:standard_api_key},        
                        success: function (data) {
                            
                            console.log('after the success');

                            flickr_user_id = data.get('flickr_user_id');
                            flickr_api_key = data.get('flickr_api_key');
                            feed_domain = data.get('feed_domain');
         
                        },
                        error:   function(model, xhr, options){
                           console.log('in setProjectDetails error');
                        },
                    });     
  
        },


    });

});