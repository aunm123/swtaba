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
 * @since 2018-12-26
 */
@TableName("t_tbk_item")
public class TTbkItem extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @TableField("commission_type")
    private String commissionType;

    @TableField("commission_rate")
    private Integer commissionRate;

    @TableField("coupon_click_url")
    private String couponClickUrl;

    @TableField("coupon_id")
    private String couponId;

    @TableField("coupon_end_time")
    private Date couponEndTime;

    @TableField("coupon_info")
    private String couponInfo;

    @TableField("coupon_remain_count")
    private Integer couponRemainCount;

    @TableField("coupon_start_time")
    private Date couponStartTime;

    @TableField("coupon_total_count")
    private Integer couponTotalCount;

    @TableField("shop_dsr")
    private Integer shopDsr;

    @TableField("shop_title")
    private String shopTitle;

    @TableField("item_id")
    private String itemId;

    @TableField("create_date")
    private Date createDate;

    @TableField("update_date")
    private Date updateDate;

    private Integer isdelete;

    private String category;

    @TableField("include_dxjh")
    private String includeDxjh;

    @TableField("include_mkt")
    private String includeMkt;

    @TableField("coupon_amount")
    private String couponAmount;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public String getCommissionType() {
        return commissionType;
    }

    public void setCommissionType(String commissionType) {
        this.commissionType = commissionType;
    }
    public Integer getCommissionRate() {
        return commissionRate;
    }

    public void setCommissionRate(Integer commissionRate) {
        this.commissionRate = commissionRate;
    }
    public String getCouponClickUrl() {
        return couponClickUrl;
    }

    public void setCouponClickUrl(String couponClickUrl) {
        this.couponClickUrl = couponClickUrl;
    }
    public String getCouponId() {
        return couponId;
    }

    public void setCouponId(String couponId) {
        this.couponId = couponId;
    }
    public Date getCouponEndTime() {
        return couponEndTime;
    }

    public void setCouponEndTime(Date couponEndTime) {
        this.couponEndTime = couponEndTime;
    }
    public String getCouponInfo() {
        return couponInfo;
    }

    public void setCouponInfo(String couponInfo) {
        this.couponInfo = couponInfo;
    }
    public Integer getCouponRemainCount() {
        return couponRemainCount;
    }

    public void setCouponRemainCount(Integer couponRemainCount) {
        this.couponRemainCount = couponRemainCount;
    }
    public Date getCouponStartTime() {
        return couponStartTime;
    }

    public void setCouponStartTime(Date couponStartTime) {
        this.couponStartTime = couponStartTime;
    }
    public Integer getCouponTotalCount() {
        return couponTotalCount;
    }

    public void setCouponTotalCount(Integer couponTotalCount) {
        this.couponTotalCount = couponTotalCount;
    }
    public Integer getShopDsr() {
        return shopDsr;
    }

    public void setShopDsr(Integer shopDsr) {
        this.shopDsr = shopDsr;
    }
    public String getShopTitle() {
        return shopTitle;
    }

    public void setShopTitle(String shopTitle) {
        this.shopTitle = shopTitle;
    }
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
    public Integer getIsdelete() {
        return isdelete;
    }

    public void setIsdelete(Integer isdelete) {
        this.isdelete = isdelete;
    }
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    public String getIncludeDxjh() {
        return includeDxjh;
    }

    public void setIncludeDxjh(String includeDxjh) {
        this.includeDxjh = includeDxjh;
    }
    public String getIncludeMkt() {
        return includeMkt;
    }

    public void setIncludeMkt(String includeMkt) {
        this.includeMkt = includeMkt;
    }
    public String getCouponAmount() {
        return couponAmount;
    }

    public void setCouponAmount(String couponAmount) {
        this.couponAmount = couponAmount;
    }

    @Override
    public String toString() {
        return "TTbkItem{" +
        "id=" + id +
        ", commissionType=" + commissionType +
        ", commissionRate=" + commissionRate +
        ", couponClickUrl=" + couponClickUrl +
        ", couponId=" + couponId +
        ", couponEndTime=" + couponEndTime +
        ", couponInfo=" + couponInfo +
        ", couponRemainCount=" + couponRemainCount +
        ", couponStartTime=" + couponStartTime +
        ", couponTotalCount=" + couponTotalCount +
        ", shopDsr=" + shopDsr +
        ", shopTitle=" + shopTitle +
        ", itemId=" + itemId +
        ", createDate=" + createDate +
        ", updateDate=" + updateDate +
        ", isdelete=" + isdelete +
        ", category=" + category +
        ", includeDxjh=" + includeDxjh +
        ", includeMkt=" + includeMkt +
        ", couponAmount=" + couponAmount +
        "}";
    }
}
