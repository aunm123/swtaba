package com.tim.scheduled;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.tim.config.TBConf;
import com.tim.entity.TKey;
import com.tim.entity.TUrlCache;
import com.tim.magic.PackageCouponData;
import com.tim.pool.WebDriverPoolChrome;
import com.tim.service.*;
import com.tim.service.impl.TKeyServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
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
    @Autowired
    private ITUrlCacheService urlCacheService;
    @Autowired
    private ITItemService itemService;
    @Autowired
    private ITTbkItemService itTbkItemService;
    @Autowired
    private ITItemContentService itemContentService;
    @Autowired
    private ITItemImgService itemImgService;

    /**
     * 定时任务 （定时采集chrome数据）（每小时启动一次）
     */
    @Scheduled(cron = "0 0 0/1 * * *")
    public void scheduled(){
        log.info("定时器判断启动");
        webDriverPoolChrome.start();
    }



    /**
     * 定时任务 （定时关键字数据）（每天启动一次）
     */
    @Scheduled(cron = "0 0 0 0/1 * *")
    public void keyword_scheduled(){

        log.info("开始清理item数据");
        // 每天清理所有item数据
        Wrapper allWrap = new EntityWrapper<>();
        itemService.delete(allWrap);
        itTbkItemService.delete(allWrap);
        itemContentService.delete(allWrap);
        itemImgService.delete(allWrap);

        List<TKey> keys = keyService.selectList(new EntityWrapper<>());
        // 每个关键字都查找n页面
        for(TKey key : keys){
            for (int i = 1; i <= 2; i++) {
                packageCouponData.packWithWord2(key.getKey(), i, 200);
            }
        }
    }

    /**
     * 定时任务 （定时清理cache）（每小时启动一次）
     */
    @Scheduled(cron = "0 0 0/1 * * *")
    public void urlCache_scheduled(){

        List<TUrlCache> urlCaches = urlCacheService.selectList(new EntityWrapper<>());
        for (TUrlCache urlCache : urlCaches){
            Date createDate = urlCache.getCreateDate();
            Long timec = new Date().getTime() - createDate.getTime();
            if (timec >= (3600 * 24 * urlCache.getMaxAge())){
                // 大于缓存设置的天数，即删除
                urlCacheService.deleteById(urlCache.getId());
            }
        }
    }


}
