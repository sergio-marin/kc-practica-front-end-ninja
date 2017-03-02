var $ = require('jquery');

$(document).ready(function(){

    /*================================================
        Control de Menú Responsive
    =================================================*/
    $(".showhide").on("click", function(){
        var element =  $(".categories-menu");
        if (element.hasClass("visible")) {
            element.removeClass("visible");
        }
        else
        {
            element.addClass("visible");
        }
    });

    /*================================================
        Animación del Menú al Hacer Scroll
    =================================================*/
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
        var element = $(".categories");

        if (scroll >= 500) {
            element.addClass("nav-fixed-top-animate");
        } else {
            element.removeClass("nav-fixed-top-animate");
        }
        if (scroll >= 300) {
            element.addClass("nav-fixed-top-transition");
        } else {
            element.removeClass("nav-fixed-top-transition");
        }
        if (scroll >= 150) {
            element.addClass("nav-fixed-top");
        } else {
            element.removeClass("nav-fixed-top");
        }
    });

    /*================================================
        Videos Responsive
    =================================================*/
    $(function() {

        var $allVideos = $("iframe[src*='vimeo.com'], iframe[src*='youtube.com'], object, embed");

	    $allVideos.each(function() {
            $(this).parent().addClass('embed-container');
        });
    });
});

