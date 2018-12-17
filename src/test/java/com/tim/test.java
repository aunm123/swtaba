package com.tim;

import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.Spider;
import us.codecraft.webmagic.processor.PageProcessor;
import us.codecraft.webmagic.processor.example.GithubRepoPageProcessor;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Tim on 2018/12/4.
 */
public class test implements PageProcessor {

	// 部分一：抓取网站的相关配置，包括编码、抓取间隔、重试次数等
	private Site site = Site.me().setRetryTimes(3).setSleepTime(1000);

	// process是定制爬虫逻辑的核心接口，在这里编写抽取逻辑
	public void process(Page page) {
		// 部分二：定义如何抽取页面信息，并保存下来
		page.putField("author", page.getUrl().regex("https://github\\.com/(\\w+)/.*").toString());
		page.putField("name", page.getHtml().xpath("//h1[@class='entry-title public']/strong/a/text()").toString());
		if (page.getResultItems().get("name") == null) {
			//skip this page
			page.setSkip(true);
		}
		page.putField("readme", page.getHtml().xpath("//div[@id='readme']/tidyText()"));

		// 部分三：从页面发现后续的url地址来抓取
		page.addTargetRequests(page.getHtml().links().regex("(https://github\\.com/[\\w\\-]+/[\\w\\-]+)").all());
	}

	public Site getSite() {
		return site;
	}

//	public static void main(String[] args) {
//
////		Spider.create(new GithubRepoPageProcessor())
////				//从"https://github.com/code4craft"开始抓
////				.addUrl("https://github.com/code4craft")
////				//开启5个线程抓取
////				.thread(5)
////				//启动爬虫
////				.run();
//
//
//		String str = "<div id=\"description\" class=\"J_DetailSection tshop-psm ke-post\"> \n" +
//				" <div id=\"J_DivItemDesc\" class=\"content\">\n" +
//				"   描述加载中 \n" +
//				" </div> \n" +
//				"</div>";
//
//		Pattern p = Pattern.compile(".*(描述加载中).*");
//		Matcher m = p.matcher(str);
//		if (m.find()) {
//			System.out.println(true);
//		}else {
//			System.out.println(false);
//		}
//
//
//
//
//	}


	public static void main(String[] argv){
		//创建线程本地变量
		ThreadLocal<String> threadLocal = new ThreadLocal<String>();
    	/*创建可用线程数量的固定线程池*/
		ExecutorService executorService =  Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
		executorService.execute(new Runnable() {//向线程池中添加线程
			@Override
			public void run() {//一定要捕获子线程异常，不然它出轨了都不知道
				try {

				} catch (Exception e) {

				}
			}
		});
		executorService.shutdown();//一定要调用这个方法，不然executorService.isTerminated()永远不为true
		while(true){//等待所有任务都结束了继续执行
			try {
				if(executorService.isTerminated()){
					System.out.println("所有的子线程都结束了！");
					break;
				}
				Thread.sleep(1000);
			}catch (Exception e){
				e.printStackTrace();
			}
		}
	}

}
