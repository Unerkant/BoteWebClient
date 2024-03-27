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

        // gesendet an Home.html / javascript Zeile: 105 (var startzeit = /*[[${systemStartZeit}]]*/ null;)
        model.addAttribute("systemStartZeit", systeminfoService.getStartTime());

        return "/home";
    }


}
