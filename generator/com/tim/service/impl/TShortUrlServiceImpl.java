package com.tim.service.impl;

import com.tim.entity.TShortUrl;
import com.tim.mapper.TShortUrlMapper;
import com.tim.service.ITShortUrlService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author tim
 * @since 2018-12-26
 */
@Service
public class TShortUrlServiceImpl extends ServiceImpl<TShortUrlMapper, TShortUrl> implements ITShortUrlService {

}
