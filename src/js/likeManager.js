/*================================================
    Manager Botón LIKE
=================================================*/
var $ = require('jquery');
var likeSvc = require('./likeSvc');

$('.like-button > span:first-child').each(function(){
    var postId = $(this).parent().closest('article').attr('id');
        if (likeSvc.checkLike(postId) == "true") {
           $(this).removeClass("fa-heart-o").addClass("fa-heart like");
        }
});

$('.like-button > span:first-child').on("click", function(){
    var postId = $(this).parent().closest('article').attr('id');

      if (likeSvc.checkLike(postId) == "true") {
        likeSvc.unsetLike(postId);
        $(this).removeClass("fa-heart like").addClass("fa-heart-o");
    }else{
        console.log($(this));
        likeSvc.setLike(postId);
        $(this).removeClass("fa-heart-o").addClass("fa-heart like");
    }
    
});