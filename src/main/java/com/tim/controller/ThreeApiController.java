package com.tim.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.tim.config.TBConf;
import com.tim.entity.TUrlCache;
import com.tim.service.ITItemService;
import com.tim.service.ITUrlCacheService;
import com.tim.util.HttpUtil;
import com.tim.util.JSONUtil;
import com.tim.util.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/three")
public class ThreeApiController {

    @Autowired
    ITItemService itemService;
    @Autowired
    ITUrlCacheService urlCacheService;


    @ResponseBody
    @RequestMapping(value = "/top")
    public ResultUtil top(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "热销") String topcate,
            @RequestParam(defaultValue = "运动") String subcate
    ) {

        Map<String, String> params = new HashMap<>();
        params.put("vekey", TBConf.VEKEY);
        try {
            params.put("topcate", URLEncoder.encode(topcate,"UTF-8"));
            params.put("subcate", URLEncoder.encode(subcate,"UTF-8"));
            params.put("sort", "total_sales_des");
            params.put("page", page.toString());
            params.put("pagesize", "100");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }


        String keyid = HttpUtil.getUrlString("http://api.vephp.com/products", params);
        keyid = JSONUtil.md5(keyid);

        TUrlCache cache = urlCacheService.selectById(keyid);

        if (cache==null){
            String content = HttpUtil.sendGet("http://api.vephp.com/products", params);

            JSONObject object = JSON.parseObject(content);
            if (!object.containsKey("error")) {
                TUrlCache urlCache = new TUrlCache();
                urlCache.setContent(content);
                urlCache.setId(keyid);
                urlCacheService.insert(urlCache);

                return new ResultUtil(JSONUtil.connect(urlCache));
            }else {
                return new ResultUtil(new Exception(object.getString("msg")));
            }
        }else {
            return new ResultUtil(JSONUtil.connect(cache));
        }

    }

}
