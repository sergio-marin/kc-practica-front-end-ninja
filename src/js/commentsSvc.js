/*================================================
    Servicio Comentarios
=================================================*/
var $ = require('jquery');
var API_URL = '/api/comments/';

module.exports = {

    getComments: function(successCallback, errorCallback){
        $.ajax({
            url: API_URL,
            type: "get",
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("commentsSvc", error);
            }
        })
    },

    newComment: function(comment, successCallback, errorCallback) {
        $.ajax({
            url: API_URL,
            type: "post",
            data: comment,
            success: function(data) {
                console.error("Oh yeah!");
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("commentsSvc", error);
            }
        });
    }

};