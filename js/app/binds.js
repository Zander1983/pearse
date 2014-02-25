/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
define(function() {
    


    var doBinds = function(n) {

            var body = $('body');
            //var side_nav_list = $('#side-nav-list');

            body.on("click", "#slide-menu-button", function (e) {

                if (body.hasClass('left-nav')) {

                    body.removeClass('left-nav');
                   // $('.side-nav').hide();
                } else {
                   // $('.side-nav').show();
                    body.addClass('left-nav');           
                }
            });
            
            

            body.on("click", "#main-content", function (e) {

                body.removeClass('left-nav');
                //$('.side-nav').hide();

            });



            body.on('click', '.list a', function(event) {
                $(this).parent('li').addClass('tappable-active');
            });


                
            body.find("div#side-nav-cont a").click( function() {


              $( this ).parent().parent().parent().find('li').each(function(){
                  //console.log('in the each');
                  $( this ).removeClass( 'side-nav-active' );
              });

              $( this ).parent().addClass( 'side-nav-active' );


           });

    };
    
    return {
      doBinds: doBinds
    };
    
});