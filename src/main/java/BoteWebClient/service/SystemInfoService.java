package BoteWebClient.service;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;


/**
 * Den 17.03.2024
 */

@Service
public class SystemInfoService {

    private final long startTime;
    public SystemInfoService() { startTime = System.currentTimeMillis();}



    public void getServerStartZeit(Model model){

        // gesendet an home.html zu javascript, Zeile: 100
        model.addAttribute("serverStartZeit", startTime);

    }



}
