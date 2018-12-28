/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : localhost
 Source Database       : tbshop

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : utf-8

 Date: 12/28/2018 21:47:13 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `t_category`
-- ----------------------------
DROP TABLE IF EXISTS `t_category`;
CREATE TABLE `t_category` (
  `id` int(11) NOT NULL,
  `cat_name` varchar(32) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isdelete` int(10) unsigned zerofill DEFAULT NULL,
  `parent_id` int(11) unsigned zerofill DEFAULT '00000000000',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `t_item`
-- ----------------------------
DROP TABLE IF EXISTS `t_item`;
CREATE TABLE `t_item` (
  `category` varchar(32) DEFAULT NULL,
  `item_url` varchar(2046) DEFAULT NULL,
  `material_lib_type` int(11) DEFAULT NULL,
  `nick` varchar(255) DEFAULT NULL,
  `num_iid` varchar(32) NOT NULL,
  `pict_url` varchar(2046) DEFAULT NULL,
  `provcity` varchar(32) DEFAULT NULL,
  `reserve_price` int(11) DEFAULT NULL,
  `seller_id` varchar(32) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_type` int(11) DEFAULT NULL,
  `volume` varchar(255) DEFAULT NULL,
  `zk_final_price` int(11) DEFAULT NULL,
  `item_description` varchar(255) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isdelete` int(11) unsigned zerofill DEFAULT NULL,
  `short_title` varchar(255) DEFAULT NULL,
  `white_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`num_iid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `t_item_content`
-- ----------------------------
DROP TABLE IF EXISTS `t_item_content`;
CREATE TABLE `t_item_content` (
  `item_id` varchar(64) NOT NULL,
  `content` mediumtext,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `t_item_img`
-- ----------------------------
DROP TABLE IF EXISTS `t_item_img`;
CREATE TABLE `t_item_img` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` varchar(32) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isdelete` int(10) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12314 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `t_key`
-- ----------------------------
DROP TABLE IF EXISTS `t_key`;
CREATE TABLE `t_key` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(64) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `t_short_url`
-- ----------------------------
DROP TABLE IF EXISTS `t_short_url`;
CREATE TABLE `t_short_url` (
  `item_id` varchar(64) NOT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `s_url` varchar(256) DEFAULT NULL,
  `url` varchar(2046) DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `t_tbk_item`
-- ----------------------------
DROP TABLE IF EXISTS `t_tbk_item`;
CREATE TABLE `t_tbk_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commission_type` varchar(32) DEFAULT NULL,
  `commission_rate` int(11) DEFAULT NULL,
  `coupon_click_url` varchar(2046) DEFAULT NULL,
  `coupon_id` varchar(255) DEFAULT NULL,
  `coupon_end_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `coupon_info` varchar(255) DEFAULT NULL,
  `coupon_remain_count` int(11) DEFAULT NULL,
  `coupon_start_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `coupon_total_count` int(11) DEFAULT NULL,
  `shop_dsr` int(11) DEFAULT NULL,
  `shop_title` varchar(255) DEFAULT NULL,
  `item_id` varchar(64) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isdelete` int(10) unsigned zerofill DEFAULT NULL,
  `category` varchar(64) DEFAULT NULL,
  `include_dxjh` varchar(255) DEFAULT NULL,
  `include_mkt` varchar(255) DEFAULT NULL,
  `coupon_amount` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `alert` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16155 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
