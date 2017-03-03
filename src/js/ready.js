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
        console.log($(window).width());
        if($(window).width() > 751)
        {
            console.log("oH YEah");
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

    /*================================================
        Smooth Scroll
    =================================================*/
   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});

    /*================================================
        Mostrar/Ocultar Input de Búsqueda
    =================================================*/
   $('#search-btn').on('click',function (e) {
        var element =  $("input[name='search']");
        if(element.css('visibility') == 'hidden') {
            console.log("escondido");
            $('.top-links li').css('visibility', 'hidden');
            element.css('visibility', 'visible');
            element.siblings("a").addClass("active");
            element.siblings("a").css('visibility', 'visible');
        } else {
            element.css('visibility', 'hidden');
            element.siblings("a").removeClass("active");
            $('.top-links li').css('visibility', 'visible');
        }
	});
    $(window).scroll(function() {  
        var element =  $("input[name='search']");  
        var scroll = $(window).scrollTop();
        if (scroll >= 1) {
            element.css('visibility', 'hidden');
            element.siblings("a").removeClass("active");
            $('.top-links li').css('visibility', 'visible');
        }
    });

});

