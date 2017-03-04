/*================================================
    Servicio Botón LIKE
=================================================*/
var $ = require('jquery');

module.exports = {

    setLike: function(postId){
        if (typeof(Storage) !== "undefined") {
            console.log(postId);
            localStorage.setItem(postId, true);
        } else {
            // No Web Storage support..
        }
    }, 

    unsetLike: function(postId){
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem(postId, false);
        } else {
            // No Web Storage support..
        }
    },

    checkLike: function(postId){
        if (typeof(Storage) !== "undefined") {
            return localStorage.getItem(postId);
        } else {
            // No Web Storage support..
        }
    }

}