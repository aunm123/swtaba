package com.tim.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.tim.entity.TItem;
import com.tim.entity.TItemContent;
import com.tim.entity.TItemImg;
import com.tim.entity.TTbkItem;
import com.tim.mapper.TItemMapper;
import com.tim.mapper.TTbkItemMapper;
import com.tim.service.ITItemService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.tim.util.JSONUtil;
import com.tim.util.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author tim
 * @since 2018-12-06
 */
@Service
public class TItemServiceImpl extends ServiceImpl<TItemMapper, TItem> implements ITItemService {

    @Autowired
    TTbkItemServiceImpl tbkItemService;
    @Autowired
    TItemImgServiceImpl itemImgService;
    @Autowired
    TItemContentServiceImpl itemContentService;
    @Autowired
    TItemMapper itemMapper;

    public Page<TItem> selectPage(Integer page) {
        Page<TItem> itemPage = new Page<>(page, 50);
        return super.selectPage(itemPage);
    }

    @Transactional
    public void saveItem(TItem item, List<TItemImg> itemImgs, TTbkItem tbkItem) {

        tbkItemService.insertOrUpdate(tbkItem);

        // 先清理旧的图片数据，再插入新的图片数据
        Wrapper wrapper = new EntityWrapper<>();
        wrapper.eq("item_id", item.getNumIid());
        itemImgService.delete(wrapper);
        for (TItemImg img : itemImgs) {
            itemImgService.insert(img);
        }

        this.insertOrUpdate(item);

    }

    public ResultUtil selectNewList(Integer page, Integer pageSize, Integer categoryid) {

        Wrapper wrapper = new EntityWrapper<>();
        if (categoryid != 0) {
            wrapper.eq("category", categoryid);
        }
        wrapper.orderBy(true, "volume", false);
        Page<TItem> itemPage = new Page<>(page,pageSize);
        Page items = this.selectPage(itemPage, wrapper);

        ArrayList<Object> objects = new ArrayList<>();

        for (TItem item : (List<TItem>) items.getRecords()) {

            Wrapper selectItemid = new EntityWrapper<>();
            selectItemid.eq("item_id",item.getNumIid());
            TTbkItem tbkItem = tbkItemService.selectOne(selectItemid);

            if (tbkItem != null) {
                JSONObject jsonObject = JSONUtil.connect(tbkItem, item);
                objects.add(jsonObject);
            }

        }

        return new ResultUtil(objects, items.getTotal(), page);

    }

    public Map selectDetail(String itemid) {
        try {

            Wrapper wrapper = new EntityWrapper<>();
            wrapper.eq("item_id", itemid);
            TTbkItem tbkItem = tbkItemService.selectOne(wrapper);

            if (tbkItem == null) {
                return null;
            }

            TItem tItem = this.selectById(tbkItem.getItemId());

            List imglist = itemImgService.selectList(wrapper);
            HashMap<Object, Object> imgmap = new HashMap<>();
            imgmap.put("smallimg", imglist);


            Object itemContent = itemContentService.selectOne(wrapper);

            if (itemContent == null) {
                JSONObject short_Object = JSONUtil.connect(tbkItem, tItem, imgmap);
                return short_Object;
            }

            JSONObject jsonObject = JSONUtil.connect(tbkItem, tItem, imgmap, itemContent);

            return jsonObject;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }


    public ResultUtil selectKeyWord(Integer page, Integer pageSize, Integer categoryid,
                             String volumne,                // 月销售额
                             String price,                // 价格
                             String keyword) {
        try {

            Wrapper wrapper = new EntityWrapper<>();
            if (categoryid != 0) {
                wrapper = wrapper.eq("categoryid", categoryid);
            }
            if (volumne.length() > 0) {
                if (volumne.equals("a")){
                    wrapper = wrapper.orderBy("volume", true);
                }else {
                    wrapper = wrapper.orderBy("volume", false);
                }
            }
            if (price.length() > 0) {
                if (price.equals("a")){
                    wrapper = wrapper.orderBy("zk_final_price", true);
                }else {
                    wrapper = wrapper.orderBy("zk_final_price", false);
                }
            }

            String filter_key = JSONUtil.StringFilter(keyword);
            wrapper = wrapper.like("title",filter_key).or().like("short_title",filter_key);

            Page<TItem> itemPage = new Page<TItem>(page, pageSize);
            Page itemsPage = this.selectPage(itemPage, wrapper);

            ArrayList<Object> objects = new ArrayList<>();
            for (TItem item : (List<TItem>) itemsPage.getRecords()){

                Wrapper wrapper1 = new EntityWrapper();
                wrapper1.eq("item_id",item.getNumIid());

                TTbkItem tbkItem = tbkItemService.selectOne(wrapper1);

                JSONObject jsonObject = JSONUtil.connect(tbkItem, item);
                objects.add(jsonObject);

            }

            return new ResultUtil(objects, itemsPage.getTotal(), page);

        } catch (Exception e) {
            return new ResultUtil(e);
        }

    }


    @Transactional
    public void cleanUpItems() {
        itemMapper.cleanItemsContent();
        itemMapper.cleanItemsImg();
        itemMapper.cleanItemstbk();
    }
}
