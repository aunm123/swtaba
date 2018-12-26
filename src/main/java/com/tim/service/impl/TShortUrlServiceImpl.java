package com.tim.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.taobao.api.ApiException;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.TbkTpwdCreateRequest;
import com.taobao.api.response.TbkTpwdCreateResponse;
import com.tim.entity.TShortUrl;
import com.tim.mapper.TShortUrlMapper;
import com.tim.service.ITShortUrlService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.tim.util.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.HashMap;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author tim
 * @since 2018-12-26
 */
@Service
public class TShortUrlServiceImpl extends ServiceImpl<TShortUrlMapper, TShortUrl> implements ITShortUrlService {

    @Autowired
    TaobaoClient client;

    public String getShortUrl(String itemid, String url, String text, String logo) throws ApiException {

        // 先查数据库有没有
        TShortUrl shortUrl = this.selectById(itemid);
        if (shortUrl != null) {

            // 数据更新时间不超过20天 （缓存20天）
            Long nowTime = new Date().getTime();
            if ((shortUrl.getUpdateDate().getTime() - nowTime) < (3600 * 20 * 24 * 1000)) {
                return shortUrl.getsUrl();
            }
        } else {
            // 生成新的 short url

            TbkTpwdCreateRequest req = new TbkTpwdCreateRequest();
            req.setUrl(url);
            req.setText(text);
            req.setLogo(logo);

            TbkTpwdCreateResponse rsp = client.execute(req);
            JSONObject data = JSONObject.parseObject(rsp.getBody()).getJSONObject("tbk_tpwd_create_response").getJSONObject("data");

            String result_short_url = data.getString("model");

            if (result_short_url.length() > 3) {

                TShortUrl tShortUrl = new TShortUrl();
                tShortUrl.setItemId(itemid);
                tShortUrl.setsUrl(result_short_url);
                tShortUrl.setUrl(url);
                tShortUrl.setUpdateDate(new Date());
                this.insert(tShortUrl);

                return result_short_url;
            }

        }
        return null;
    }

}
