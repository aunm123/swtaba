package com.tim.scheduled;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.tim.config.TBConf;
import com.tim.entity.TKey;
import com.tim.magic.PackageCouponData;
import com.tim.pool.WebDriverPoolChrome;
import com.tim.service.impl.TKeyServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class ScheduledService {


    @Autowired
    private WebDriverPoolChrome webDriverPoolChrome;

    @Autowired
    PackageCouponData packageCouponData;

    @Autowired
    private TKeyServiceImpl keyService;

    /**
     * 定时任务 （定时采集chrome数据）（每小时启动一次）
     */
    @Scheduled(cron = "0 0 */1 * * *")
    public void scheduled(){
        log.info("定时器判断启动");
        webDriverPoolChrome.start();
    }



    /**
     * 定时任务 （定时关键字数据）（每天启动一次）
     */
    @Scheduled(cron = "0 0 0 */1 * *")
    public void keyword_scheduled(){

        List<TKey> keys = keyService.selectList(new EntityWrapper<>());
        // 每个关键字都查找n页面
        for(TKey key : keys){
            for (int i = 1; i <= 2; i++) {
                packageCouponData.packWithWord2(key.getKey(), i, 200);
            }
        }
    }


}
