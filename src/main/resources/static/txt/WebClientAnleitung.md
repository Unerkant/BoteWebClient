/**
 * Den 20.03.2024
 * Text-layout Paul Richter
 */

                    Allgemeine Einstellungen

 ************************************************
 *  Hilfe Links
 ************************************************
 1. Icons herunterladen                     https://icons8.de/icons/set/zahnrad
    Color                                   https://brandcolors.net/
                                            https://colorhunt.co/

 ************************************************
 * Header
 ************************************************
 1. Color                                   hintergrund:    #FAFAFA
                                            border:         #EAEAEA

 ************************************************
 * Body
 ************************************************
 1.

 ************************************************
 * Bottom
 ************************************************
 1. Color                                   hintergrund:    #FAFAFA
                                            border:         #EAEAEA


 ************************************************
 *  Bilder     Link: https://icons8.de/icons/set/horn (hier waren alle Bilder erstellt)
 ************************************************
 1. Bild Adresse:                           Image = new Image("/static/img/archiv.png");
 2. Menü + Setting Bilder:                  100x100px(PNG)
 3. Logo Bild                               100x100px(SVG)
 4. Bilder-Color:                           Hintergrund: FFFFFF00 (Transparent)
                                            Black:  #000000
                                            Grau:   #808080 (dunkler, Text), #999999 (heller, Bilder)
                                            Blau:   #0050FF (dunkler), #0080FF (heller)
                                            Red:    #FF0000 (abfall)
                                            Green:  #00F700 (Uhr + Done + Hacken)
 5. Setting:                                Quadrat, corner radius 30% (Filled, Size 100%)
                                            Bilder Innenabstand:   30%(Setting) anderer 10%

  ACHTUNG: #0080FF ist heller als #0050FF, die 0080FF wird für die Bilder genutzt und
           die dunklere #0050FF wird für den zurück, links oder pfeile benutzt (OK oder Abbrechen Buttons)

 ************************************************
 *  Text
 ************************************************
 1. Color:                                  #000080(NAVY, duncler Blau), #808080(Grau)
 2. font-family allgemein                   16px (System Standard) Black
    font-family (dün):                      Monospaced, Times New Roman


 ************************************************
 *  Hover-Effect
 ************************************************
 1.  Freunde-Visited                        -fx-background-color: #CCEEFF; // blau 90%
     Setting-Hover-effect                   -fx-background-color: #E5F5FF; // blau 95%



 ************************************************
 *  Link in Project
 ************************************************
 1. String                                  file = "src/main/resources/static/txt/leander.txt";
                                                    "src/main/resources/static/json/leander.json"
 2. Bilder                                  Image = new Image("/static/img/archiv.png");
 3. anbindung von icon, style & js
                                            <style type="text/css"><!-- @import"/css/style.css"; --></style>
                                            <link data-th-href="@{/img/horn.png}" rel="icon" sizes="32x32" type="image/png">
                                            <link data-th-href="@{/css/style.css}" rel="stylesheet">
                                            <script data-th-src="@{/js/jquery@371.js}"></script>
 ACHTUNG: für den javascript MAP, unbedink den type angeben type="text/jsx" ansonsten zeigt Fehler an in
          Browser/untersuchen oder Element-Information console
                                            <script type="text/jsx" data-th-src="@{/js/sockjs.js.map}"></script>

 4. favicon.ico                             <link rel="icon" type="image/x-icon" href="/images/favicon.ico">
                                            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
                                            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
                                            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

 ************************************************
 *  CSS
 ************************************************
 font-family:                               "Rockwell", "Microsoft Sans Serif", "Courier", "Times", "Tahoma",
                                            "Sans-Serif", "Helvetica" -> Normal
                                                          "Courier New" -> *schmall*
 css anbindung Bilder                       background-image: url("../img/gitter.png");
 java-fx                                    -fx-background-image: url('/static/img/blaugrund.png');


 ************************************************
 *
 ************************************************


 ************************************************
 *
 ************************************************
 ************************************************