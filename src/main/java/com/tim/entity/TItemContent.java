package com.tim.entity;

import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;
import com.tim.common.BaseEntity;

/**
 * <p>
 * 
 * </p>
 *
 * @author tim
 * @since 2018-12-06
 */
@TableName("t_item_content")
public class TItemContent extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @TableId("item_id")
    private String itemId;

    private String content;

    @TableField("create_date")
    private Date createDate;

    @TableField("update_date")
    private Date updateDate;

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    @Override
    public String toString() {
        return "TItemContent{" +
        "itemId=" + itemId +
        ", content=" + content +
        ", createDate=" + createDate +
        ", updateDate=" + updateDate +
        "}";
    }
}
