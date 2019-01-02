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
 * @since 2019-01-02
 */
@TableName("t_item")
public class TItem extends BaseEntity {

    private static final long serialVersionUID = 1L;

    private String category;

    @TableField("item_url")
    private String itemUrl;

    @TableField("material_lib_type")
    private Integer materialLibType;

    private String nick;

    @TableId("num_iid")
    private String numIid;

    @TableField("pict_url")
    private String pictUrl;

    private String provcity;

    @TableField("reserve_price")
    private Integer reservePrice;

    @TableField("seller_id")
    private String sellerId;

    private String title;

    @TableField("user_type")
    private Integer userType;

    private Integer volume;

    @TableField("zk_final_price")
    private Integer zkFinalPrice;

    @TableField("item_description")
    private String itemDescription;

    @TableField("create_date")
    private Date createDate;

    @TableField("update_date")
    private Date updateDate;

    private Integer isdelete;

    @TableField("short_title")
    private String shortTitle;

    @TableField("white_image")
    private String whiteImage;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    public String getItemUrl() {
        return itemUrl;
    }

    public void setItemUrl(String itemUrl) {
        this.itemUrl = itemUrl;
    }
    public Integer getMaterialLibType() {
        return materialLibType;
    }

    public void setMaterialLibType(Integer materialLibType) {
        this.materialLibType = materialLibType;
    }
    public String getNick() {
        return nick;
    }

    public void setNick(String nick) {
        this.nick = nick;
    }
    public String getNumIid() {
        return numIid;
    }

    public void setNumIid(String numIid) {
        this.numIid = numIid;
    }
    public String getPictUrl() {
        return pictUrl;
    }

    public void setPictUrl(String pictUrl) {
        this.pictUrl = pictUrl;
    }
    public String getProvcity() {
        return provcity;
    }

    public void setProvcity(String provcity) {
        this.provcity = provcity;
    }
    public Integer getReservePrice() {
        return reservePrice;
    }

    public void setReservePrice(Integer reservePrice) {
        this.reservePrice = reservePrice;
    }
    public String getSellerId() {
        return sellerId;
    }

    public void setSellerId(String sellerId) {
        this.sellerId = sellerId;
    }
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }
    public Integer getVolume() {
        return volume;
    }

    public void setVolume(Integer volume) {
        this.volume = volume;
    }
    public Integer getZkFinalPrice() {
        return zkFinalPrice;
    }

    public void setZkFinalPrice(Integer zkFinalPrice) {
        this.zkFinalPrice = zkFinalPrice;
    }
    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
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
    public String getShortTitle() {
        return shortTitle;
    }

    public void setShortTitle(String shortTitle) {
        this.shortTitle = shortTitle;
    }
    public String getWhiteImage() {
        return whiteImage;
    }

    public void setWhiteImage(String whiteImage) {
        this.whiteImage = whiteImage;
    }

    @Override
    public String toString() {
        return "TItem{" +
        "category=" + category +
        ", itemUrl=" + itemUrl +
        ", materialLibType=" + materialLibType +
        ", nick=" + nick +
        ", numIid=" + numIid +
        ", pictUrl=" + pictUrl +
        ", provcity=" + provcity +
        ", reservePrice=" + reservePrice +
        ", sellerId=" + sellerId +
        ", title=" + title +
        ", userType=" + userType +
        ", volume=" + volume +
        ", zkFinalPrice=" + zkFinalPrice +
        ", itemDescription=" + itemDescription +
        ", createDate=" + createDate +
        ", updateDate=" + updateDate +
        ", isdelete=" + isdelete +
        ", shortTitle=" + shortTitle +
        ", whiteImage=" + whiteImage +
        "}";
    }
}
