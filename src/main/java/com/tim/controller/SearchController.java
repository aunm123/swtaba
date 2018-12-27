package com.tim.controller;

import com.tim.service.ITItemService;
import com.tim.util.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchController {

    @Autowired
    private ITItemService itemService;


    // 设计 api 搜索


    @ResponseBody
    @RequestMapping(value = "/search")
    public ResultUtil top(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "50") Integer pageSize,
            @RequestParam(defaultValue = "0") Integer categoryid,
            @RequestParam String q,
            @RequestParam String params
    ){



        ResultUtil resultUtil = itemService.selectNewList(page, pageSize, categoryid);

        return resultUtil;
    }

}
