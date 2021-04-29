
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

//renvoie true ou false si la date est une date de naissance valide
function verifIfDateNaissanceIsValide(date){

	var annee = parseInt(date.split("-")[0]);
    var mois = parseInt(date.split("-")[1]);
    var jour = parseInt(date.split("-")[2].split("T")[0]);

    var dateNow = new Date();
    var dateNaissanceEnDateTime = new Date();

    dateNaissanceEnDateTime.setFullYear(annee);
    dateNaissanceEnDateTime.setMonth(mois-1);
    dateNaissanceEnDateTime.setDate(jour);

    if(dateNaissanceEnDateTime > dateNow)
        return false;

    if(dateNaissanceEnDateTime.getFullYear() != annee || (dateNaissanceEnDateTime.getMonth() + 1) != mois || dateNaissanceEnDateTime.getDate() != jour)
        return false;

    if((dateNow.getFullYear() - dateNaissanceEnDateTime.getFullYear()) > 120)
        return false;

    return true;
}

function getAgeYearAndMonth(birthday)
{
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    var ageYear = Math.abs(ageDate.getUTCFullYear() - 1970);
    var ageMonth = Math.abs((new Date(Date.now() - birthday)).getUTCMonth());
    return [ageYear, ageMonth];
}

function getAgeOfDatabase(age)
{
    var ageSplit = age.split(".");
    var tabToReturn = [];

    for(var i = 0; i < 3; i++)
    {
        if(ageSplit[i] !== undefined)
        {
            tabToReturn.push(ageSplit[i]);
        }else
            tabToReturn.push(0);
    }

    return tabToReturn;
}

//passé une date format javascript en parametre, renvoie un string au format mysql
exports.dateJsToSql = dateJsToSql;

//passé une date format sql en parametre, renvoie une date au format js
exports.dateSqlToJs = dateSqlToJs;

//passé une date format sql, renvoie un string à la date de type française
exports.dateSqlToDateFR = dateSqlToDateFR;

//recupere une date now au format SQL
exports.getDateNowSQL = getDateNowSQL;

//renvoie true ou false si la date est passé en parametre est une date de naissance valide
exports.verifIfDateNaissanceIsValide = verifIfDateNaissanceIsValide;

//renvoie l'age de la date de naissance passé en paramètre
exports.getAgeYearAndMonth = getAgeYearAndMonth

exports.getAgeOfDatabase = getAgeOfDatabase;