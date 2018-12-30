package com.tim.config;

import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.tim.pool.WebDriverPool;
import com.tim.pool.WebDriverPool2;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

@Component
public class TBConf {

	public static final String APPKEY = "23476377";
	public static final String APPSCRET = "b3b6c0a6a877b14d07a3c38bb138f58c";
	public static final String PID = "mm_114881981_17258224_62920816";
	public static final String AdzoneId = "62920816";
	public static final String BASE_URL = "http://gw.api.taobao.com/router/rest";

	public static Boolean ChromeLoading = false;

	private static ExecutorService driverPool = null;


	@Bean
	public TaobaoClient taobaoClient(){
		return new DefaultTaobaoClient(BASE_URL, APPKEY, APPSCRET);
	}

	@Bean
	public WebDriverPool webDriverPool(){
		return new WebDriverPool();
	}

//	@Bean
//	public ExecutorService driverPool(){
//		ExecutorService threadPool = Executors.newFixedThreadPool(5);
////		ExecutorService threadPool = Executors.newSingleThreadExecutor();
//		return threadPool;
//	}

	public static ExecutorService GetDriverPool(){
		if (driverPool == null) {
			driverPool = Executors.newFixedThreadPool(5);
		}
		return driverPool;
	}

	public static void CleanPool(){
		driverPool = null;
	}

}
