package BoteWebClient.controller;

import BoteWebClient.service.SysteminfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


/**
 * Den 10.03.2024
 */

@Controller
@RequestMapping(value = {"/", "home"})
public class HomeController {

    @Autowired
    private SysteminfoService systeminfoService;



    @GetMapping
    public String getHome(Model model){

        // Server Laufzeit in Footer anzeigen
        systeminfoService.setBaseInformation(model);

        System.out.println("Get Home Controller");
        return "/home";
    }


}
