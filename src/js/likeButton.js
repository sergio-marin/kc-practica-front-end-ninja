/*================================================
    Manejo del Botón LIKE
=================================================*/
var $ = require('jquery');
var likeManager = require('./likeManager');

likeManager.renderLikeButtons();

$('.like-button > span:first-child').on("click", function(){
    var postId = $(this).parent().closest('article').attr('id');
    likeManager.setLikeButton($(this), postId);
});