package com.tim.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.tim.entity.THot;
import com.tim.mapper.THotMapper;
import com.tim.service.ITHotService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author tim
 * @since 2019-01-03
 */
@Service
public class THotServiceImpl extends ServiceImpl<THotMapper, THot> implements ITHotService {

    @Autowired
    private THotMapper hotMapper;

    public List<String> getHotList(){

        Wrapper wrapper = new EntityWrapper<>();
        wrapper.orderBy("sort",true);
        List<THot> tHots = hotMapper.selectList(wrapper);

        List<String> result = new ArrayList<>();
        for (THot hot : tHots){
            result.add(hot.getName());
        }

        return result;
    }

}
