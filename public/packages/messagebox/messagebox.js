
var msgBox = function(options){

    this.title = options.title;
    this.message = options.message;
    
    //activé par défaut
    this.showOnCreate = typeof(options.showOnCreate) !== "undefined" ? options.showOnCreate : true;
    this.width = typeof(options.width) !== "undefined" ? options.width : "50%";
    this.height = typeof(options.height) !== "undefined" ? options.height : "50%";

    this.id = null;

    var base = this;

    this.getMyIdAtCreation = function(){
        var i = 0;
        var msgBoxFound = false;
        while(!msgBoxFound){
            if($("#msgBox" + i).length <= 0){
                base.id = "msgBox" + i;
                return base.id;
            }
            i++;
        }
    }

    this.show = function(){
        $("#background" + base.id).removeClass("hide");
    }

    this.hide = function(){
        $("#background" + base.id).addClass("hide");
    }

    this.destroy = function(){
        $("#background" + base.id).remove();
    }

    this.setTitle = function(title){
        base.title = title;
        $("#" + base.id + " .title").html(base.title);
    }

    this.setMessage = function(message){
        base.message = message;
        $("#" + base.id + " .message").html(base.message);
    }

    this.getWidth = function(){
        return $("#" + base.id).width();
    }

    this.getHeight = function(){
        return $("#" + base.id).height();
    }

    this.setWidth = function(width){
        $("#" + base.id).css("width", width);
    }

    this.setHeight = function(height){
        $("#" + base.id).css("height", height);
    }

    this.setWidthAndHeight = function(width, height){
        base.setWidth(width);
        base.setHeight(height);
    }

    this.hideAndDestoy = function(){
        base.hide();
        setTimeout(function(){
            base.destroy();
        }, 200)
    }

    this.initMethodes = function(){

        //init width/height
        base.setWidthAndHeight(base.width, base.height);

        //initialisation la fonction du bouton permettant de fermer la msgbox
        $("#" + base.id + " .closeMsgBox").unbind();
        $("#" + base.id + " .closeMsgBox").click(function(){
            base.hideAndDestoy();
        });
    }

    //initialisation de l'id
    this.getMyIdAtCreation();

    //initialisation ---------------------------------------------------------------------
    this.html = `<div id="background${this.id}" class="background_msgbox hide"><div id="${this.id}" class="msgBox hide">
                    <div class="title">${this.title}<i class="closeMsgBox fas fa-times"></i></div>
                    <div class="message">${this.message}</div>
                </div></div>`;

    //ajout du composant à la page web
    $("body").append(this.html);

    //initialisation des methodes du composant
    this.initMethodes();

    if(this.showOnCreate){
        setTimeout(function(){ //setTimeout pour laisser le temps à l'objet d'entrer dans la page
            base.show(); //affichage de la message box
        }, 20)
    }
    
    //------------------------------------------------------------------------------------

}