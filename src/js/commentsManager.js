/*================================================
    Manager Comentarios
=================================================*/
var $ = require('jquery');
var commentsSvc = require('./commentsSvc');

module.exports = {

    setCommentsLoaded: function () {
        $('#comments').removeClass().addClass('loaded');
        return this;
    },

    setNoComments: function () {
        $('#comments').removeClass().addClass('no-comments');
        return this;
    },

    setError: function () {
        $('#comments').removeClass().addClass('error');
        return this;
    },

    setLoading: function () {
        $('#comments').removeClass().addClass('loading');
        return this;
    },

    getComments: function () {
        var self = this;

        self.setLoading();

        commentsSvc.getComments(function (comments) {
            if (comments.length == 0) {
                self.setNoComments();
            } else {
                self.renderComments(comments);
                self.setCommentsLoaded();
            }
        }, function (error) {
            self.setError();
        });
    },

    renderComments: function (comments) {
        var html = '';
        for (var i in comments) {
            var comment = comments[i];
            html += '<div class="comment">';
            html += '<div class="comment-message">';
            html += '<div class="comment-author">' + comment.author + '</div>';
            html += comment.message + '</div>';;
            html += '</div>';
            html += "</div>";
        }
        $(".comments-container").html(html);
    },
}