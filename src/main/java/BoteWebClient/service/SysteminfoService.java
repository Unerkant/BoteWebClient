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

    public void setBaseInformation(Model model){

        // anzeige in Header
        model.addAttribute("datum", LocalDateTime.now().withNano(0));
        // anzeige in footer(fragments)
        model.addAttribute("zeitstempel", runtimeService.getRuntimeSinceStart());

    }

}
