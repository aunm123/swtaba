package com.tim.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.tim.entity.TItem;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author tim
 * @since 2018-12-05
 */
@Repository
public interface TItemMapper extends BaseMapper<TItem> {

    @Delete("delete from `t_item_content` where \n" +
            "item_id in (\n" +
            "\tSELECT item_id from (\n" +
            "\t\tSELECT a.item_id,b.num_iid FROM `t_item_content` as a left join `t_item` as b on a.item_id = b.num_iid where b.num_iid is null\n" +
            "    ) temp\n" +
            ")")
    public void cleanItemsContent();


    @Delete("delete from `t_item_content` where \n" +
            "item_id in (\n" +
            "\tSELECT item_id from (\n" +
            "\t\tSELECT a.item_id,b.num_iid FROM `t_item_content` as a left join `t_item` as b on a.item_id = b.num_iid where b.num_iid is null\n" +
            "    ) temp\n" +
            ")")
    public void cleanItemsImg();


    @Delete("delete from `t_tbk_item` where \n" +
            "item_id in (\n" +
            "\tSELECT item_id from (\n" +
            "\t\tSELECT a.item_id,b.num_iid FROM `t_tbk_item` as a left join `t_item` as b on a.item_id = b.num_iid where b.num_iid is null\n" +
            "    ) temp\n" +
            ")")
    public void cleanItemstbk();

}
