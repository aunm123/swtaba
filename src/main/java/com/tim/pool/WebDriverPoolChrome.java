package com.tim.pool;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.tim.config.TBConf;
import com.tim.entity.TItem;
import com.tim.entity.TItemContent;
import com.tim.mapper.TItemMapper;
import com.tim.service.impl.TItemContentServiceImpl;
import com.tim.service.impl.TItemServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriverService;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
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

@Slf4j
@Component
public class WebDriverPoolChrome {

    @Autowired
    TItemServiceImpl tItemService;

    @Autowired
    TItemContentServiceImpl tItemContentService;

    @Autowired
    TItemMapper itemMapper;

    public ArrayList<TWebDriver> webDrivers = new ArrayList<TWebDriver>();

    private ArrayList<Runnable> retryRunable = new ArrayList<Runnable>();

    //phantomjs路径
    private static final String WIN_JS_BIN = "D:\\chromedriver_win32\\chromedriver.exe";
    private static final String MAC_JS_BIN = "/path/chromedriver";
    private static final String LINUX_JS_BIN = "/data/app/chromedriver";

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
        chromeOptions.addArguments("user-agent=\"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1\"");
        // pc 端
//        chromeOptions.addArguments("user-agent=\"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50\"");

        //单线程运行
//        chromeOptions.addArguments("–-single-process");
        chromeOptions.addArguments("--no-sandbox");
        chromeOptions.addArguments("--disable-gpu");
        chromeOptions.addArguments("--disable-extensions");
        chromeOptions.addArguments("--window-size=375,2046");
        chromeOptions.addArguments("--ignore-ssl-errors=true");
        chromeOptions.addArguments("--ssl-protocol=TLSv1");

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

        // 设置浏览器大小
//        driver.manage().window().setSize(new Dimension(375, 2046));

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

        if (TBConf.ChromeLoading) {
            log.info("正在爬取，请不要重复启动！！！！");
            return;
        }

        TBConf.ChromeLoading = true;

        Wrapper wrapper = new EntityWrapper<>();
        wrapper.orderBy(true, "volume", false); // 按销售量采集， 优先采集销售量高的商品
        Integer count = itemMapper.selectCount(wrapper);
        Integer totalPage = count / 50 + (count % 50 == 0 ? 0 : 1);

        webDrivers.clear();
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

