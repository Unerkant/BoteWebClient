'use strict';
/**
 *  Den 17.3.2024
 */

 var stompClient = null;
 var meineId = 12;
 function connect() {


    var socket = new SockJS("http://localhost:8076/register");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {

        stompClient.subscribe('/messages/receive/', function (message) {

           try{
                var messageOutput = JSON.parse(message.body);
                var privat = "";
                showMessage(messageOutput, privat)
           } catch(e){
                $("#textAusgabe").append("<tr><td colspan='3' style='padding: 0.6em;' >"
                        + "<span class='Rot'>" + e.message + "</span>"
                        + "</td></tr>");
           }
        });


        stompClient.subscribe('/messages/receive/' + meineId, function(msg){

            try{
                var meineMessage = JSON.parse(msg.body);
                var privat = "(Privat)";
                showMessage(meineMessage, privat);
            } catch(e){
                $("#textAusgabe").append("<tr><td colspan='3' style='padding: 0.6em;' >"
                                        + "<span class='Rot'>" + e.message + "</span>"
                                        + "</td></tr>");
            }

        });

        setConnected(true);

    }, function(err){
        // reagiert nur auf defekten 'new SockJS('/registrieren')'... defekt: new SockJS('/reg');
        disconnect(err)
    });
 }


 function sendMessage(){

    var id = $("#userId").val();
    var name = $("#userName").val();
    var text = $("#messageText").val();
    if(id.length === 0){
        $("#userId").focus();
        return;
    }
    if(name.length === 0){
        $("#userName").focus();
        return;
    }
    if(text.length === 0){
        $("#messageText").focus();
        return;
    }

    stompClient.send("/app/messages", {}, JSON.stringify({'recipient' : id, 'name' : name, 'text': text }));
 }


 function showMessage(message, privat){

    $("#textAusgabe").append("<tr><td colspan='3' style='padding: 0.6em;' >"
                            + "<b class='Rot'> " + message.recipient + " </b>"
                            + "<b class='twilight'> : " + message.name + "</b>"
                            + "<small class='Rot'> " + privat  + " </small>"
                            + "&#160;&#160;&#160;" + message.text + "</td></tr>");
    textareaLeeren();
 }


 function textareaLeeren(){
    $("#messageText").val("");
    $("#messageText").focus();
 }


 function setConnected(connected) {
     $("#infoAnzeigen").text("Verbunden mit Socket").addClass("Grun");
     $("#textAusgabe").html("");
 }


 function disconnect(fehler) {
    if(stompClient != null) {
        stompClient.close();
    }
    setConnected(false);
    $("#infoAnzeigen").removeClass("Grun");
    $("#infoAnzeigen").text(fehler).addClass("Rot");
 }


 $(function () {
     connect();
     $("form").on('submit', (e) => e.preventDefault());
     //$( "#connect" ).click(() => connect());
     //$( "#disconnect" ).click(() => disconnect());
     $( "#send" ).click(() => sendMessage());
 });
