'use strict';
/**
 *  Den 17.3.2024
 */

 var stompClient    = null;

 function connect() {

    var userClient = $("#userName").val();


    var socket = new SockJS("http://localhost:8076/register");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {

        stompClient.subscribe('/messages/receive/' + userClient, function (message) {

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


        setConnected();
        reconnect(false);   // sperrt setTimeout aus, Zeile: 130
        if(userClient){
            $("#mitWemVerbunden").removeClass("Rot");
            $("#mitWemVerbunden").html("Registriert als:  <b>"+ userClient +"</b>").addClass("twilight");
        }

    }, function(err){
        // reagiert nur auf defekten 'new SockJS('/registrieren')'... defekt: new SockJS('/reg');
        disconnect(err);
        reconnect(true); // Startet setTimeout/connect wenn Server ausfällt
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
    message.recipient == "" ?  privat = "" : privat = "( privat )";
    message.name == "" ? anonym = "Anonymous" : anonym = message.name;
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


 function setConnected() {
     $("#infoAnzeigen").text("Verbunden mit Socket").addClass("Grun");
     $("#messageAusgabe").html("");
     $("#recipientBox").hide();
     $("#messageBox").show();
     if($("#repicientName").val() == null){
        $("#mitWemVerbunden").text("Sie sind nicht Registriert, keine Persönliche Post möglich!").addClass("Rot");
     }
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

    /*
    *   wenn sollte gelöscht werden, weitere component zu löschen
    *   Zeile: 46 + 55 (reconnect)
    */
 var timerOutId;
 function reconnect(boolean){

    if(boolean){
        timerOutId = setTimeout(() => {
            connect();
        }, 5000);

    } else {

        timerOutId == null ? "" : clearTimeout(timerOutId); timerOutId = null;

    }
 }