                Runnable thread = createThread(url, item_id, 1);
                if (thread != null) {
                    TBConf.GetDriverPool().execute(thread);
                }
            }
        }

        TBConf.GetDriverPool().shutdown();

        while (true) {//等待所有任务都结束了继续执行
            try {
                if (TBConf.GetDriverPool().isTerminated()) {

                    if (retryRunable.size() > 0) {
                        TBConf.CleanPool();
                        for (Runnable run : retryRunable) {
                            TBConf.GetDriverPool().execute(run);
                        }
                        TBConf.GetDriverPool().shutdown();
                        retryRunable.clear();
                    } else {

                        // 关闭webdriver
                        for (int i = 0; i < webDrivers.size(); i++) {
                            TWebDriver tWebDriver = webDrivers.get(i);
                            tWebDriver.getDriver().quit();
                        }
                        webDrivers.clear();
                        log.info("所有的子线程都结束了！");
                        TBConf.CleanPool();
                        TBConf.ChromeLoading = false;
                        break;
                    }
                }
                Thread.sleep(1000);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }


    public Runnable createThread(String item_url, String item_id, Integer retryCount) {

        TItemContent tItemContent = tItemContentService.selectById(item_id);
        if (tItemContent != null) {
            long beginDate = tItemContent.getUpdateDate().getTime();
            long nowDate = new Date().getTime();

            // 过期时间是60天
            if (nowDate - beginDate <= (3600 * 24 * 60 * 1000L)) {
                return null;
            }
            log.info("过期：" + tItemContent.getItemId());
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

                    driver.get("https://m.intl.taobao.com/detail/detail.html?id=" + item_id);

                    // PC版
//                    new WebDriverWait(driver, 120).until(input -> {
//                        WebElement webElement = ((WebDriver) input).findElement(By.id("page"));
//                        WebElement targetElement = webElement.findElement(By.className("ke-post"));
//                        String innerHTML = targetElement.getAttribute("innerHTML");
//                        Pattern p = Pattern.compile(".*(描述加载中).*");
//                        Matcher m = p.matcher(innerHTML);
//                        Boolean b1 = true;
//                        if (m.find()) {
//                            b1 = false;
//                        }
//                        return b1;
//                    });
//                    WebElement webElement = driver.findElement(By.id("page"));
//                    String str = webElement.getAttribute("outerHTML");

                    // 手机版  ExpectedConditions.visibilityOfElementLocated(By.className("desc-wrapper")

                    new WebDriverWait(driver, 120).until(input -> {
                        WebElement webElement = ((WebDriver) input).findElement(By.tagName("body"));

                        WebElement wrapperElement = null;
                        WebElement contentElement = null;

                        try {
                            wrapperElement = webElement.findElement(By.className("desc-wrapper"));
                        } catch (NoSuchElementException e) { };

                        try {
                            contentElement = webElement.findElement(By.className("detail-content"));
                        } catch (NoSuchElementException e) { };

                        if (wrapperElement != null) {
                            if (wrapperElement.getRect().height > 3) {
                                return true;
                            }
                        }
                        if (contentElement != null) {
                            if (contentElement.getRect().height > 3) {
                                return true;
                            }
                        }
                        return false;

//                        ExpectedCondition<WebElement> targetEx = ExpectedConditions.visibilityOf(targetElement);
//                        ExpectedCondition<WebElement> target2Ex = ExpectedConditions.visibilityOf(target2Element);
//                        return ExpectedConditions.visibilityOfAllElements(targetElement,target2Element);
                    });
                    WebElement webElement = driver.findElement(By.tagName("body"));
                    String str = webElement.getAttribute("outerHTML");

                    // 获取 网页的 title
                    log.info(" Page title is: " + driver.getTitle());


                    Html html = new Html(str);

                    Selectable content = null;

                    WebElement wrapperElement = null;
                    WebElement contentElement = null;

                    try {
                        wrapperElement = webElement.findElement(By.className("desc-wrapper"));
                    } catch (NoSuchElementException e) { };

                    try {
                        contentElement = webElement.findElement(By.className("detail-content"));
                    } catch (NoSuchElementException e) { };

                    if (wrapperElement != null) {
                        if (wrapperElement.getRect().height > 3) {
                            content = html.$(".desc-wrapper");
                        }
                    }
                    if (contentElement != null) {
                        if (contentElement.getRect().height > 3) {
                            content = html.$(".detail-content");
                        }
                    }

                    if (content == null) {
                        throw new Exception("空数据异常!!!!");
                    }

                    TItemContent tItemContent = new TItemContent();
                    tItemContent.setItemId(item_id);
                    tItemContent.setContent(content.toString());
                    tItemContent.setUpdateDate(new Date());

                    tItemContentService.insert(tItemContent);


                } catch (Exception e) {

                    log.error("补捉详细页失败 ，" + e.toString());
                    TItem item = tItemService.selectById(item_id);
                    log.error(item.getTitle() + " url:" + "https://m.intl.taobao.com/detail/detail.html?id=" + item_id);

                    // 失败，即重试3次
                    Integer rc = retryCount;
                    if (3 >= rc) {
                        // 重新重试
                        rc = rc + 1;
                        Runnable thread = createThread(item_url, item_id, rc);
                        if (thread != null) {
                            retryRunable.add(thread);
                        }
                    } else {
                        System.out.println("重试3次依然失败，插入为空内容");
                        //  重试3 次依然失败，插入为空内容
                        TItemContent tItemContent = new TItemContent();
                        tItemContent.setItemId(item_id);
                        tItemContent.setContent("");
                        tItemContent.setUpdateDate(new Date());

                        tItemContentService.insert(tItemContent);
                    }

                } finally {
                    driver.close();
                    tWebDriver.setFinish(true);


                }

            }
        };
        return runnable;
    }


}
