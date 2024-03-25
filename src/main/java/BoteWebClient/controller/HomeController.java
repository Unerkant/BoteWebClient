package BoteWebClient.controller;

import BoteWebClient.service.SystemInfoService;
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
    private SystemInfoService systeminfoService;



    @GetMapping
    public String getHome(Model model){

        // Server Start Zeit senden an home.html
        systeminfoService.getServerStartZeit(model);

        return "/home";
    }


}
