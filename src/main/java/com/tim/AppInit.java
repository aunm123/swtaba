package com.tim;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.tim.config.TBConf;
import com.tim.entity.TItem;
import com.tim.entity.TKey;
import com.tim.entity.TTbkItem;
import com.tim.magic.PackageCouponData;
import com.tim.mapper.TItemMapper;
import com.tim.mapper.TTbkItemMapper;
import com.tim.pool.*;
import com.tim.service.ITItemContentService;
import com.tim.service.ITItemImgService;
import com.tim.service.ITItemService;
import com.tim.service.ITTbkItemService;
import com.tim.service.impl.TKeyServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Slf4j
public class AppInit implements CommandLineRunner {

	@Autowired
	PackageCouponData packageCouponData;

	@Autowired
	private TKeyServiceImpl keyService;

	@Autowired
	private WebDriverPool2 webDriverPool2;

	@Autowired
	private WebDriverPick webDriverPick;

	@Autowired
	private WebDriverPool webDriverPool;

	@Autowired
	private WebDriverPoolChrome webDriverPoolChrome;

	@Autowired
	private ITItemService itemService;
	@Autowired
	private ITTbkItemService itTbkItemService;
	@Autowired
	private ITItemContentService itemContentService;
	@Autowired
	private ITItemImgService itemImgService;

	@Override
	public void run(String... strings) {

		Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
			@Override
			public void run() {
				log.info("关闭 webDrivers ");
				// 关闭webdriver
				for (int i = 0; i < webDriverPoolChrome.webDrivers.size(); i++) {
					TWebDriver tWebDriver = webDriverPoolChrome.webDrivers.get(i);
					tWebDriver.getDriver().quit();
				}
				webDriverPoolChrome.webDrivers.clear();
			}
		}));


		try {
//			List<TKey> keys = keyService.selectList(new EntityWrapper<>());
//			// 每个关键字都查找n页面
//			for(TKey key : keys){
//				for (int i = 1; i <= 2; i++) {
//					packageCouponData.packWithWord2(key.getKey(), i, 200);
//				}
//			}
//		packageCouponData.packWithWord2("裙子",3, 50);
//		webDriverPool2.start();
//		webDriverPick.pickingUpItemWithid("583342670048");
			webDriverPoolChrome.start();


//			Wrapper allWrap = new EntityWrapper<>();
//			itemService.delete(allWrap);
//			itTbkItemService.delete(allWrap);
//			itemContentService.delete(allWrap);
//			itemImgService.delete(allWrap);
//			List<TKey> keys = keyService.selectList(new EntityWrapper<>());
//			// 每个关键字都查找n页面
//			for(TKey key : keys){
//				for (int i = 1; i <= 2; i++) {
//					packageCouponData.packWithWord2(key.getKey(), i, 200);
//				}
//			}


		}catch (Exception e){
			e.printStackTrace();
		}

	}
}
