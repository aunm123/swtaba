package com.tim.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.tim.entity.TKey;
import com.tim.magic.PackageCouponData;
import com.tim.service.ITItemService;
import com.tim.util.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/search")
public class SearchController {

    @Autowired
    private ITItemService itemService;

    @Autowired
    PackageCouponData packageCouponData;

    // 设计 api 搜索


    @ResponseBody
    @RequestMapping(value = "/se")
    public ResultUtil search(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "50") Integer pageSize,
            @RequestParam(defaultValue = "0") Integer categoryid,
            @RequestParam String q,
            @RequestParam(defaultValue = "") String v,                // 月销售额
            @RequestParam(defaultValue = "") String p,                // 价格
            @RequestParam(defaultValue = "") String m,
            HttpServletRequest request
    ){

        packageCouponData.packWithWord2(q, page, pageSize+200);

        ResultUtil resultUtil = itemService.selectKeyWord(page, pageSize, categoryid, v, p, q);
        return  resultUtil;

    }

}
