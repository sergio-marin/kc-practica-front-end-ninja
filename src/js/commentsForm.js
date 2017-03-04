/*================================================
    Manejo del formulario para los Comentarios
=================================================*/
var $ = require('jquery');
var commentsManager = require('./commentsManager');
var commentsSvc = require('./commentsSvc');

$('#comments-form form').on("submit", function(){
    var self = this;

    var inputs = $(this).find("input").each(function(){
        var input = this;
        if (input.checkValidity() == false) {
            alert(input.validationMessage);
            input.focus();
            return false;
        }
    });

    var comment = {
        author: $("#name").val(),
        email: $("#email").val(),
        message: $("#comment-message").val(),
    };

    $(this).find("button").text("Sending comment...").attr("disabled", true);

    commentsSvc.newComment(comment, function(data) {
        alert("Tu comentario se ha enviado!");
        self.reset();
        $(self).find("button").text("Send comment").attr("disabled", false);
        commentsManager.getComments();
    }, function(error) { // si no se guarda
        console.log("Se ha producido un error");
        $(self).find("button").text("Send comment").attr("disabled", false);
    });

    return false;

});