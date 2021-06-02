/* 

fichier nécessaire au bon fonctionnement du header : 
- /packages/header/header.js
- /packages/header/header.css
- /javascripts/packages/jquery.min.js

*/

//code html du header
var html_header = `<div class="title" onclick="goToIndex();">MyHealth <img class="iconeLogo" src="/packages/images/logo.png" alt="logo" /></div>
                   <div class="btLogout" onclick="deconnexion();">Se déconnecter</div>`;
//permet d'inclure le code html du header dans la page au chargement
$(document).ready(function(){
    $("#header").html(html_header);
});

function deconnexion(){
    window.location.href = "/logout";
}

function goToIndex(){
    window.location.href = "/index";
}