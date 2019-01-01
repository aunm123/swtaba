package com.tim.magic;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.taobao.api.ApiException;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.TbkDgItemCouponGetRequest;
import com.taobao.api.request.TbkDgMaterialOptionalRequest;
import com.taobao.api.request.TbkItemInfoGetRequest;
import com.taobao.api.response.TbkDgItemCouponGetResponse;
import com.taobao.api.response.TbkDgMaterialOptionalResponse;
import com.taobao.api.response.TbkItemInfoGetResponse;
import com.tim.config.TBConf;
import com.tim.entity.TCategory;
import com.tim.entity.TItem;
import com.tim.entity.TItemImg;
import com.tim.entity.TTbkItem;
import com.tim.mapper.TItemMapper;
import com.tim.mapper.TTbkItemMapper;
import com.tim.service.impl.TCategoryServiceImpl;
import com.tim.service.impl.TItemServiceImpl;
import com.tim.util.JSONUtil;
import com.tim.util.ResultUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Array;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Tim on 2018/12/5.
 */
@Slf4j
@Component
public class PackageCouponData {

    @Autowired
    TaobaoClient client;

    @Autowired
    TItemServiceImpl itemService;

    @Autowired
    TCategoryServiceImpl categoryService;

    /**
     * 搜索并记录优惠卷数据
     *
     * @param keyword
     * @param page
     * @param pageSize
     */
    public ResultUtil packWithWord(String keyword, Integer page, Integer pageSize) {

        try {
            TbkDgItemCouponGetRequest req = new TbkDgItemCouponGetRequest();
            req.setAdzoneId(Long.valueOf(TBConf.AdzoneId));
            req.setPlatform(1L);
            req.setPageSize(Long.valueOf(pageSize));
            req.setQ(keyword);
            req.setPageNo(Long.valueOf(page));
            TbkDgItemCouponGetResponse rsp = null;
            rsp = client.execute(req);

            JSONArray tbk_coupon = ((JSONObject) JSON.parse(rsp.getBody())).getJSONObject("tbk_dg_item_coupon_get_response")
                    .getJSONObject("results").getJSONArray("tbk_coupon");

            ArrayList<Object> datas = new ArrayList<>();

            for (Object coupon : tbk_coupon) {
                JSONObject data = (JSONObject) coupon;

                TItem item = new TItem();
                item.setCategory(data.getString("category"));
                item.setItemUrl(data.getString("item_url"));

                item.setNick(data.getString("nick"));

                item.setNumIid(data.getString("num_iid"));
                item.setPictUrl(data.getString("pict_url"));

                item.setSellerId(data.getString("seller_id"));
                item.setTitle(data.getString("title"));
                item.setUserType(data.getInteger("user_type"));
                item.setVolume(data.getString("volume"));
                item.setItemDescription(data.getString("item_description"));
                item.setZkFinalPrice((int) (data.getFloatValue("zk_final_price") * 100));


                TTbkItem tbkItem = new TTbkItem();
                tbkItem.setCommissionRate((int) (data.getFloatValue("commission_rate") * 100));
                tbkItem.setCouponClickUrl(data.getString("coupon_click_url"));
                tbkItem.setCouponEndTime(data.getDate("coupon_end_time"));
                tbkItem.setCouponInfo(data.getString("coupon_info"));
                tbkItem.setCouponRemainCount(data.getInteger("coupon_remain_count"));
                tbkItem.setCouponStartTime(data.getDate("coupon_start_time"));
                tbkItem.setCouponTotalCount(data.getInteger("coupon_total_count"));
                tbkItem.setShopTitle(data.getString("shop_title"));
                tbkItem.setItemId(item.getNumIid());
                tbkItem.setCategory(data.getString("category"));

                LinkedList<TItemImg> tItemImgs = gettItemImgs(data, item);

                TbkItemInfoGetRequest req2 = new TbkItemInfoGetRequest();
                req2.setNumIids(item.getNumIid());
                req2.setPlatform(1L);
                TbkItemInfoGetResponse rsp2 = client.execute(req2);

                JSONArray item_detail_obj = ((JSONObject) JSON.parse(rsp2.getBody())).getJSONObject("tbk_item_info_get_response")
                        .getJSONObject("results").getJSONArray("n_tbk_item");
                for (Object item_detail : item_detail_obj) {
                    JSONObject item_d = (JSONObject) item_detail;

                    item.setProvcity(item_d.getString("provcity"));
                    item.setMaterialLibType(item_d.getInteger("material_lib_type"));
                    item.setNick(item_d.getString("nick"));
                    item.setReservePrice((int) (item_d.getFloat("reserve_price") * 100));

                    TCategory category = new TCategory();
                    category.setCatName(item_d.getString("cat_leaf_name"));
                    category.setId(Integer.valueOf(item.getCategory()));

                    categoryService.insertOrUpdate(category);
                }


                try {
                    itemService.saveItem(item, tItemImgs, tbkItem);


                } catch (Exception e) {
                } finally {
                    datas.add(JSONUtil.connect(tbkItem, item));
                }

            }


            Integer re = ((JSONObject) JSON.parse(rsp.getBody())).getJSONObject("tbk_dg_item_coupon_get_response")
                    .getInteger("total_results");


            return new ResultUtil(datas, re, page);


        } catch (Exception e) {
            e.printStackTrace();
            return new ResultUtil(e);
        }


    }

