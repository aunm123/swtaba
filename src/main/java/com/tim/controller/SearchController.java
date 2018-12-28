package com.tim.controller;

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
import java.util.Map;

@RestController
@RequestMapping(value = "/search")
public class SearchController {

    @Autowired
    private ITItemService itemService;


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

        ResultUtil resultUtil = itemService.selectKeyWord(page, pageSize, categoryid, v, p, q);
        return  resultUtil;

    }

}
