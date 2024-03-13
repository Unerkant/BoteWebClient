package BoteWebClient.controller;

import BoteWebClient.model.Message;
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
@RequestMapping(value = {"/", "message"})
public class MessageController {

    @Autowired
    private SocketService socketService;


    @GetMapping
    public String index(){

        // Socket Start
        socketService.connect();
            System.out.println("Get");
        return "/message";
    }

    @PostMapping
    public String index(Model model, Message message,
                        @RequestParam(value = "messageInput", required = false) String textZugesendet ){
        System.out.println("Post");

        model.addAttribute("textAusgabe", textZugesendet);

        message.setName(String.valueOf(LocalDateTime.now()));
        message.setText(textZugesendet);

        socketService.senden(message);

        return "/message";
    }



}