    /**
     * 默认 pageSize 50
     *
     * @param keyword
     * @param page
     */
    public ResultUtil packWithWord(String keyword, Integer page) {
        return packWithWord(keyword, page, 50);
    }

    /**
     * 自动设置分页
     *
     * @param keyword
     */
    public ResultUtil packWithWord(String keyword) {
        return packWithWord(keyword, 1, 50);
    }


    public ResultUtil packWithWord2(String keyword, Integer page, Integer pageSize) {


        try {

            TbkDgMaterialOptionalRequest req = new TbkDgMaterialOptionalRequest();
//			req.setStartDsr(10L);  // 店铺dsr评分
            req.setPageSize(Long.valueOf(pageSize));
            req.setPageNo(Long.valueOf(page));
            req.setPlatform(1L);
//			req.setEndTkRate(1234L); // 淘客佣金比率上限 如：1234表示12.34%
//			req.setStartTkRate(1234L); //淘客佣金比率下限，如：1234表示12.34%
//			req.setEndPrice(10L);   // 折扣价范围上限，单位：元
//            req.setStartPrice(10L); // 折扣价范围下限，单位：元
//            req.setIsOverseas(false);  // 是否海外商品
//            req.setIsTmall(false);   //  是否商城商品

            req.setSort("total_sales_des");  //排序_des（降序），排序_asc（升序），销量（total_sales），淘客佣金比率（tk_rate）， 累计推广量（tk_total_sales），总支出佣金（tk_total_commi），价格（price）
//			req.setItemloc("杭州");   //  所在地

            req.setQ(keyword);
//			req.setMaterialId(3767L);  //  官方的物料Id  不传时默认为2836
            req.setHasCoupon(true);  //  是否有优惠券

            req.setAdzoneId(Long.valueOf(TBConf.AdzoneId));

//            req.setNeedFreeShipment(true);  //   是否包邮
//            req.setNeedPrepay(true);        // 是否加入消费者保障
//            req.setIncludePayRate30(true);  // 成交转化是否高于行业均值
//            req.setIncludeGoodRate(true);    // 好评率是否高于行业均值
//            req.setIncludeRfdRate(true);    // 退款率是否低于行业均值
            req.setNpxLevel(1L);            // 牛皮癣程度，取值：1:不限，2:无，3:轻微
//			req.setEndKaTkRate(1234L);		// KA媒体淘客佣金比率上限
//			req.setStartKaTkRate(1234L);	// KA媒体淘客佣金比率下限
            TbkDgMaterialOptionalResponse rsp = client.execute(req);

            JSONArray tbk_coupon = ((JSONObject) JSON.parse(rsp.getBody())).getJSONObject("tbk_dg_material_optional_response")
                    .getJSONObject("result_list").getJSONArray("map_data");

            ArrayList<Object> datas = new ArrayList<>();

            for (Object coupon : tbk_coupon) {
                JSONObject data = (JSONObject) coupon;

                // 主页图片都没有，肯定是无效数据，不获取
                if (data.getString("pict_url").length() <= 1) {
                    continue;
                }

                // 没有优惠卷,推广没收入,不获取
                String share_url = data.getString("coupon_share_url");
                if (share_url == null || share_url.length() <= 0) {
                    continue;
                }

                datas.add(saveItemData(data));

            }


            Integer re = ((JSONObject) JSON.parse(rsp.getBody())).getJSONObject("tbk_dg_material_optional_response")
                    .getInteger("total_results");

            log.info("关键字 '" + keyword + "' 一共有: " + re + " 条数据" + " page: " + page + " pageSize: " + pageSize);
            return new ResultUtil(datas, re, page);


        } catch (Exception e) {
            e.printStackTrace();
            return new ResultUtil(e);
        }
    }

