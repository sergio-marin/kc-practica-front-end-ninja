/*================================================
    Manejo del formulario para los Comentarios
=================================================*/
var $ = require('jquery');
var commentsManager = require('./commentsManager');
var commentsSvc = require('./commentsSvc');

$(document).ready(function () {

    $("#comment-message, #comments-form form").on('keyup', function() {
        if(commentsManager.checkFormValidity()) {
            $('#comments-form form').find("button").attr("disabled", false);
        }
  	});

    $('#comments-form form').on("submit", function(){
        var self = this;

        var comment = {
            author: $("#name").val(),
            email: $("#email").val(),
            message: $("#comment-message").val(),
        };

        $(this).find("button").text("Sending comment...").attr("disabled", true);

        commentsSvc.newComment(comment, function(data) {
            alert("Your comment has been published!");
            self.reset();
            $(self).find("button").text("Send comment").attr("disabled", false);
            commentsManager.getComments();
        }, function(error) { // si no se guarda
            console.log("Error while saving the comment");
            $(self).find("button").text("Send comment").attr("disabled", false);
        });

        return false;

    });
});