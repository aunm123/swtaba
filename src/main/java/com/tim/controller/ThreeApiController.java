package com.tim.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.tim.config.TBConf;
import com.tim.entity.TTopSell;
import com.tim.entity.TUrlCache;
import com.tim.service.ITItemService;
import com.tim.service.ITTopSellService;
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
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/three")
public class ThreeApiController {

    @Autowired
    ITItemService itemService;
    @Autowired
    ITUrlCacheService urlCacheService;
    @Autowired
    ITTopSellService topSellService;


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
            params.put("topcate", URLEncoder.encode(topcate, "UTF-8"));
            params.put("subcate", URLEncoder.encode(subcate, "UTF-8"));
            params.put("sort", "total_sales_des");
            params.put("page", page.toString());
            params.put("pagesize", "20");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }


        String keyid = HttpUtil.getUrlString("http://api.vephp.com/products", params);
        keyid = JSONUtil.md5(keyid);

        TUrlCache cache = urlCacheService.selectById(keyid);

        if (cache == null) {
            String content = HttpUtil.sendGet("http://api.vephp.com/products", params);

            JSONObject object = JSON.parseObject(content);
            if (!object.containsKey("error")) {
                TUrlCache urlCache = new TUrlCache();
                urlCache.setContent(content);
                urlCache.setId(keyid);
                urlCacheService.insert(urlCache);

                return new ResultUtil(JSONUtil.connect(urlCache));
            } else {
                return new ResultUtil(new Exception(object.getString("msg")));
            }
        } else {
            return new ResultUtil(JSONUtil.connect(cache));
        }

    }

    @ResponseBody
    @RequestMapping(value = "/cate")
    public ResultUtil cate(
            @RequestParam String topid
    ) {
        TTopSell sell1 = topSellService.selectById(topid);
        if (sell1 == null) return new ResultUtil(new Exception("无法查找到分类"));

        String topcate = "";
        String subcate = "";
        if (sell1.getParentid() == 0) {
            topcate = sell1.getKeyword();

            Wrapper sub_wrapper = new EntityWrapper<>();
            sub_wrapper.eq("parentid",topid);
            TTopSell sell2 = topSellService.selectOne(sub_wrapper);
            subcate = sell2.getKeyword();

        } else {
            subcate = sell1.getKeyword();
            TTopSell sell2 = topSellService.selectById(sell1.getParentid());
            topcate = sell2.getKeyword();
        }

        HashMap<String, String> cateMap = new HashMap<>();
        cateMap.put("topcate", topcate);
        cateMap.put("subcate", subcate);

        return new ResultUtil(cateMap);
    }

}
