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
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;
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
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class WebDriverPoolChrome {

    @Autowired
    ExecutorService driverPool;

    @Autowired
    TItemServiceImpl tItemService;

    @Autowired
    TItemContentServiceImpl tItemContentService;

    @Autowired
    TItemMapper itemMapper;

    private ArrayList<TWebDriver> webDrivers;

    //phantomjs路径
    private static final String WIN_JS_BIN = "D:\\chromedriver_win32\\chromedriver.exe";
    private static final String MAC_JS_BIN = "/path/chromedriver";
    private static final String LINUX_JS_BIN = "";

    /**
     * 生成一个新的PhantomJSDriver
     */
    public static TWebDriver defaultDriver() {

        ChromeOptions chromeOptions = new ChromeOptions();
        //无头设置
		chromeOptions.addArguments("--headless");
        // # 设置默认编码为 utf-8
        chromeOptions.addArguments("lang=zh_CN.UTF-8");
        // 模拟手机
//        chromeOptions.addArguments("user-agent=\"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1\"");
        // pc 端
        chromeOptions.addArguments("user-agent=\"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50\"");

        //单线程运行
//        chromeOptions.addArguments("–single-process");
        chromeOptions.addArguments("–no-sandbox");

        // 禁止图片加载
        HashMap<String, Integer> prefs = new HashMap<String, Integer>();
        prefs.put("profile.managed_default_content_settings.images", 2);
        chromeOptions.setExperimentalOption("prefs", prefs);

        String os = System.getProperty("os.name");
        if (os.toLowerCase().startsWith("win")) {
            System.setProperty("webdriver.chrome.driver", WIN_JS_BIN);
        } else if (os.toLowerCase().startsWith("mac")) {
            System.setProperty("webdriver.chrome.driver", MAC_JS_BIN);
        } else {
            System.setProperty("webdriver.chrome.driver", LINUX_JS_BIN);
        }


        ChromeDriver driver = new ChromeDriver(chromeOptions);

        TWebDriver tWebDriver = new TWebDriver();
        tWebDriver.setFinish(true);
        tWebDriver.setDriver(driver);

        return tWebDriver;

    }

    public TWebDriver getFreeDriver() {

        synchronized (this) {
            for (int i = 0; i < webDrivers.size(); i++) {
                TWebDriver tWebDriver = webDrivers.get(i);
                if (tWebDriver.getFinish()) {
                    return tWebDriver;
                }
            }

            return null;
        }

    }

    public void start() {

        Wrapper wrapper = new EntityWrapper<>();
        Integer count = itemMapper.selectCount(wrapper);
        Integer totalPage = count / 50 + (count % 50 == 0 ? 0 : 1);


        webDrivers = new ArrayList<>();
        for (int i = 0; i < 6; i++) {
            TWebDriver tWebDriver = defaultDriver();
            webDrivers.add(tWebDriver);
        }

        for (int i = totalPage; i > 0; i--) {

            Page<TItem> tItemPage = tItemService.selectPage(i);
            List<TItem> records = tItemPage.getRecords();

            for (TItem item : records) {
                String url = item.getItemUrl();
                String item_id = item.getNumIid();

                Runnable thread = createThread(url, item_id);
                if (thread != null) {
                    driverPool.execute(thread);
                }
            }
        }
        driverPool.shutdown();

        while (true) {//等待所有任务都结束了继续执行
            try {
                if (driverPool.isTerminated()) {
                    for (int i = 0; i < webDrivers.size(); i++) {
                        TWebDriver tWebDriver = webDrivers.get(i);
                        tWebDriver.getDriver().quit();
                    }
                    System.out.println("所有的子线程都结束了！");
                    break;
                }
                Thread.sleep(1000);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

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

                TWebDriver tWebDriver = getFreeDriver();
                try {
                    while (tWebDriver == null) {
                        tWebDriver = getFreeDriver();
                        Thread.sleep(1000);
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                WebDriver driver = tWebDriver.getDriver();
                tWebDriver.setFinish(false);
                ArrayList<String> tabs = new ArrayList<String>(driver.getWindowHandles());

                try {

                    driver.switchTo().window(tabs.get(0));

                    JavascriptExecutor oJavaScriptExecutor = (JavascriptExecutor) driver;
                    oJavaScriptExecutor.executeScript("window.open();");

                    ArrayList<String> new_tabs = new ArrayList<String>(driver.getWindowHandles());

                    driver.switchTo().window(new_tabs.get(1)); //switches to new tab

                    driver.get(item_url);

                    // 获取 网页的 title
                    System.out.println(" Page title is: " + driver.getTitle());

                    new WebDriverWait(driver, 180).until(input -> {
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
