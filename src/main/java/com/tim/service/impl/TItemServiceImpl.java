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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务实现类
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
		Page<TItem> itemPage = new Page<>(page,50);
		return super.selectPage(itemPage);
	}

	@Transactional
	public void saveItem(TItem item, List<TItemImg> itemImgs, TTbkItem tbkItem){

		tbkItemService.insertOrUpdate(tbkItem);

		// 先清理旧的图片数据，再插入新的图片数据
		Wrapper wrapper = new EntityWrapper<>();
		wrapper.eq("item_id", item.getNumIid());
		itemImgService.delete(wrapper);
		for (TItemImg img : itemImgs){
			itemImgService.insert(img);
		}

		this.insertOrUpdate(item);

	}

	public ResultUtil selectNewList(Integer page, Integer pageSize, Integer categoryid){

		Wrapper wrapper = new EntityWrapper<>();
		if (categoryid !=0){
			wrapper.eq("category",categoryid);
		}
		wrapper.orderBy(true,"create_date",false);
		Page<TTbkItem> tbkItemPage = new Page<TTbkItem>(page,pageSize);
		Page tbkItems = tbkItemService.selectPage(tbkItemPage, wrapper);

		ArrayList<Object> objects = new ArrayList<>();

		for (TTbkItem tbkItem : (List<TTbkItem>)tbkItems.getRecords()){
			HashMap<Object, Object> map = new HashMap<>();

			TItem tItem = this.selectById(tbkItem.getItemId());

			JSONObject jsonObject = JSONUtil.connect(tbkItem, tItem);
			objects.add(jsonObject);
		}

		return new ResultUtil(objects,tbkItems.getTotal(),page);

	}

	public Map selectDetail(String itemid){
		try {

			Wrapper wrapper = new EntityWrapper<>();
			wrapper.eq("item_id",itemid);
			TTbkItem tbkItem = tbkItemService.selectOne(wrapper);

			TItem tItem = this.selectById(tbkItem.getItemId());

			List imglist = itemImgService.selectList(wrapper);
			HashMap<Object, Object> imgmap = new HashMap<>();
			imgmap.put("smallimg",imglist);


			Object itemContent = itemContentService.selectOne(wrapper);

			if (itemContent == null) {
				JSONObject short_Object = JSONUtil.connect(tbkItem, tItem, imgmap);
				return  short_Object;
			}

			JSONObject jsonObject = JSONUtil.connect(tbkItem, tItem, imgmap,itemContent);

			return jsonObject;

		}catch (Exception e){
			e.printStackTrace();
			return null;
		}

	}


	@Transactional
	public void cleanUpItems(){
		itemMapper.cleanItemsContent();
		itemMapper.cleanItemsImg();
		itemMapper.cleanItemstbk();
	}
}