    private LinkedList<TItemImg> gettItemImgs(JSONObject data, TItem item) {
        LinkedList<TItemImg> tItemImgs = new LinkedList<>();

        JSONArray small_images_array = null;
        Object images = data.get("small_images");
        if (images instanceof Collection){
            small_images_array = (JSONArray) images;

        }else {
            JSONObject small_images = data.getJSONObject("small_images");
            if (small_images != null) {
                small_images_array = small_images.getJSONArray("string");
            }
        }

        for (Object img_url_obj : small_images_array) {
            String img_url = (String) img_url_obj;

            TItemImg itemImg = new TItemImg();
            itemImg.setItemId(item.getNumIid());
            itemImg.setUrl(img_url);

            tItemImgs.add(itemImg);
        }

        return tItemImgs;
    }

    public Object saveItemData(JSONObject data){

        TItem item = new TItem();
        item.setCategory(data.getString("category_id"));
        item.setItemUrl(data.getString("item_url"));

        item.setNumIid(data.getString("num_iid"));
        item.setPictUrl(data.getString("pict_url"));
        item.setProvcity(data.getString("provcity"));

        item.setSellerId(data.getString("seller_id"));
        item.setTitle(data.getString("title"));
        item.setShortTitle(data.getString("short_title"));
        item.setUserType(data.getInteger("user_type"));
        item.setVolume(data.getString("volume"));
        item.setItemDescription(data.getString("item_description"));
        item.setZkFinalPrice((int) (data.getFloatValue("zk_final_price") * 100));
        item.setWhiteImage(data.getString("white_image"));
        item.setReservePrice((int) (data.getFloat("reserve_price") * 100));


        TTbkItem tbkItem = new TTbkItem();
        tbkItem.setCommissionRate( (int) (data.getFloat("commission_rate") * 100));
        tbkItem.setCommissionType(data.getString("commission_type"));

        tbkItem.setCouponId(data.getString("coupon_id"));
        tbkItem.setCouponInfo(data.getString("coupon_info"));
        tbkItem.setCouponRemainCount(data.getInteger("coupon_remain_count"));
        tbkItem.setCouponTotalCount(data.getInteger("coupon_total_count"));

        tbkItem.setCouponClickUrl(data.getString("coupon_share_url"));
        if (data.containsKey("coupon_click_url")){
            tbkItem.setCouponClickUrl(data.getString("coupon_click_url"));
        }

        tbkItem.setCouponEndTime(data.getDate("coupon_end_time"));
        tbkItem.setCouponStartTime(data.getDate("coupon_start_time"));

        Pattern pattern = Pattern.compile("减(\\d+)元");
        Matcher matcher = pattern.matcher(tbkItem.getCouponInfo());

        while (matcher.find()) {
            tbkItem.setCouponAmount(matcher.group(1));
            item.setZkFinalPrice(item.getReservePrice() - Integer.valueOf(tbkItem.getCouponAmount()));
        }


        tbkItem.setIncludeDxjh(data.getString("include_dxjh"));
        tbkItem.setIncludeMkt(data.getString("include_mkt"));

        tbkItem.setShopTitle(data.getString("shop_title"));
        tbkItem.setItemId(item.getNumIid());
        tbkItem.setCategory(data.getString("category_id"));


        // 父级 类别
        if (data.containsKey("level_one_category_id")){
            TCategory parent_category = new TCategory();
            parent_category.setId(data.getInteger("level_one_category_id"));
            parent_category.setCatName(data.getString("level_one_category_name"));
            categoryService.insertOrUpdate(parent_category);

            // 当前级 类别
            TCategory category = new TCategory();
            category.setId(data.getInteger("category_id"));
            category.setCatName(data.getString("category_name"));
            category.setParentId(parent_category.getId());
            categoryService.insertOrUpdate(category);

        }


        // 获得 小图片
        LinkedList<TItemImg> tItemImgs = gettItemImgs(data, item);

        try {
            itemService.saveItem(item, tItemImgs, tbkItem);

        } catch (Exception e) {
        } finally {
            return JSONUtil.connect(tbkItem, item);
        }

    }

}
