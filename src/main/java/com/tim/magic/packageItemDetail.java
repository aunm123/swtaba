package com.tim.magic;

import com.taobao.api.domain.Item;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriverService;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import us.codecraft.webmagic.selector.Html;
import us.codecraft.webmagic.selector.Selectable;

/**
 * Created by Tim on 2018/12/5.
 */
@Component
public class packageItemDetail {


	public void fixItemDetail(Item item){

////		https://detail.tmall.com/item.htm?id=562430424190
//		driver.get("https://item.taobao.com/item.htm?id=538542936239");
//		// 获取 网页的 title
//		System.out.println(" Page title is: " + driver.getTitle());
//
//		new WebDriverWait(driver, 9000).until(input -> {
//			WebElement webElement = ((WebDriver) input).findElement(By.id("page"));
//			WebElement targetElement = webElement.findElement(By.className("ke-post"));
//			boolean bWatie = targetElement.getAttribute("innerHTML").equals("\n\t描述加载中\t");
//			return !bWatie;
//		});
//
//		WebElement webElement = driver.findElement(By.id("page"));
//
//		String str = webElement.getAttribute("outerHTML");
//		Html html = new Html(str);
//
//		Selectable content = html.$("#description");
//
//		System.out.println(content);
	}

}
