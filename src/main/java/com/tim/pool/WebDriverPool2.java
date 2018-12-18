package com.tim.pool;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.tim.entity.TItem;
import com.tim.entity.TItemContent;
import com.tim.mapper.TItemMapper;
import com.tim.service.impl.TItemContentServiceImpl;
import com.tim.service.impl.TItemServiceImpl;
import org.openqa.selenium.*;
import org.openqa.selenium.logging.LogType;
import org.openqa.selenium.logging.LoggingPreferences;
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriverService;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import us.codecraft.webmagic.selector.Html;
import us.codecraft.webmagic.selector.Selectable;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.logging.FileHandler;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class WebDriverPool2 {

	@Autowired
	ExecutorService driverPool;

	@Autowired
	TItemServiceImpl tItemService;

	@Autowired
	TItemContentServiceImpl tItemContentService;

	@Autowired
	TItemMapper itemMapper;

	private static ArrayList<TWebDriver> webDrivers;

	//phantomjs路径
	private static final String JS_BIN = "D:\\phantomjs\\bin\\phantomjs.exe";

	/**
	 * 生成一个新的PhantomJSDriver
	 */
	public static TWebDriver defaultDriver() {

		//设置必要参数
		DesiredCapabilities dcaps = new DesiredCapabilities();
		//ssl证书支持
		dcaps.setCapability(CapabilityType.ACCEPT_SSL_CERTS, true);
		//截屏支持
		dcaps.setCapability(CapabilityType.TAKES_SCREENSHOT, false);
		//css搜索支持
		dcaps.setCapability(CapabilityType.SUPPORTS_FINDING_BY_CSS, true);

		dcaps.setCapability("phantomjs.page.settings.loadImages", false);

		dcaps.setCapability("phantomjs.page.settings.userAgent","Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0");

		//js支持
		dcaps.setJavascriptEnabled(true);
		dcaps.setBrowserName("Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0");
		dcaps.setAcceptInsecureCerts(true);
		dcaps.setPlatform(Platform.WIN10);
		//驱动支持
		dcaps.setCapability(PhantomJSDriverService.PHANTOMJS_EXECUTABLE_PATH_PROPERTY, JS_BIN);

		PhantomJSDriver driver = new PhantomJSDriver(dcaps);
		driver.setLogLevel(Level.OFF);

		TWebDriver tWebDriver = new TWebDriver();
		tWebDriver.setFinish(true);
		tWebDriver.setDriver(driver);

		return tWebDriver;

	}

	public static void initDriverArray(){
		webDrivers = new ArrayList<>();
		for (int i = 0; i< 6; i++){
			TWebDriver tWebDriver = defaultDriver();
			webDrivers.add(tWebDriver);
		}
	}

	public static TWebDriver getFreeDrivers(){
		for (int i = 0; i< webDrivers.size(); i++){
			TWebDriver tWebDriver = webDrivers.get(i);
			if (tWebDriver.getFinish()){
				return tWebDriver;
			}
		}
		return null;
	}

	public static void freereeDrivers(){
		for (int i = 0; i< webDrivers.size(); i++){
			TWebDriver tWebDriver = webDrivers.get(i);
			tWebDriver.getDriver().quit();
		}
	}

	public void start() {

		Wrapper wrapper = new EntityWrapper<>();
		Integer count = itemMapper.selectCount(wrapper);
		Integer totalPage = count / 50 + (count % 50 == 0 ? 0 : 1);
		initDriverArray();

//		for (int i = totalPage; i > 0; i--) {
//
//			System.out.println("开始加入第 " + i + " 页面数据");
//			Page<TItem> tItemPage = tItemService.selectPage(i);
//			List<TItem> records = tItemPage.getRecords();
//
//			for (TItem item : records) {
//				String url = item.getItemUrl();
//				String item_id = item.getNumIid();
//				Runnable thread = createThread(url, item_id);
//				if (thread != null) {
//					driverPool.execute(thread);
//				}
//			}
//		}

//		driverPool.shutdown();
//
//		while (true) {//等待所有任务都结束了继续执行
//			try {
//				if (driverPool.isTerminated()) {
//					freereeDrivers();
//					System.out.println("所有的子线程都结束了！");
//					break;
//				}
//				Thread.sleep(1000);
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//		}

	}


	public Runnable createThread(String item_url, String item_id) {

		TItemContent tItemContent = tItemContentService.selectById(item_id);
		if (tItemContent != null) {
			long beginDate = tItemContent.getUpdateDate().getTime();
			long nowDate = new Date().getTime();

			if (nowDate - beginDate <= 3000000) return null;

			return null;
		}

		Runnable runnable = new Runnable() {
			@Override
			public void run() {

				TWebDriver tWebDriver = getFreeDrivers();
				WebDriver driver = tWebDriver.getDriver();
				tWebDriver.setFinish(false);
				ArrayList<String> tabs = new ArrayList<String> (driver.getWindowHandles());

				try {

					driver.switchTo().window(tabs.get(0));

					JavascriptExecutor oJavaScriptExecutor = (JavascriptExecutor)driver;
					oJavaScriptExecutor.executeScript("window.open();");

					ArrayList<String> new_tabs = new ArrayList<String> (driver.getWindowHandles());

					driver.switchTo().window(new_tabs.get(1)); //switches to new tab

					driver.get(item_url);

					// 获取 网页的 title
					System.out.println(" Page title is: " + driver.getTitle());

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


				} catch (Exception e) {
					e.printStackTrace();

					System.out.println("补捉详细页失败");

				} finally {
					driver.close();
					tWebDriver.setFinish(true);
				}

			}
		};
		return runnable;
	}

}
