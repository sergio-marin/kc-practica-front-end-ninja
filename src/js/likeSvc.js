/*================================================
    Servicio Botón LIKE
=================================================*/
var $ = require('jquery');

module.exports = {

    setLike: function(postId){
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem(postId, true);
            console.log("Estableciendo " + postId + " a " + localStorage.getItem(postId));
        } else {
            // No Web Storage support..
        }
    }, 

    unsetLike: function(postId){
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem(postId, false);
            console.log("Estableciendo " + postId + " a " + localStorage.getItem(postId));
        } else {
            // No Web Storage support..
        }
    },

    checkLike: function(postId){
        if (typeof(Storage) !== "undefined") {
            console.log("Comprobando: " + postId + " - " + localStorage.getItem(postId));
            return localStorage.getItem(postId);
        } else {
            // No Web Storage support..
        }
    }

}