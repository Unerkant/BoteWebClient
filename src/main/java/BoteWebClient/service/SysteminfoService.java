package BoteWebClient.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.time.LocalDateTime;

/**
 * Den 17.03.2024
 */

@Service
public class SysteminfoService {

    @Autowired
    private RuntimeService runtimeService;

    private static long startTime;
    public SysteminfoService() { startTime = System.currentTimeMillis();}

    public void setBaseInformation(Model model){

        // anzeige in Header
        model.addAttribute("datum", LocalDateTime.now().withNano(0));
        // anzeige in Footer
        model.addAttribute("serverLaufZeit", runtimeService.getRuntimeSinceStart());
        //model.addAttribute("serverStartZeit", runtimeService.getStartTime());

    }



}
