'use strict';

/**
 * Den 21.03.2024
 */

(function () {
	function uhrzeit() {
		var jetzt = new Date();
		var tag = jetzt.getDate(),
		    monat = jetzt.getMonth() + 1,
		    jahr  = jetzt.getFullYear();
		var	stunde = jetzt.getHours(),
			minute = jetzt.getMinutes(),
			sekunde = jetzt.getSeconds();

		var minute = fuehrendeNull(minute);
		var sekunde = fuehrendeNull(sekunde);

		document.getElementById('jahrAnzeige').innerHTML =  tag + '.' + monat + '.' + jahr;
		document.getElementById('zeitAnzeige').innerHTML =  stunde + ':' + minute + ':' + sekunde;
		setTimeout(uhrzeit, 500);
	}

	function fuehrendeNull(zahl) {
		zahl = (zahl < 10 ? '0' : '') + zahl;
		return zahl;
	}
	document.addEventListener('DOMContentLoaded', uhrzeit);
}());