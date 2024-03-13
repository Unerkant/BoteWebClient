package BoteWebClient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


/**
 * Den 10.03.2024
 */

@Controller
public class MessageController {



    @GetMapping(value = {"/", "/message"})
    public String index(){

        System.out.println("index");
        return "/message";
    }


}
