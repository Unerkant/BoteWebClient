'use strict';

/**
 *  Den 20.03.2024
 */

/**
 *  1 . die variable 'startzeit' ist in home.html(javascript: zeile 100) hinterlegt,
 *      var startzeit = [[${serverStartZeit}]]  Zeile: 100
 *
 *  2.  die home.html bekommt die value von 'startzeit' von
 *      SysteminfoService/ private static long startTime; Zeile: 33
 *      model.addAttribute("serverStartZeit", startTime); Zeile: 35
 */


 (function() {
    function laufZeit(){

        var nowTime = Date.now();
        var millis  = Date.now() - startzeit; /* 'startzeit' variable ist von home.html Zeile: 100 */
        var TimeInSeconds = Math.floor(millis / 1000);
        var seconds = TimeInSeconds % 60;
        var TimeInMinutes = Math.floor(TimeInSeconds / 60);
        var minutes = TimeInMinutes % 60;
        var TimeInHours = Math.floor(TimeInMinutes / 60);
        var hours = TimeInHours % 24;
        var TimeInDays = Math.floor(TimeInHours / 24);
        var days = TimeInDays % 24;

        if(minutes <= 0 && hours <= 0 && days <= 0){
            document.getElementById('aktuellezeit').innerHTML = "Server ist gerade erst gestartet";
        } else {
            document.getElementById('aktuellezeit').innerHTML = "Server läuft seit "
                                        + getDaysText(days) + getHoursText(hours) + getMinutesText(minutes);
        }

        setTimeout(laufZeit, 1000);
    }

    document.addEventListener('DOMContentLoaded', laufZeit);
 }());

 function getMinutesText(minutes){
    return minutes > 0 ? (minutes > 1 ? minutes + " Minuten " : " einer Minute ") : "";
 }

 function getHoursText(hours){
    return hours > 0 ? (hours > 1 ? hours + " Stunden " : " einer Stunde ") : "";
 }

 function getDaysText(days){
    return days > 0 ? (days > 1 ? days + " Tagen " : " einem Tag ") : "";
 }