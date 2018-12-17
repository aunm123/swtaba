package com.tim.pool;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriverService;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Semaphore;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class WebDriverPool {

	// 线程池大小
	private static final int MAX_COUNT = 15;
	// 线程数量控制
	private Semaphore semaphore = new Semaphore(MAX_COUNT);
	// webDriver池
	private WebDriver[] webDrivers = new WebDriver[MAX_COUNT];

	private boolean[] driverFlag = new boolean[MAX_COUNT];

	private Lock lockDrivers = new ReentrantLock();

	//phantomjs路径
	private final String JS_BIN = "D:\\phantomjs\\bin\\phantomjs.exe";

	public WebDriverPool() {
		System.setProperty("phantomjs.binary.path", JS_BIN);
		for (int i = 0; i < MAX_COUNT; i++) {
			driverFlag[i] = true;
		}
		// 关闭所有打开的浏览器
		Runtime.getRuntime().addShutdownHook(new Thread(() -> {
			for (WebDriver webDriver : webDrivers) {
				if (webDriver != null) {
					webDriver.quit();
				}
			}
		}));
	}

	/**
	 * 生成一个新的PhantomJSDriver
	 */
	private WebDriver defaultDriver() {

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
		dcaps.setCapability(PhantomJSDriverService.PHANTOMJS_EXECUTABLE_PATH_PROPERTY,JS_BIN);
		Dimension dimension = new Dimension(1080, 2048);

		PhantomJSDriver driver = new PhantomJSDriver(dcaps);

		driver.manage().window().setSize(dimension);

		return driver;
	}

	/**
	 * 获取当前空闲的driver的下标
	 * @return 当前空闲的driver的下标
	 */
	private int freeDriverIndex() {
		int ret = -1;
		try {
			lockDrivers.lock();
			for (int i = 0; i < driverFlag.length; i++) {
				if (driverFlag[i]) {
					driverFlag[i] = false;
					ret = i;
					break;
				}
			}
			if (ret != -1) {
				if (webDrivers[ret] == null) {
					webDrivers[ret] = defaultDriver();
				}
			}
		} finally {
			lockDrivers.unlock();
		}
		return ret;
	}

	/**
	 * 获取执行js之后的页面html
	 */
	public void customJs(CustomAction action) {
		String html = "";
		try {
			semaphore.acquire();
			int index = freeDriverIndex();
			//调用自定义的操作
			action.action(webDrivers[index]);
			driverFlag[index] = true;
		} catch (InterruptedException e) {
			e.printStackTrace();
		} finally {
			semaphore.release();
		}
	}



}
