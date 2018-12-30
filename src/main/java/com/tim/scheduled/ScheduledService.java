package com.tim.scheduled;

import com.tim.config.TBConf;
import com.tim.pool.WebDriverPoolChrome;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ScheduledService {


    @Autowired
    private WebDriverPoolChrome webDriverPoolChrome;

    /**
     * 定时任务 （定时采集chrome数据）（每小时启动一次）
     */
    @Scheduled(cron = "0 0 */1 * * *")
    public void scheduled(){
        log.info("定时器判断启动");
        webDriverPoolChrome.start();
    }


}
