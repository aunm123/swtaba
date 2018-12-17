package com.tim;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriverService;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import us.codecraft.webmagic.selector.Html;
import us.codecraft.webmagic.selector.Selectable;

/**
 * Created by Tim on 2018/12/4.
 */
public class TestPhantomJS {

	public static PhantomJSDriver getPhantomJSDriver(){
		//设置必要参数
		DesiredCapabilities dcaps = new DesiredCapabilities();
		//ssl证书支持
		dcaps.setCapability("acceptSslCerts", true);
		//截屏支持
		dcaps.setCapability("takesScreenshot", false);
		//css搜索支持
		dcaps.setCapability("cssSelectorsEnabled", true);
		dcaps.setCapability("width", "1024");
		dcaps.setCapability("height", "1024");
		//js支持
		dcaps.setJavascriptEnabled(true);
		//驱动支持
		dcaps.setCapability(PhantomJSDriverService.PHANTOMJS_EXECUTABLE_PATH_PROPERTY,"D:\\phantomjs\\bin\\phantomjs.exe");
		Dimension dimension = new Dimension(1080, 2048);

		PhantomJSDriver driver = new PhantomJSDriver(dcaps);

		driver.manage().window().setSize(dimension);

		return  driver;
	}

	public static void main(String[] args) throws InterruptedException {
		WebDriver driver=getPhantomJSDriver();


//		https://detail.tmall.com/item.htm?id=562430424190
		driver.get("https://item.taobao.com/item.htm?id=538542936239");
		// 用下面代码也可以实现
		//driver.navigate().to("http://www.baidu.com");
		// 获取 网页的 title
		System.out.println(" Page title is: " + driver.getTitle());

		new WebDriverWait(driver, 9000).until(input -> {
			WebElement webElement = ((WebDriver) input).findElement(By.id("page"));
			WebElement targetElement = webElement.findElement(By.className("ke-post"));
			boolean bWatie = targetElement.getAttribute("innerHTML").equals("\n\t描述加载中\t");
			return !bWatie;
		});

		WebElement webElement = driver.findElement(By.id("page"));

		String str = webElement.getAttribute("outerHTML");
		Html html = new Html(str);

		Selectable content = html.$("#description");

		System.out.println(content);
	}

}
