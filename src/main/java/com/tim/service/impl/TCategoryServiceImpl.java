package com.tim.service.impl;

import com.tim.entity.TCategory;
import com.tim.mapper.TCategoryMapper;
import com.tim.service.ITCategoryService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author tim
 * @since 2018-12-06
 */
@Service
public class TCategoryServiceImpl extends ServiceImpl<TCategoryMapper, TCategory> implements ITCategoryService {

}
