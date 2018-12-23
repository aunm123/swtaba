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
import com.tim.entity.TItem;
import com.tim.entity.TItemContent;
import com.tim.entity.TItemImg;
import com.tim.entity.TTbkItem;
import com.tim.magic.PackageCouponData;
import com.tim.pool.WebDriverPick;
import com.tim.service.impl.TItemContentServiceImpl;
import com.tim.service.impl.TItemImgServiceImpl;
import com.tim.service.impl.TItemServiceImpl;
import com.tim.service.impl.TTbkItemServiceImpl;
import com.tim.util.JSONUtil;
import com.tim.util.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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
	TItemServiceImpl itemService;
	@Autowired
	TItemImgServiceImpl itemImgService;
	@Autowired
	TItemContentServiceImpl itemContentService;
	@Autowired
	PackageCouponData packageCouponData;
	@Autowired
	WebDriverPick webDriverPick;
	@Autowired
	TaobaoClient client;

	@ResponseBody
	@RequestMapping(value = "/top")
	public ResultUtil top(
			@RequestParam(defaultValue = "1") Integer page,
			@RequestParam(defaultValue = "50") Integer pageSize,
			@RequestParam(defaultValue = "0") Integer categoryid
	){

		ResultUtil resultUtil = itemService.selectNewList(page, pageSize, categoryid);

		return resultUtil;
	}

	@ResponseBody
	@RequestMapping(value = "/detail")
	public ResultUtil detail(@RequestParam String itemid){

		Map map = itemService.selectDetail(itemid);

		return new ResultUtil(map);
	}

	@ResponseBody
	@RequestMapping(value = "/search")
	public Object search(@RequestParam(defaultValue = "1") Integer page,
					   @RequestParam(defaultValue = "50") Integer pageSize,
					   @RequestParam String keyword){

		ResultUtil resultUtil = packageCouponData.packWithWord(keyword, page, pageSize);

		return  resultUtil;
	}

	@ResponseBody
	@RequestMapping(value = "/shorturl")
	public ResultUtil short_url(@RequestParam String url,
							@RequestParam String text,
							@RequestParam String logo){

		if (url.equals("")){
			HashMap<Object, Object> map = new HashMap<>();
			ResultUtil resultUtil = new ResultUtil(map);
			return  resultUtil;
		}

		String tempUrl = url;
		if (!tempUrl.startsWith("https://")){
			tempUrl = "https:" + url;
		}
		TbkTpwdCreateRequest req = new TbkTpwdCreateRequest();
		req.setUrl(tempUrl);
		req.setText(text);
		req.setLogo(logo);
		try {
			TbkTpwdCreateResponse rsp = client.execute(req);
			JSONObject data = JSONObject.parseObject(rsp.getBody()).getJSONObject("tbk_tpwd_create_response").getJSONObject("data");
			HashMap<Object, Object> map = new HashMap<>();
			map.put("shorturl",data.getString("model"));
			ResultUtil resultUtil = new ResultUtil(map);
			return  resultUtil;

		} catch (ApiException e) {
			e.printStackTrace();
			return  new ResultUtil(e);
		}

	}

	@ResponseBody
	@RequestMapping(value = "/oppo")
	public ResultUtil oppo_url(@RequestParam String num_iid){

		TbkItemRecommendGetRequest req = new TbkItemRecommendGetRequest();
		req.setFields("num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url");
		req.setNumIid(Long.valueOf(num_iid));
		req.setCount(20L);
		req.setPlatform(1L);
		try {
			TbkItemRecommendGetResponse rsp = client.execute(req);
			HashMap<Object, Object> map = new HashMap<>();
			ResultUtil resultUtil = new ResultUtil(map);
			return  resultUtil;

		} catch (ApiException e) {
			e.printStackTrace();
			return  new ResultUtil(e);
		}
	}
}
