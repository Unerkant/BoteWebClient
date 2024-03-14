package BoteWebClient.service;

import org.springframework.stereotype.Service;

/**
 * Den 14.03.2024
 */

@Service
public class RuntimeService {
    private final long startTime;

    public RuntimeService(){
        startTime = System.currentTimeMillis();
    }

    public String getRuntimeSinceStart(){

        long nowTime =  System.currentTimeMillis();
        long differenceInMillis = Math.abs(startTime - nowTime);

        int timeInSeconds = ((int) differenceInMillis) / 1000;
        int timeInMinutes = timeInSeconds / 60;
        int minutes = timeInMinutes % 60;
        int timeInHours = timeInMinutes / 60;
        int hours = timeInHours % 24;
        int timeInDays = timeInHours / 24;
        int days = timeInDays % 24;

        if (minutes <= 0 && hours <= 0 && days <= 0){
            return "Server ist gerade erst gestartet";
        }

        return "Server läuft seit " + getDaysText(days) + getHoursText(hours) + getMinutesText(minutes);
    }

    private String getMinutesText(int minutes){
        return minutes > 0 ? (minutes > 1 ? minutes + " Minuten " : " einer Minute ") : "";
    }

    private String getHoursText(int hours){
        return hours > 0 ? (hours > 1 ? hours + " Stunden " : " einer Stunde ") : "";
    }

    private String getDaysText(int days){
        return days > 0 ? (days > 1 ? days + " Tagen " : " einem Tag ") : "";
    }
}
