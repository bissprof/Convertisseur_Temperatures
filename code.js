/*
 FICHIER JAVASCRIPT
 */

function log(txt){ console.log(txt); }
function page_chargee() {
    log('Page chargée');   
    var el_entree = document.getElementById("entree");
    el_entree.addEventListener("change",saisie_change);
}
function saisie_change() {
	log("Saisie change");
	var val = getter();
	var regex = /(\d*\.?\d+)\s*(\D*)$/;
	var result = val.match(regex);
	var unite = "C";
	val = 0;
	if ( result ) {
		if ( result[2] != '' ) unite = result[2][result[2].length-1];
		unite = unite.toUpperCase();
		val = result[1];
	}		
	var tK = conv_2K(unite,val);
	var div_pere = document.getElementById("resultats");
	div_pere.innerHTML = "";
	if ( !isNaN(tK) ) { 
		resultat(conv_K2C(tK),"°C");
		resultat(conv_K2F(tK),"°F");
		resultat(tK,"K");
		resultat(conv_K2R(tK),"°R");
	}
	else { resultat(0,tK); }
}

function conv_2K(unite,val) {
	var fct = "conv_"+unite+"2K("+val+")";
	var retour = "";
	try { 
		var retour = eval(fct);
	}
	catch(e) { retour = "Syntaxe Erreur"; }
	return retour;
}

function conv_K2K(val) { return val; }
function conv_K2C(val) { return val-273.15; }
function conv_C2K(val) { return val+273.15; }
function conv_K2F(val) { return 1.8*val-459.67; }
function conv_F2K(val) { return (val+459.67)/1.8; }
function conv_R2K(val) { return val/1.8; }
function conv_K2R(val) { return val*1.8; }

function getter() {
    // Doit retourner la valeur saisie
    //  -> Retourne 0 si ce n'est pas une valeur numérique
    var el = document.getElementById("entree");
    //return parseFloat(el.value);
    return el.value;
}
function resultat(valeur,unite) {
	var elt = document.createElement("div");
	elt.setAttribute("class","conversion");
	var texte_unite = document.createElement("h2");
	texte_unite.innerHTML = unite;
	var texte_valeur = document.createElement("span");
	texte_valeur.setAttribute("class","valeur");
	texte_valeur.innerHTML = valeur.toFixed(2);

	elt.appendChild(texte_unite);
	elt.appendChild(texte_valeur);

	var div_pere = document.getElementById("resultats");
	div_pere.appendChild(elt);
}


window.addEventListener("load",page_chargee);

