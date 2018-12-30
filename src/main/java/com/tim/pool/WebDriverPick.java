package com.tim.pool;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.tim.entity.TItem;
import com.tim.entity.TItemContent;
import com.tim.mapper.TItemMapper;
import com.tim.service.impl.TItemContentServiceImpl;
import com.tim.service.impl.TItemServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.*;
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriverService;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import us.codecraft.webmagic.selector.Html;
import us.codecraft.webmagic.selector.Selectable;

import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Tim on 2018/12/7.
 */
@Slf4j
@Component
public class WebDriverPick {

	@Autowired
	TItemServiceImpl itemService;

	@Autowired
	TItemContentServiceImpl tItemContentService;

	@Autowired
	TItemMapper itemMapper;

	private ArrayList<TWebDriver> webDrivers;

	public Map pickingUpItemWithid(String item_id){



		TWebDriver tWebDriver = WebDriverPool2.getFreeDrivers();

		WebDriver driver = tWebDriver.getDriver();
		tWebDriver.setFinish(false);

		Map map = new HashMap();
		ArrayList<String> tabs = new ArrayList<String> (driver.getWindowHandles());

		try {

			driver.switchTo().window(tabs.get(0));

			JavascriptExecutor oJavaScriptExecutor = (JavascriptExecutor)driver;
			oJavaScriptExecutor.executeScript("window.open();");

			ArrayList<String> new_tabs = new ArrayList<String> (driver.getWindowHandles());

			driver.switchTo().window(new_tabs.get(1)); //switches to new tab

			EntityWrapper wrapper = new EntityWrapper();
			wrapper.eq("num_iid",item_id);
			TItem tItem = itemService.selectOne(wrapper);

			String item_url = "";
			if (tItem == null){
				item_url = "https://detail.tmall.com/item.htm?id="+item_id;
			}else {
				item_url = tItem.getItemUrl();
			}

			driver.get(item_url);
			// 获取 网页的 title
			log.info(" Page title is: " + driver.getTitle());

			new WebDriverWait(driver, 9000).until(input -> {
				WebElement webElement = ((WebDriver) input).findElement(By.id("page"));
				WebElement targetElement = webElement.findElement(By.className("ke-post"));
				String innerHTML = targetElement.getAttribute("innerHTML");
				Pattern p = Pattern.compile(".*(描述加载中).*");
				Matcher m = p.matcher(innerHTML);
				Boolean b1 = true;
				if (m.find()) {
					b1 = false;
				}
				return b1;
			});

			WebElement webElement = driver.findElement(By.id("page"));

			String str = webElement.getAttribute("outerHTML");
			Html html = new Html(str);

			Selectable content = html.$("#description");

			TItemContent tItemContent = new TItemContent();
			tItemContent.setItemId(item_id);
			tItemContent.setContent(content.toString());

			tItemContentService.insertOrUpdate(tItemContent);

			map = itemService.selectDetail(item_id);


		} catch (Exception e) {
			e.printStackTrace();
			log.error("补捉详细页失败");

		} finally {
			driver.close();
			tWebDriver.setFinish(true);
			return  map;
		}
	}


}
