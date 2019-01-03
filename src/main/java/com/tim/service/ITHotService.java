package com.tim.service;

import com.tim.entity.THot;
import com.baomidou.mybatisplus.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author tim
 * @since 2019-01-03
 */
public interface ITHotService extends IService<THot> {
    public List<String> getHotList();
}
