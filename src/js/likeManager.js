/*================================================
    Manager Botón LIKE
=================================================*/
var $ = require('jquery');
var likeSvc = require('./likeSvc');


module.exports = {

    setLikeClass: function (likeButton) {
        likeButton.removeClass("fa-heart-o").addClass("fa-heart like");
    },

    unsetLikeClass: function (likeButton) {
        likeButton.removeClass("fa-heart like").addClass("fa-heart-o");
    },

    renderLikeButtons: function () {
        $('.like-button > span:first-child').each(function(){
            var postId = $(this).parent().closest('article').attr('id');
            if (likeSvc.checkLike(postId) == "true") {
                module.exports.setLikeClass($(this));
            }
        }); 
    },

    setLikeButton: function(likeButton, postId){
        if (likeSvc.checkLike(postId) == "true") {
            likeSvc.unsetLike(postId);
            module.exports.unsetLikeClass(likeButton);
        }else{
            likeSvc.setLike(postId);
            module.exports.setLikeClass(likeButton);
        }
    },
}