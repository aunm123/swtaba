package com.tim.entity;

import com.baomidou.mybatisplus.enums.IdType;
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
 * @since 2019-01-02
 */
@TableName("t_top_sell")
public class TTopSell extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    private String icon;

    @TableField("c_name")
    private String cName;

    @TableField("create_date")
    private Date createDate;

    @TableField("update_date")
    private Date updateDate;

    private Integer isdelete;

    private String keyword;

    private Integer parentid;

    private String color;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
    public String getcName() {
        return cName;
    }

    public void setcName(String cName) {
        this.cName = cName;
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
    public Integer getIsdelete() {
        return isdelete;
    }

    public void setIsdelete(Integer isdelete) {
        this.isdelete = isdelete;
    }
    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }
    public Integer getParentid() {
        return parentid;
    }

    public void setParentid(Integer parentid) {
        this.parentid = parentid;
    }
    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public String toString() {
        return "TTopSell{" +
        "id=" + id +
        ", icon=" + icon +
        ", cName=" + cName +
        ", createDate=" + createDate +
        ", updateDate=" + updateDate +
        ", isdelete=" + isdelete +
        ", keyword=" + keyword +
        ", parentid=" + parentid +
        ", color=" + color +
        "}";
    }
}
