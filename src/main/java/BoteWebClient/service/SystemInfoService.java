package BoteWebClient.service;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;


/**
 * Den 17.03.2024
 */

@Service
public class SystemInfoService {

    private final long startTime;
    public long getStartTime() { return startTime; }
    public SystemInfoService() { startTime = System.currentTimeMillis();}

}
