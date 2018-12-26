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
 * @since 2018-12-26
 */
@TableName("t_short_url")
public class TShortUrl extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @TableId("item_id")
    private String itemId;

    @TableField("create_date")
    private Date createDate;

    @TableField("update_date")
    private Date updateDate;

    @TableField("s_url")
    private String sUrl;

    private String url;

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
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
    public String getsUrl() {
        return sUrl;
    }

    public void setsUrl(String sUrl) {
        this.sUrl = sUrl;
    }
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "TShortUrl{" +
        "itemId=" + itemId +
        ", createDate=" + createDate +
        ", updateDate=" + updateDate +
        ", sUrl=" + sUrl +
        ", url=" + url +
        "}";
    }
}
