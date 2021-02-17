
var msgBox = function(options){

    this.title = options.title;
    this.message = options.message;

    //activé par défaut
    this.showOnCreate = typeof(options.showOnCreate) !== "undefined" ? options.showOnCreate : true;

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
        $("#" + base.id).removeClass("hide");
    }

    this.hide = function(){
        $("#" + base.id).addClass("hide");
    }

    this.destroy = function(){
        $("#" + base.id).remove();
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
        setTimeout(function(){
            $("#" + base.id).css("left", "calc(50% - " + (base.getWidth()/2) + "px");
        }, 250)
    }

    this.setHeight = function(height){
        $("#" + base.id).css("height", height);
        setTimeout(function(){
            console.log(base.getHeight());
            $("#" + base.id).css("top", "calc(50% - " + (base.getHeight()/2) + "px");
        }, 250)
    }

    this.setWidthAndHeight = function(width, height){
        base.setWidth(width);
        base.setHeight(height);
    }

    //initialisation ---------------------------------------------------------------------
    this.html = `<div id="` + this.getMyIdAtCreation() + `" class="msgBox hide">
                    <div class="title"></div>
                    <div class="message"></div>
                </div>`;

    $("body").append(this.html);
    this.setTitle(this.title);
    this.setMessage(this.message);

    if(this.showOnCreate){
        setTimeout(function(){ //setTimeout pour laisser le temps à l'objet d'entrer dans la page
            base.show();
        }, 20)
    }
    
    //------------------------------------------------------------------------------------

}