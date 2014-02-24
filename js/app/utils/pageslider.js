define(function (require) {

    "use strict";

    return function PageSlider(container) {

        var currentPage,
            stateHistory = [], div;

        this.back = function () {
            location.hash = stateHistory[stateHistory.length - 2];
        };

        // Use this function if you want PageSlider to automatically determine the sliding direction based on the state history
        this.slidePage = function (page) {

            var l = stateHistory.length,
                state = window.location.hash;
        
            console.log('stateHistory is ')
            console.log(stateHistory);
        
            this.prepareTitle(state);
           
        
            if (l === 0) {
                stateHistory.push(state);
                this.slidePageFrom(page);
                return;
            }
            if (state === stateHistory[l - 2]) {
                stateHistory.pop();
                this.slidePageFrom(page, 'page-left');
            } else {
                stateHistory.push(state);
                this.slidePageFrom(page, 'page-right');
            }

        };
        
        this.prepareTitle = function(str){
                            
                str = str.split('/')[0];          
                str = str.replace('-',' ');
                str = str.replace('#','');                
                str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
                if(str==="") str="News";
                $('.topcoat-navigation-bar__title').html(str);
            
        };

        // Use this function directly if you want to control the sliding direction outside PageSlider
        this.slidePageFrom = function (page, from) {

   
            $('.main-content').append(page);

            if (!currentPage || !from) {
                page.attr("class", "page page-center");
                currentPage = page;
                return;
            }

            // Position the page at the starting position of the animation
            page.attr("class", "page " + from);

            currentPage.one('webkitTransitionEnd', function (e) {
                
                
                if(from=='page-left'){
                    $('.page-right').remove();
                }
                else{
                    $('.page-left').remove();                    
                }
            });

            // Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
            container[0].offsetWidth;

            // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
            page.attr("class", "page transition page-center");
            currentPage.attr("class", "page transition " + (from === "page-left" ? "page-right" : "page-left"));
            //currentPage.attr("class", "page transition page-right");
            currentPage = page;
        };

    };

});