/**
 *  Den 17.3.2024
 */

 var stompClient = null;
 function connect() {

    var socket = new SockJS("http://localhost:8076/register");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {

        stompClient.subscribe('/messages/receive/', function (message) {
            var messageOutput = JSON.parse(message.body);

            // message Ausgabe
            showMessage(messageOutput);
        });

        setConnected(true);

    }, function(err){
        // reagiert nur auf defekten 'new SockJS('/registrieren')'... defekt: new SockJS('/reg');
        disconnect(err)
    });
 }


 function sendMessage(){

    var text = $("#messageText").val();
    if(text.length === 0){
        $("#messageText").focus();
        return;
    }

    stompClient.send("/app/messages", {}, JSON.stringify({'name' : text, 'text': new Date }));
 }


 function showMessage(message){

    $("#textAusgabe").append("<tr><td>" + message.text + ": &#160;&#160;" + message.name + "</td></tr>");
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
