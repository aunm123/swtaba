package com.tim.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.tim.entity.TItem;
import com.baomidou.mybatisplus.service.IService;
import com.tim.entity.TItemImg;
import com.tim.entity.TTbkItem;
import com.tim.util.ResultUtil;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author tim
 * @since 2018-12-06
 */
public interface ITItemService extends IService<TItem> {

    public Page<TItem> selectPage(Integer page);

    public void saveItem(TItem item, List<TItemImg> itemImgs, TTbkItem tbkItem);

    public ResultUtil selectNewList(Integer page, Integer pageSize, Integer categoryid);

    public Map selectDetail(String itemid);

    public ResultUtil selectKeyWord(Integer page, Integer pageSize, Integer categoryid,
                             String volumne,                // 月销售额
                             String price,                // 价格
                             String keyword);

    public void cleanUpItems();

}
