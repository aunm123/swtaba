package com.tim.entity;

import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;
import com.tim.common.BaseEntity;

/**
 * <p>
 * 
 * </p>
 *
 * @author tim
 * @since 2019-01-01
 */
@TableName("t_url_cache")
public class TUrlCache extends BaseEntity {

    private static final long serialVersionUID = 1L;

    private String id;

    private String content;

    @TableField("create_date")
    private Date createDate;

    @TableField("update_date")
    private Date updateDate;

    @TableField("max_age")
    private Integer maxAge;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
    public Integer getMaxAge() {
        return maxAge;
    }

    public void setMaxAge(Integer maxAge) {
        this.maxAge = maxAge;
    }

    @Override
    public String toString() {
        return "TUrlCache{" +
        "id=" + id +
        ", content=" + content +
        ", createDate=" + createDate +
        ", updateDate=" + updateDate +
        ", maxAge=" + maxAge +
        "}";
    }
}
