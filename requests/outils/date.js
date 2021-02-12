
function getDateNowSQL(){
    return dateJsToSql((new Date()).toISOString());
}

function dateJsToSql(date){

	if(typeof(date) == "string"){
		date = new Date(date);
		date.addHours(((date.getTimezoneOffset())/60)*-1);
	}

	return date.toISOString().slice(0, 19).replace('T', ' ');	
}

function dateSqlToJs(date){
	var nbHoursToAdd = ((new Date().getTimezoneOffset())/60)*-1;
	return (new Date(date.replace(" ", "T")).addHours(nbHoursToAdd));
}

function dateSqlToDateFR(date){
	
	var dateJS = date.split(" ")[0];
	var timeJS = date.split(" ")[1];
	
	return dateJS.split("-")[2] + "/" + dateJS.split("-")[1] + "/" + dateJS.split("-")[0] + " " + timeJS;
}

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

//passé une date format javascript en parametre, renvoie un string au format mysql
exports.dateJsToSql = dateJsToSql;

//passé une date format sql en parametre, renvoie une date au format js
exports.dateSqlToJs = dateSqlToJs;

//passé une date format sql, renvoie un string à la date de type française
exports.dateSqlToDateFR = dateSqlToDateFR;

//recupere une date now au format SQL
exports.getDateNowSQL = getDateNowSQL;