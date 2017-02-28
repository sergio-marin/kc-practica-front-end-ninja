var $ = require('jquery');

$(document).ready(function(){

    /*================================================
                Control de Menú Responsive
    =================================================*/
    $(".showhide").on("click", function(){
        var el =  $(".categories-menu");
        if (el.hasClass("visible")) {
            el.removeClass("visible");
        }
        else
        {
            el.addClass("visible");
        }
        
    });
    
});