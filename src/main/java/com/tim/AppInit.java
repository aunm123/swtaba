package com.tim;

import com.tim.entity.TItem;
import com.tim.entity.TTbkItem;
import com.tim.magic.PackageCouponData;
import com.tim.mapper.TItemMapper;
import com.tim.mapper.TTbkItemMapper;
import com.tim.pool.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import us.codecraft.webmagic.selector.Html;
import us.codecraft.webmagic.selector.Selectable;

import java.util.logging.Level;

@Component
public class AppInit implements CommandLineRunner {

	@Autowired
	PackageCouponData packageCouponData;

	@Autowired
	private TItemMapper itemMapper;
	@Autowired
	private WebDriverPool2 webDriverPool2;

	@Autowired
	private WebDriverPick webDriverPick;

	@Autowired
	private WebDriverPool webDriverPool;

	@Autowired
	private WebDriverPoolChrome webDriverPoolChrome;

	@Override
	public void run(String... strings) throws Exception {

//		for (int i = 1; i<=2; i++){
//			packageCouponData.packWithWord2("婴儿",i, 50);
//		}

//		packageCouponData.packWithWord2("裙子",1, 50);

//		webDriverPool2.start();

//		webDriverPick.pickingUpItemWithid("583342670048");

//		webDriverPoolChrome.start();

	}
}
