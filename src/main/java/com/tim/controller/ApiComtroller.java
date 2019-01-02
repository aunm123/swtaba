package com.tim.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.taobao.api.ApiException;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.TbkItemRecommendGetRequest;
import com.taobao.api.request.TbkTpwdCreateRequest;
import com.taobao.api.response.TbkItemRecommendGetResponse;
import com.taobao.api.response.TbkTpwdCreateResponse;
import com.tim.config.TBConf;
import com.tim.entity.*;
import com.tim.magic.PackageCouponData;
import com.tim.pool.WebDriverPick;
import com.tim.service.ITUrlCacheService;
import com.tim.service.impl.*;
import com.tim.util.HttpUtil;
import com.tim.util.JSONUtil;
import com.tim.util.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Tim on 2018/12/7.
 */
@RestController
@RequestMapping(value = "/api")
public class ApiComtroller {

    @Autowired
    TTbkItemServiceImpl tbkItemService;
    @Autowired
    TTopSellServiceImpl topSellService;
    @Autowired
    TItemServiceImpl itemService;
    @Autowired
    TItemImgServiceImpl itemImgService;
    @Autowired
    TShortUrlServiceImpl shortUrlService;
    @Autowired
    TItemContentServiceImpl itemContentService;
    @Autowired
    PackageCouponData packageCouponData;
    @Autowired
    WebDriverPick webDriverPick;
    @Autowired
    TaobaoClient client;
    @Autowired
    ITUrlCacheService urlCacheService;

    @ResponseBody
    @RequestMapping(value = "/top")
    public ResultUtil top(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "50") Integer pageSize,
            @RequestParam(defaultValue = "0") Integer categoryid
    ) {

        ResultUtil resultUtil = itemService.selectNewList(page, pageSize, categoryid);

        return resultUtil;
    }

    @ResponseBody
    @RequestMapping(value = "/detail")
    public ResultUtil detail(@RequestParam String itemid) {

        Map map = itemService.selectDetail(itemid);
        if (map == null){
            // 本地没有有关的商品数据 （使用第三方API 查询产品）
            Map<String, String> params = new HashMap<>();
            params.put("vekey", TBConf.VEKEY);
            params.put("detail","1");
            params.put("para",itemid);

            String keyid = HttpUtil.getUrlString("http://api.vephp.com/hcid", params);
            keyid = JSONUtil.md5(keyid);

            TUrlCache cache = urlCacheService.selectById(keyid);
            String content = "";
            if (cache == null) {
                content = HttpUtil.sendGet("http://api.vephp.com/hcid", params);
                TUrlCache urlCache = new TUrlCache();
                urlCache.setContent(content);
                urlCache.setId(keyid);
                urlCache.setMaxAge(30);   // 缓存30天
                urlCacheService.insertOrUpdate(urlCache);
            }else {
                content = cache.getContent();
            }

            JSONObject object = JSON.parseObject(content);
            if (!object.containsKey("error")) {

                JSONObject data = object.getJSONObject("data");

                Map itemData = (Map) packageCouponData.saveItemData(data);

                return new ResultUtil(itemData);
            } else {
                return new ResultUtil(new Exception(object.getString("msg")));
            }



        }

        return new ResultUtil(map);
    }

    @ResponseBody
    @RequestMapping(value = "/topsell")
    public ResultUtil topsell(@RequestParam(defaultValue = "0") String parentid) {

        Wrapper wrapper = new EntityWrapper<>();
        wrapper.eq("parentid",parentid);
        List topSells = topSellService.selectList(wrapper);

        HashMap<Object, Object> map = new HashMap<>();
        map.put("top", topSells);
        return new ResultUtil(map);
    }

    @ResponseBody
    @RequestMapping(value = "/shorturl")
    public ResultUtil short_url(@RequestParam String itemid,
                                @RequestParam String url,
                                @RequestParam String text,
                                @RequestParam String logo) {

        if (url.equals("")) {
            HashMap<Object, Object> map = new HashMap<>();
            ResultUtil resultUtil = new ResultUtil(map);
            return resultUtil;
        }
        String tempUrl = url;
        if (!tempUrl.startsWith("https://")) {
            tempUrl = "https:" + url;
        }
        try {
            tempUrl = URLDecoder.decode(tempUrl, "UTF-8");
            String shortUrl = shortUrlService.getShortUrl(itemid, tempUrl, text, logo);

            HashMap<Object, Object> map = new HashMap<>();
            map.put("shorturl", shortUrl);
            ResultUtil resultUtil = new ResultUtil(map);
            return resultUtil;

        } catch (Exception e) {
            e.printStackTrace();
            return new ResultUtil(e);
        }

    }

}
