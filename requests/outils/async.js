
//permet de boucler de maniere asynchrone (et permettre des requetes dans une boucle for)
function forAsync(array, todo, atend, index = 0){

    var item = array[index];

    todo(item, index, function(){
        if(index < array.length - 1){
            index = index + 1;
            forAsync(array, todo, atend, index);
        }
        else
            atend();
    });
}

exports.forAsync = forAsync;