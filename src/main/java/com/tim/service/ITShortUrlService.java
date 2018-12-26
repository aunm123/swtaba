package com.tim.service;

import com.taobao.api.ApiException;
import com.tim.entity.TShortUrl;
import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author tim
 * @since 2018-12-26
 */
public interface ITShortUrlService extends IService<TShortUrl> {

    public String getShortUrl(String itemid, String url, String text, String logo)  throws ApiException;
}
