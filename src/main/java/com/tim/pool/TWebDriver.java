package com.tim.pool;

import org.openqa.selenium.WebDriver;

/**
 * Created by Tim on 2018/12/10.
 */
public class TWebDriver {

	private WebDriver driver;

	private Boolean finish;

	public WebDriver getDriver() {
		return driver;
	}

	public void setDriver(WebDriver driver) {
		this.driver = driver;
	}

	public Boolean getFinish() {
		return finish;
	}

	public void setFinish(Boolean finish) {
		this.finish = finish;
	}
}
