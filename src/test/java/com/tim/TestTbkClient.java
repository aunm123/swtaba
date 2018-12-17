package com.tim;

import com.taobao.api.ApiException;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.ProductGetRequest;
import com.taobao.api.request.ProductsSearchRequest;
import com.taobao.api.request.TbkDgItemCouponGetRequest;
import com.taobao.api.request.TbkItemGetRequest;
import com.taobao.api.response.ProductGetResponse;
import com.taobao.api.response.ProductsSearchResponse;
import com.taobao.api.response.TbkDgItemCouponGetResponse;
import com.taobao.api.response.TbkItemGetResponse;

import static com.tim.config.TBConf.APPKEY;
import static com.tim.config.TBConf.APPSCRET;
import static com.tim.config.TBConf.BASE_URL;

/**
 * Created by Tim on 2018/12/5.
 */
public class TestTbkClient {

	public static void main(String[] args) throws ApiException {

		TaobaoClient client = new DefaultTaobaoClient(BASE_URL, APPKEY, APPSCRET);


		TbkDgItemCouponGetRequest req = new TbkDgItemCouponGetRequest();
		req.setAdzoneId(62920816L);
		req.setPlatform(1L);
		req.setPageSize(50L);
		req.setQ("女装");
		req.setPageNo(1L);
		TbkDgItemCouponGetResponse rsp = client.execute(req);
		System.out.println(rsp.getBody());

//		TbkItemGetRequest req = new TbkItemGetRequest();
//		req.setFields("num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url,seller_id,volume,nick");
//		req.setQ("女装");
//		req.setPageNo(1L);
//		req.setPageSize(20L);
//		TbkItemGetResponse rsp = client.execute(req);
//		System.out.println(rsp.getBody());


	}
}
