package com.tim;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriverService;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import us.codecraft.webmagic.selector.Html;
import us.codecraft.webmagic.selector.Selectable;

import java.io.File;
import java.io.IOException;

public class TestChromeDriver {

	private static ChromeDriverService service;

	public static WebDriver getChromeDriver() throws IOException {
		System.setProperty("webdriver.chrome.driver", "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe");
		// 创建一个 ChromeDriver 的接口，用于连接 Chrome（chromedriver.exe 的路径可以任意放置，只要在newFile（）的时候写入你放的路径即可）
		service = new ChromeDriverService.Builder().usingDriverExecutable(new File("D:\\chromedriver_win32\\chromedriver.exe")).usingAnyFreePort().build();
		service.start();
		// 创建一个 Chrome 的浏览器实例
		return new RemoteWebDriver(service.getUrl(), DesiredCapabilities.chrome());
	}

	public static void main(String[] args) throws IOException {


		WebDriver driver = TestChromeDriver.getChromeDriver();


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
