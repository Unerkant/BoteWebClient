'use strict';
/**
 *  Den 17.3.2024
 */

 var stompClient    = null;
 var funfSekunden   = 5000;
 var sechsMinuten   = 360000;   // sechs Minuten in Millis
 var reconnectCount = 10;
 var reconnectStop  = 1;
 var timerOutId     = null;

 function connect() {

    var clientName = $("#recipientName").val();


    var socket = new SockJS("http://localhost:8076/register");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {

        stompClient.subscribe('/messages/receive/' + clientName, function (message) {

           try{
                var messageOutput = JSON.parse(message.body);
                showMessage(messageOutput);
           } catch(e){
                $("#messageAusgabe").append("<tr><td colspan='3' style='padding: 0.6em;' >"
                        + "<span class='Rot'>" + e.message + "</span>"
                        + "</td></tr>");
           }
        });


        stompClient.subscribe('/messages/receive/', function(msg){

            try{
                var meineMessage = JSON.parse(msg.body);
                showMessage(meineMessage);
            } catch(e){
                $("#messageAusgabe").append("<tr><td colspan='3' style='padding: 0.6em;' >"
                                        + "<span class='Rot'>" + e.message + "</span>"
                                        + "</td></tr>");
            }

        });


        setConnected(true);
        if(clientName){
            $("#mitWemVerbunden").removeClass("Rot");
            $("#mitWemVerbunden").html("Ihre Name:  <b>"+ clientName +"</b>").addClass("twilight");
        }

    }, function(err){
        // reagiert nur auf defekten 'new SockJS('/registrieren')'... defekt: new SockJS('/reg');
        disconnect(err)
        reconnectHandle();
    });
 }

 function sendMessage(){

    var recipientName = $("#recipientName").val();
    var userName    = $("#userName").val();
    var msgText     = $("#messageText").val();

    if(msgText.length === 0){
        $("#messageText").focus();
        return;
    }

    stompClient.send("/app/messages", {}, JSON.stringify({ 'name' : userName, 'text': msgText, 'recipient' : recipientName }));

 }


 function showMessage(message){
    var privat, anonym;
    message.name == "" ?  privat = "" : privat = "( privat )";
    message.recipient == "" ? anonym = "Anonymous" : anonym = message.recipient;
    $("#messageAusgabe").append("<tr style='padding: 0.6em;'><td >"
                            + "<b class='twilight'> " + anonym + " </b></td>"
                            + "<td colspan='2'><small class='Rot'> " + privat  + " </small>"
                            + "&#160;&#160;&#160;" + message.text + "</td></tr>");
    textareaLeeren();
 }


 function textareaLeeren(){
    $("#messageText").val("");
    $("#messageText").focus();
 }


 function setConnected(connected) {
     $("#infoAnzeigen").text("Verbunden mit Socket").addClass("Grun");
     $("#messageAusgabe").html("");
     $("#recipientBox").hide();
     $("#messageBox").show();
     if($("#repicientName").val() == null){
        $("#mitWemVerbunden").text("Sie sind nicht Registriert, keine Persönliche Post möglich!").addClass("Rot");
     }

     if(timerOutId != null){ clearTimesOuts(); }
 }


 function disconnect(fehler) {
    $("#infoAnzeigen").removeClass("Grun");
    $("#infoAnzeigen").text(fehler).addClass("Rot");
 }


  $(function () {

      //connect()
     $("form").on('submit', (e) => e.preventDefault());
     $( "#send" ).click(() => sendMessage());

     if(stompClient == null){
         disconnect("Server nicht Verbunden");
     }
  });


 /* <!-- :::::::::::::::::::::::: reconnect socket :::::::::::::::::::::: --> */

 function reconnectHandle(connectBoolean){

    if(reconnectStop == 1) {
        reconnect(funfSekunden);
        reconnectStop = 2;
    }

    if(reconnectStop == 3){
        reconnect(sechsMinuten);
        reconnectStop = 4;
    }

    if(reconnectStop == 5){
        clearTimesOuts(); // Server nach 1 Stunde nicht mehr erreichbar , reconnect abbrechen und Timer Löschen
    }
 }


 function reconnect(millis){
    for (let i = 1; i <= reconnectCount; i++) {

        timerOutId = setTimeout(() => {

            if(i == 10){
                reconnectStop++;
                clearTimeout(timerOutId);
                timerOutId = null;
            }

            connect();

        }, i * millis);
    }
 }


 function clearTimesOuts(){

    clearTimeout(timerOutId);
    timerOutId = null;
    disconnect("Bote Server läuft nicht, nach Serverneustart bitte Bote Web Client neu Starten ");
    console.log('Timer: ' + timerOutId);
 }

