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
        //console.log($(window).width());
        if($(window).width() > 751)
        {
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
        iFrames Responsive
    =================================================*/
    $(function() {

        var allVideos = $("iframe[src*='vimeo.com'], iframe[src*='youtube.com'], object, embed");

	    allVideos.each(function() {
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

    /*================================================
        Mostrar Fechas de Publicación Relativas
    =================================================*/
    var moment = require('moment');
    var dates = new Array();
    var i = 0;

    dates.push(moment().subtract(10, 'seconds'));
    dates.push(moment().subtract(40, 'seconds'));
    dates.push(moment().subtract(10, 'minutes'));
    dates.push(moment().subtract(30, 'minutes'));
    dates.push(moment().subtract(3, 'hours'));
    dates.push(moment().subtract(9, 'hours'));
    dates.push(moment().subtract(3, 'days'));
    dates.push(moment().subtract(8, 'days'));
    dates.push(moment().subtract(6, 'months'));
    dates.push(moment().subtract(2, 'years'));

    $('article span.time').each(function(){
        $(this).attr("date", moment(dates[i]).format());
        i++;
    });

    setInterval(function() {
        $('article span.time').each(function(){
            var dif = moment().diff(moment($(this).attr("date")));
            if(dif > 604800000) { // 7 días
                $(this).text(moment($(this).attr("date")).format("MMM Do YYYY h:mm a"));
            } else if(dif > 86400000) { // 1 día
                $(this).text(moment(dif).format("dddd"));
            } else if(dif > 3600000) { // 1 h
                $(this).text(moment($(this).attr("date")).fromNow());
            } else if(dif > 60000) { // 1 min
                $(this).text(moment(dif).format("m") + " minutes ago" );
            } else {
                $(this).text(moment(dif).format("s") + " seconds ago");
           }
           
        });
    } , 1000);

    /*================================================
        Cargar Comentarios
    =================================================*/
    var commentsManager = require('./commentsManager.js');

    commentsManager.getComments();

});

