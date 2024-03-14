package BoteWebClient.controller;

import BoteWebClient.model.Message;
import BoteWebClient.service.RuntimeService;
import BoteWebClient.service.SocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


/**
 * Den 10.03.2024
 */

@Controller
@RequestMapping(value = {"/", "home"})
public class HomeController {

    @Autowired
    private SocketService socketService;
    @Autowired
    private RuntimeService runtimeService;


    @GetMapping
    public String getHome(Model model){

        // Socket Start
        socketService.connect();
        zeitStempel(model);

        System.out.println("Get Home Controller");
        return "/home";
    }


    @PostMapping
    public String postHome(Model model, Message message,
                        @RequestParam(value = "messageInput", required = false) String textZugesendet ){

        model.addAttribute("textAusgabe", textZugesendet);

        // message Daten
        message.setName(String.valueOf(LocalDateTime.now()));
        message.setText(textZugesendet);

        // message Sensen, socketService Zeile: 160
        socketService.senden(message);
        zeitStempel(model);

        System.out.println("Post Home Controller");
        return "/home";
    }


    private void zeitStempel(Model model){
        model.addAttribute("datum", LocalDateTime.now().withNano(0));
        model.addAttribute("zeitstempel", runtimeService.getRuntimeSinceStart());
    }

}
