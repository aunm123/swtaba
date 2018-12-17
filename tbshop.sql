/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : tbshop

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-12-17 23:46:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_category
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
-- Records of t_category
-- ----------------------------
INSERT INTO `t_category` VALUES ('16', '女装/女士精品', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '00000000000');
INSERT INTO `t_category` VALUES ('50010850', '连衣裙', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '00000000016');

-- ----------------------------
-- Table structure for t_item
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
-- Records of t_item
-- ----------------------------
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=546291332295', null, null, '546291332295', 'https://img.alicdn.com/bao/uploaded/i3/1064942825/TB2hggMgR0kpuFjy1zdXXXuUVXa_!!1064942825.jpg', '浙江 杭州', null, '1064942825', '春季长袖连衣裙女新款韩版时尚针织毛衣修身春装裙子假两件套女装', '0', '0', '12900', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '春季长袖连衣裙新款韩版针织毛衣', 'https://img.alicdn.com/bao/uploaded/i3/1064942825/TB2hggMgR0kpuFjy1zdXXXuUVXa_!!1064942825.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=548075443188', null, null, '548075443188', 'https://img.alicdn.com/bao/uploaded/i2/2923030390/TB2v3TDmrBmpuFjSZFuXXaG_XXa_!!2923030390.jpg', '广东 广州', null, '2923030390', '文艺大摆长裙子棉麻无袖背心裙薄款圆领沙滩裙系带收腰长款连衣裙', '0', '1', '12800', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '文艺长裙子棉麻无袖背心裙沙滩裙', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=552916232397', null, null, '552916232397', 'https://img.alicdn.com/bao/uploaded/i4/TB1E7hBRpXXXXcVXXXXXXXXXXXX_!!0-item_pic.jpg', '广东 广州', null, '2649224605', '宝蓝色连衣裙女2017夏装新款中长款碎花印花桑蚕丝真丝裙子', '0', '0', '18000', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '宝蓝色连衣裙女2017夏装真丝裙子', 'https://img.alicdn.com/bao/uploaded/i4/TB1E7hBRpXXXXcVXXXXXXXXXXXX_!!0-item_pic.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=553624616801', null, null, '553624616801', 'https://img.alicdn.com/bao/uploaded/i1/TB1z5icRFXXXXXdXVXXXXXXXXXX_!!0-item_pic.jpg', '广东 广州', null, '2649224605', '2017秋新款碎花宽松显瘦大码裙子 红色印花天丝绉连衣裙', '0', '0', '29900', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '2017秋新款碎花宽松显瘦大码连衣裙', 'https://img.alicdn.com/bao/uploaded/i1/TB1z5icRFXXXXXdXVXXXXXXXXXX_!!0-item_pic.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=556222533446', null, null, '556222533446', 'https://img.alicdn.com/bao/uploaded/i2/411314805/TB2qXrSbU3iyKJjy1zeXXbxZFXa_!!411314805.jpg', '上海', null, '411314805', '2018新款女装春装一字肩连衣裙两件套裙子小香风牛仔裙chic套装裙', '0', '1', '10800', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '2018新款春装一字肩小香风牛仔裙', 'https://img.alicdn.com/bao/uploaded/i2/411314805/TB2qXrSbU3iyKJjy1zeXXbxZFXa_!!411314805.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=556444133207', null, null, '556444133207', 'https://img.alicdn.com/bao/uploaded/i3/725956494/TB2_izebVIkyKJjy0FgXXX0mFXa_!!725956494.jpg', '湖南 株洲', null, '725956494', '时尚休闲运动连衣裙秋季女装新款2017修身显瘦长袖连帽卫衣裙子女', '0', '0', '10800', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '时尚运动连衣裙秋季女装女卫衣裙子', 'https://img.alicdn.com/bao/uploaded/i3/725956494/TB2_izebVIkyKJjy0FgXXX0mFXa_!!725956494.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=557900373322', null, null, '557900373322', 'https://img.alicdn.com/bao/uploaded/i4/2649224605/TB2qJk4aOERMeJjy0FcXXc7opXa_!!2649224605.jpg', '广东 广州', null, '2649224605', '2017秋季新款七分袖时尚开叉印花连衣裙女收腰显瘦春秋裙子', '0', '0', '12600', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '2017秋季新款七分袖开叉春秋裙子', 'https://img.alicdn.com/bao/uploaded/i4/2649224605/TB2qJk4aOERMeJjy0FcXXc7opXa_!!2649224605.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=558026237421', null, null, '558026237421', 'https://img.alicdn.com/bao/uploaded/i3/2649224605/TB12kSAfGagSKJjy0FbXXa.mVXa_!!0-item_pic.jpg', '广东 广州', null, '2649224605', '2017秋装新款女七分袖显瘦条纹金丝绒连衣裙春秋季背带裙子', '0', '0', '16500', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '2017秋装新款七分袖显瘦背带裙子', 'https://img.alicdn.com/bao/uploaded/i3/2649224605/TB12kSAfGagSKJjy0FbXXa.mVXa_!!0-item_pic.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=569750022321', null, null, '569750022321', 'https://img.alicdn.com/bao/uploaded/i3/2787120464/TB1u.dyfJknBKNjSZKPXXX6OFXa_!!0-item_pic.jpg', '广东 广州', null, '2787120464', '蝴蝶结花朵雪纺中长款连衣裙子AD7617', '0', '0', '8190', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '蝴蝶结雪纺中长款ad7617连衣裙子', 'https://img.alicdn.com/bao/uploaded/TB1u.dyfJknBKNjSZKPXXX6OFXa_!!0-item_pic.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=573026242525', null, null, '573026242525', 'https://img.alicdn.com/bao/uploaded/i4/2580940288/TB2FGytCamWBuNjy1XaXXXCbXXa_!!2580940288.jpg', '浙江 杭州', null, '2580940288', '2018夏季女韩版简约条纹透气舒适显瘦短袖T恤+a裙子两件套', '0', '0', '2880', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '2018夏季韩版简约条纹透气舒适a裙', 'https://img.alicdn.com/bao/uploaded/i2/2580940288/TB2ssAnBVuWBuNjSszbXXcS7FXa_!!2580940288.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=573587995242', null, null, '573587995242', 'https://img.alicdn.com/imgextra/i2/4002022277/TB2NV52DQCWBuNjy0FaXXXUlXXa_!!4002022277.jpg', '浙江 杭州', null, '4002022277', '欧洲站连衣裙女夏2018新款及踝长裙00后学生森系pphome不规则裙子', '0', '0', '13800', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '欧洲站女夏2018新款及踝00后连衣裙', 'https://img.alicdn.com/bao/uploaded/i1/4002022277/TB2Qxa3DN9YBuNjy0FfXXXIsVXa_!!4002022277.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=575234629800', null, null, '575234629800', 'https://img.alicdn.com/bao/uploaded/i1/348907914/TB2pNi5nlsmBKNjSZFsXXaXSVXa_!!348907914.jpg', '广东 东莞', null, '348907914', '正式场合白色连衣裙女夏2018新款显瘦中长款OL职业气质女神范裙子', '0', '0', '20800', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '正式场合白色女夏2018新款ol连衣裙', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=575236445286', null, null, '575236445286', 'https://img.alicdn.com/bao/uploaded/i3/348907914/TB2AKYmnfImBKNjSZFlXXc43FXa_!!348907914.jpg', '广东 东莞', null, '348907914', 'ins超火的连衣裙女夏秋2018新款甜美针织腈纶单件裙子中长款装仙', '0', '0', '20800', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, 'ins超火的女夏秋2018新款连衣裙', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=575236881200', null, null, '575236881200', 'https://img.alicdn.com/bao/uploaded/i2/348907914/TB2622FnnCWBKNjSZFtXXaC3FXa_!!348907914.jpg', '广东 东莞', null, '348907914', '褶皱中长裙女性感紧身包臀连衣裙2018夏新款白色休闲修身一步裙子', '0', '0', '13800', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '褶皱女性感紧身包臀连衣裙一步裙子', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=575975449933', null, null, '575975449933', 'https://img.alicdn.com/bao/uploaded/i3/2794106726/TB1BNQyrYArBKNjSZFLXXc_dVXa_!!0-item_pic.jpg', '浙江 杭州', null, '2794106726', '2018女连衣裙新款秋装sukol少女裙子小心机显瘦长袖chic小黑裙', '0', '0', '17360', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '2018女连衣裙新款秋装显瘦少女裙子', 'https://img.alicdn.com/bao/uploaded/i4/2794106726/TB2TBZzrY3nBKNjSZFMXXaUSFXa_!!2794106726.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=576095106472', null, null, '576095106472', 'https://img.alicdn.com/bao/uploaded/i4/2794106726/TB1UK0grZUrBKNjSZPxXXX00pXa_!!0-item_pic.jpg', '浙江 杭州', null, '2794106726', '大码女装2018春装新款文艺复古棉麻长袖V领显瘦连衣裙大摆长裙子', '0', '0', '5960', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '大码女装2018春装新款文艺连衣裙', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=576269971134', null, null, '576269971134', 'https://img.alicdn.com/bao/uploaded/i4/2236890531/TB1kim2sCcqBKNjSZFgXXX_kXXa_!!0-item_pic.jpg', '安徽 阜阳', null, '2236890531', '2018秋装新款女装sukol少女裙子小心机显瘦长袖连衣裙chic小黑裙', '0', '0', '17360', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '2018秋装新款sukol小心机少女裙子', 'https://img.alicdn.com/bao/uploaded/i1/2236890531/TB2KayaspkoBKNjSZFkXXb4tFXa_!!2236890531.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=577400008781', null, null, '577400008781', 'https://img.alicdn.com/bao/uploaded/i2/3114806227/TB1qucBaNTpK1RjSZFGXXcHqFXa_!!0-item_pic.jpg', '陕西 西安', null, '3114806227', '2018新款女装冬装赫本小黑裙长袖打底针织连衣裙秋冬a字裙子显瘦', '0', '0', '7600', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '2018新款冬装赫本小黑裙长袖连衣裙', 'https://img.alicdn.com/bao/uploaded/i2/3114806227/TB2cmsAaSzqK1RjSZFLXXcn2XXa_!!3114806227.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=577693470685', null, null, '577693470685', 'https://img.alicdn.com/bao/uploaded/i3/821460505/TB1K.Vka4naK1RjSZFtXXbC2VXa_!!0-item_pic.jpg', '浙江 金华', null, '821460505', '韩版港味短袖收腰不规则连衣裙2018初秋新款女装裙子', '0', '0', '9350', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '韩版港味短袖收腰不规则2018连衣裙', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=577902214786', null, null, '577902214786', 'https://img.alicdn.com/bao/uploaded/i4/2787120464/TB1nG_kbSzqK1RjSZFjXXblCFXa_!!0-item_pic.jpg', '广东 广州', null, '2787120464', '2018秋装新款韩版立领气质长袖A字中长裙子蕾丝连衣裙559711', '0', '0', '8500', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '2018秋装新款韩版立领气质中长裙子', 'https://img.alicdn.com/bao/uploaded/i4/2787120464/TB25tYlbQvoK1RjSZFNXXcxMVXa_!!2787120464.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=578114679566', null, null, '578114679566', 'https://img.alicdn.com/bao/uploaded/i4/679384197/TB1GO9qcmzqK1RjSZFpXXakSXXa_!!0-item_pic.jpg', '山东 青岛', null, '679384197', '牛仔连衣裙2018秋季女装新款韩版显瘦收腰中长A字裙大码复古裙子', '0', '0', '9340', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '牛仔连衣裙2018秋季女装复古裙子', 'https://img.alicdn.com/bao/uploaded/i2/679384197/TB2Fc9qckvoK1RjSZFNXXcxMVXa_!!679384197.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=579331381882', null, null, '579331381882', 'https://img.alicdn.com/bao/uploaded/i4/2027744556/O1CN011jWgwRuW4Q3oenS_!!0-item_pic.jpg', '安徽 阜阳', null, '2027744556', '2018秋季新款大码女装马甲衬衣两件套装女洋气胖MM遮肚子连衣裙子', '0', '0', '6948', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '2018秋季新款大码女装马甲连衣裙子', 'https://img.alicdn.com/bao/uploaded/i2/2027744556/O1CN011jWgwRbUlVfgT1Y_!!2027744556.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=579578483724', null, null, '579578483724', 'https://img.alicdn.com/bao/uploaded/i2/2027744556/O1CN011jWgwQFfDTAQZ5N_!!0-item_pic.jpg', '安徽 阜阳', null, '2027744556', '牛仔连衣裙2018秋季女装新款韩版显瘦收腰中长A字裙大码复古裙子', '0', '0', '9340', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '牛仔连衣裙2018秋季女装复古裙子', 'https://img.alicdn.com/bao/uploaded/i3/2027744556/O1CN011jWgwSYE2ICU7Eo_!!2027744556.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=579806450126', null, null, '579806450126', 'https://img.alicdn.com/bao/uploaded/i3/2834854867/O1CN011lp87QyqYh7WXCT_!!0-item_pic.jpg', '广东 深圳', null, '2834854867', '牛仔连衣裙2018秋季女装新款韩版显瘦收腰中长A字裙大码复古裙子', '0', '0', '9340', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '牛仔连衣裙2018秋季女装复古裙子', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=580241119864', null, null, '580241119864', 'https://img.alicdn.com/bao/uploaded/i1/2552496848/O1CN0120SQj5uyqRlwnmB_!!0-item_pic.jpg', '广东 汕头', null, '2552496848', '牛仔连衣裙2018秋季女装新款韩版显瘦收腰中长A字裙大码复古裙子', '0', '0', '9340', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '牛仔连衣裙2018秋季女装复古裙子', 'https://img.alicdn.com/bao/uploaded/i3/2552496848/O1CN0120SQj4n3HZmRBrq_!!2552496848.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=581373758001', null, null, '581373758001', 'https://img.alicdn.com/bao/uploaded/i4/2814183162/TB1ACgEmMHqK1RjSZFgXXa7JXXa_!!0-item_pic.jpg', '浙江 金华', null, '2814183162', '2018秋冬新款韩版刺绣毛呢连衣裙女秋季加厚宽松显瘦灯笼袖裙子', '0', '0', '13300', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '2018秋冬新款韩版刺绣灯笼袖裙子', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=581994179917', null, null, '581994179917', 'https://img.alicdn.com/bao/uploaded/i4/1075624455/O1CN01TZPiwk1imQwpQGISk_!!0-item_pic.jpg', '浙江 金华', null, '1075624455', '321*2018女装连衣裙秋冬款韩版纯色连衣裙中长款长袖荷叶边裙子', '0', '0', '9500', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '321*2018连衣裙秋冬款荷叶边裙子', 'https://img.alicdn.com/bao/uploaded/i3/1075624455/O1CN011imQwiy44cMWIp7_!!1075624455.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=581994487071', null, null, '581994487071', 'https://img.alicdn.com/bao/uploaded/i4/1075624455/O1CN01RyfiED1imQwpkisep_!!0-item_pic.jpg', '浙江 金华', null, '1075624455', '2018网红俏皮两件套裙子chi秋冬新款韩版撞色针织连帽休闲套装女', '0', '0', '12500', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '2018网红俏皮chi秋冬两件套裙子', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=582595080872', null, null, '582595080872', 'https://img.alicdn.com/bao/uploaded/i4/1844466532/O1CN01mj7xja1y7ha4K3RW2_!!1844466532.jpg', '浙江 金华', null, '1844466532', '秋冬2018新款女装CHIC小香风百褶气质显瘦中长款针织毛衣连衣裙子', '0', '0', '15900', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '秋冬2018新款女装chic百褶连衣裙子', 'https://img.alicdn.com/bao/uploaded/i3/1844466532/O1CN01OPaRwP1y7ha6dOBai_!!1844466532.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=582899416285', null, null, '582899416285', 'https://img.alicdn.com/bao/uploaded/i1/4231264829/O1CN01NUj31P1lXj5A0LMkd_!!4231264829.jpg', '广东 广州', null, '4231264829', '杏色长裙子浴场工作服连衣裙长款裙子厚复古减龄长裙少女灰色裙摆', '0', '0', '14500', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '杏色长裙子浴场工作服长款厚连衣裙', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=582899580249', null, null, '582899580249', 'https://img.alicdn.com/bao/uploaded/i4/4231264829/O1CN01rnU8fp1lXj5AQ44wp_!!4231264829.jpg', '广东 广州', null, '4231264829', '伴娘2019妈妈厚实裙子浴场工作服连衣裙长款夜总会公主风成熟女装', '0', '0', '14500', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '伴娘2019妈妈厚实浴场工作服连衣裙', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=582900464176', null, null, '582900464176', 'https://img.alicdn.com/bao/uploaded/i1/4231264829/O1CN01fPdLgf1lXj5BaeFMh_!!4231264829.jpg', '广东 广州', null, '4231264829', '冬天连体2018短跳舞网红矮个子伴娘毛呢连衣裙秋冬款收腰打底裙子', '0', '0', '14500', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '连体2018短跳舞网红矮个子打底裙子', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=582900536349', null, null, '582900536349', 'https://img.alicdn.com/bao/uploaded/i3/4231264829/O1CN01PEaTDB1lXj59PSA7O_!!4231264829.jpg', '广东 广州', null, '4231264829', '长裙子女款小众加长裙子裙摆流行晚礼服大码法式连衣裙裙冬时尚款', '0', '0', '14500', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '长裙子女款小众加长裙子裙摆晚礼服', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=582900576676', null, null, '582900576676', 'https://img.alicdn.com/bao/uploaded/i2/4231264829/O1CN01MpvVwq1lXj59Pbh21_!!4231264829.jpg', '广东 广州', null, '4231264829', '百褶裙晚礼服适合包臀裙大码法式连衣裙裙冬洋气下摆毛呢打底裙子', '0', '0', '14500', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '百褶裙晚礼服适合大码法式打底裙子', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=582900744617', null, null, '582900744617', 'https://img.alicdn.com/bao/uploaded/i3/4231264829/O1CN013C9YTB1lXj5D7CmWe_!!4231264829.jpg', '广东 广州', null, '4231264829', '旅游女长裙子面料休闲姐姐过膝裙下摆舞台小清新连衣裙秋好看秋冬', '0', '0', '14500', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '旅游子面料休闲姐姐过膝裙秋女长裙', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=582901228792', null, null, '582901228792', 'https://img.alicdn.com/bao/uploaded/i3/4231264829/O1CN015D69jb1lXj5D7o2YU_!!4231264829.jpg', '广东 广州', null, '4231264829', '打底裙子小礼服毛线连衣裙秋冬高雅长款面料直筒过膝裙娃娃裙杏色', '0', '0', '14500', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '打底裙子小礼服毛线秋冬高雅连衣裙', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=582901332733', null, null, '582901332733', 'https://img.alicdn.com/bao/uploaded/i3/4231264829/O1CN01wqcf4r1lXj556MrFW_!!4231264829.jpg', '广东 广州', null, '4231264829', '打底裙子秋冬款毛线连衣裙秋冬连体裙长款公主清新生日时尚小礼服', '0', '0', '14500', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '秋冬款毛线连衣裙秋冬长款打底裙子', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=582901440223', null, null, '582901440223', 'https://img.alicdn.com/bao/uploaded/i4/4231264829/O1CN01p0bc4q1lXj5D7tLHd_!!4231264829.jpg', '广东 广州', null, '4231264829', '减龄公主裙旅游漂亮裙子外出毛线连衣裙秋冬适合长款档次教师浪漫', '0', '0', '14500', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '减龄旅游漂亮外出毛线连衣裙公主裙', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=582901916302', null, null, '582901916302', 'https://img.alicdn.com/bao/uploaded/i4/4231264829/O1CN01updCEx1lXj5AShDK4_!!4231264829.jpg', '广东 广州', null, '4231264829', '短面料阔太太连衣裙秋年会过膝打底裙子矮个子妈妈复古百搭连体裙', '0', '0', '14500', null, '2018-12-16 01:55:48', '2018-12-16 01:55:48', null, '短面料阔太太连衣裙秋年会打底裙子', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=582901932027', null, null, '582901932027', 'https://img.alicdn.com/bao/uploaded/i3/4231264829/O1CN01ZtFLo31lXj5Cj6y9c_!!4231264829.jpg', '广东 广州', null, '4231264829', '女款档次中长裙少女阔太太连衣裙秋厚过膝婚宴高腰百搭打底裙子长', '0', '0', '14500', null, '2018-12-16 01:55:48', '2018-12-16 01:55:48', null, '女款档次中长裙少女阔太太秋连衣裙', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=582902096202', null, null, '582902096202', 'https://img.alicdn.com/bao/uploaded/i3/4231264829/O1CN01lz8Yl01lXj5BcSy1H_!!4231264829.jpg', '广东 广州', null, '4231264829', '女生聚会连衣裙长裙子高贵新款暗黑百搭休闲灰色时髦女士漂亮流行', '0', '0', '14500', null, '2018-12-16 01:55:48', '2018-12-16 01:55:48', null, '女生聚会长裙子高贵新款暗黑连衣裙', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=582902100782', null, null, '582902100782', 'https://img.alicdn.com/bao/uploaded/i4/4231264829/O1CN01fMjhyi1lXj557CPwu_!!4231264829.jpg', '广东 广州', null, '4231264829', '后背黑色打底裙子个性晚宴厚女神范2019小礼服聚会连衣裙短裙高贵', '0', '0', '14500', null, '2018-12-16 01:55:48', '2018-12-16 01:55:48', null, '后背黑色打底裙子个性晚宴厚短裙', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=582902596628', null, null, '582902596628', 'https://img.alicdn.com/bao/uploaded/i4/4231264829/O1CN01bE1Q0Y1lXj5BptYUl_!!4231264829.jpg', '广东 广州', null, '4231264829', '短裙长裙子公主风晚会法国小众连衣裙娃娃裙晚礼服长袖厚实俏皮女', '0', '0', '14500', null, '2018-12-16 01:55:48', '2018-12-16 01:55:48', null, '长裙子公主风晚会法国小众长袖短裙', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=582925576958', null, null, '582925576958', 'https://img.alicdn.com/bao/uploaded/i3/4231264829/O1CN01HsVL7p1lXj5DYIcFb_!!4231264829.jpg', '广东 广州', null, '4231264829', '大码直筒连衣裙秋冬减龄灰色2018沙滩裙内搭小众打底裙子翻领米色', '0', '0', '15900', null, '2018-12-16 01:55:48', '2018-12-16 01:55:48', null, '大码直筒连衣裙减龄灰色打底裙子', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=582925984223', null, null, '582925984223', 'https://img.alicdn.com/bao/uploaded/i4/4231264829/O1CN01DJU8wn1lXj5CFVxFn_!!4231264829.jpg', '广东 广州', null, '4231264829', '长裙子短甜美夜场大码法式连衣裙裙冬夜店跳舞裙摆温柔毛衣裙面料', '0', '0', '15900', null, '2018-12-16 01:55:48', '2018-12-16 01:55:48', null, '长裙子短甜美夜场大码法式冬面料', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=582976556995', null, null, '582976556995', 'https://img.alicdn.com/bao/uploaded/i1/4231264829/O1CN01LB0Yxg1lXj5D0ANfo_!!4231264829.jpg', '广东 广州', null, '4231264829', '清新文艺短款法国小众连衣裙娃娃裙好看个性收腰弹力裙子优雅大码', '0', '0', '15900', null, '2018-12-16 01:55:48', '2018-12-16 01:55:48', null, '清新文艺短款法国小众好看弹力裙子', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=583712061345', null, null, '583712061345', 'https://img.alicdn.com/bao/uploaded/i3/624027810/O1CN016TPp3m27Z1l0StJ6I_!!624027810.jpg', '浙江 杭州', null, '624027810', '秋款女2018裙子ins超火的新款假两件纱女装宽松喇叭袖连衣', '0', '0', '14217', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '秋款2018 ins超火的新款假两件纱', 'https://img.alicdn.com/bao/uploaded/i1/624027810/O1CN01DoNDgw27Z1l2mSkev_!!624027810.jpg');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=583744397858', null, null, '583744397858', 'https://img.alicdn.com/bao/uploaded/i4/2814183162/O1CN01ByddFD1ZEEqOnB5uM_!!0-item_pic.jpg', '浙江 金华', null, '2814183162', '2018冬季新款韩版宽松圆领套头长裙子雪纺针织拼接连衣裙女.', '0', '0', '11400', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '2018冬季新款韩版宽松圆领长裙子', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=583840746660', null, null, '583840746660', 'https://img.alicdn.com/bao/uploaded/i3/624027810/O1CN01apLLs327Z1l2oXB46_!!624027810.jpg', '浙江 杭州', null, '624027810', '秋冬配初恋egg山本风小个子气质少女复古毛衣法式连衣裙桔梗裙子', '0', '0', '19018', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '秋冬配初恋egg山本风小个子气质', '');
INSERT INTO `t_item` VALUES ('50010850', 'https://item.taobao.com/item.htm?id=584020227337', null, null, '584020227337', 'https://img.alicdn.com/bao/uploaded/i4/3685848019/O1CN01IWmsbc296kX9vhHpM_!!3685848019.jpg', '上海', null, '3685848019', '妈妈装冬装加厚打底衫修身中长款加绒裙子中年女装旗袍领连衣裙', '0', '0', '16900', null, '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '妈妈装冬装加厚修身中长款打底衫', '');

-- ----------------------------
-- Table structure for t_item_content
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
-- Records of t_item_content
-- ----------------------------

-- ----------------------------
-- Table structure for t_item_img
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
) ENGINE=InnoDB AUTO_INCREMENT=1209 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_item_img
-- ----------------------------
INSERT INTO `t_item_img` VALUES ('1033', '552916232397', 'https://img.alicdn.com/i2/2649224605/TB2a.cdsRNkpuFjy0FaXXbRCVXa_!!2649224605.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1034', '552916232397', 'https://img.alicdn.com/i4/2649224605/TB2MxkswypnpuFjSZFIXXXh2VXa_!!2649224605.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1035', '557900373322', 'https://img.alicdn.com/i2/2649224605/TB2dhCFbEFWMKJjSZFvXXaenFXa_!!2649224605.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1036', '557900373322', 'https://img.alicdn.com/i4/2649224605/TB2iuE2aMsSMeJjSspcXXXjFXXa_!!2649224605.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1037', '557900373322', 'https://img.alicdn.com/i1/2649224605/TB2UFvEb.cKL1JjSZFzXXcfJXXa_!!2649224605.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1038', '558026237421', 'https://img.alicdn.com/i3/2649224605/TB2cT0EbwMPMeJjy1XbXXcwxVXa_!!2649224605.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1039', '558026237421', 'https://img.alicdn.com/i3/2649224605/TB2O8rscjJTMKJjSZFPXXbHUFXa_!!2649224605.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1040', '558026237421', 'https://img.alicdn.com/i3/2649224605/TB2GklHbwoQMeJjy0FoXXcShVXa_!!2649224605.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1041', '569750022321', 'https://img.alicdn.com/i4/2787120464/TB2yGuUa3ZC2uNjSZFnXXaxZpXa_!!2787120464.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1042', '569750022321', 'https://img.alicdn.com/i2/2787120464/TB2NdA6rbGYBuNjy0FoXXciBFXa_!!2787120464.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1043', '569750022321', 'https://img.alicdn.com/i2/2787120464/TB21.NQfRnTBKNjSZPfXXbf1XXa_!!2787120464.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1044', '569750022321', 'https://img.alicdn.com/i2/2787120464/TB27ilvruySBuNjy1zdXXXPxFXa_!!2787120464.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1045', '573026242525', 'https://img.alicdn.com/i1/2580940288/TB2NpzWtTXYBeNkHFrdXXciuVXa_!!2580940288.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1046', '573026242525', 'https://img.alicdn.com/i1/2580940288/TB2L3UTB25TBuNjSspmXXaDRVXa_!!2580940288.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1047', '573026242525', 'https://img.alicdn.com/i1/2580940288/TB21TWlCmtYBeNjSspaXXaOOFXa_!!2580940288.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1048', '573026242525', 'https://img.alicdn.com/i2/2580940288/TB2ssAnBVuWBuNjSszbXXcS7FXa_!!2580940288.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1049', '577902214786', 'https://img.alicdn.com/i3/2787120464/TB2aKzobQzoK1RjSZFlXXai4VXa_!!2787120464.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1050', '577902214786', 'https://img.alicdn.com/i2/2787120464/TB2eULkbFzqK1RjSZSgXXcpAVXa_!!2787120464.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1051', '577902214786', 'https://img.alicdn.com/i4/2787120464/TB25KDlbFYqK1RjSZLeXXbXppXa_!!2787120464.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1052', '577902214786', 'https://img.alicdn.com/i4/2787120464/TB25tYlbQvoK1RjSZFNXXcxMVXa_!!2787120464.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1053', '581373758001', 'https://img.alicdn.com/i4/2814183162/O1CN011ZEEpi0q4UkQDLr_!!2814183162.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1054', '581373758001', 'https://img.alicdn.com/i4/2814183162/O1CN01jTbOhE1ZEEpgzfZnp_!!2814183162.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1055', '581373758001', 'https://img.alicdn.com/i1/2814183162/O1CN011ZEEpi0rwv6Kddp_!!2814183162.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1056', '581373758001', 'https://img.alicdn.com/i1/2814183162/O1CN01xsK1R21ZEEpaIXccb_!!2814183162.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1057', '581994179917', 'https://img.alicdn.com/i1/1075624455/O1CN011imQwqzYkb9SIXe_!!1075624455.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1058', '581994179917', 'https://img.alicdn.com/i1/1075624455/O1CN01mTaC7D1imQwq1znuc_!!1075624455.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1059', '581994179917', 'https://img.alicdn.com/i2/1075624455/O1CN01NM0Klj1imQwp8zA2m_!!1075624455.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1060', '581994179917', 'https://img.alicdn.com/i3/1075624455/O1CN011imQwiy44cMWIp7_!!1075624455.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1061', '581994487071', 'https://img.alicdn.com/i2/1075624455/O1CN011imQwnoZLcTPhZ2_!!1075624455.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1062', '581994487071', 'https://img.alicdn.com/i2/1075624455/O1CN011imQwnEc0jUjErv_!!1075624455.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1063', '581994487071', 'https://img.alicdn.com/i1/1075624455/O1CN01mMd2Nw1imQwp981L9_!!1075624455.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1064', '581994487071', 'https://img.alicdn.com/i1/1075624455/O1CN01E1tnsR1imQwrBLRhE_!!1075624455.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1065', '582595080872', 'https://img.alicdn.com/i2/1844466532/O1CN01HDhCgF1y7ha67SRHa_!!1844466532.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1066', '582595080872', 'https://img.alicdn.com/i3/1844466532/O1CN01G0jnQP1y7ha6yomrc_!!1844466532.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1067', '582595080872', 'https://img.alicdn.com/i4/1844466532/O1CN01uTFDzu1y7ha5tuw4z_!!1844466532.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1068', '582595080872', 'https://img.alicdn.com/i3/1844466532/O1CN01OPaRwP1y7ha6dOBai_!!1844466532.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1069', '584020227337', 'https://img.alicdn.com/i2/3685848019/O1CN01KxiImZ296kXHetiUc_!!3685848019.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1070', '584020227337', 'https://img.alicdn.com/i3/3685848019/O1CN01ICuXgj296kXHet2tc_!!3685848019.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1071', '584020227337', 'https://img.alicdn.com/i1/3685848019/O1CN01CvkVeh296kXFIwVP3_!!3685848019.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1072', '584020227337', 'https://img.alicdn.com/i3/3685848019/O1CN01wrd1gX296kXEGcutT_!!3685848019.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1073', '553624616801', 'https://img.alicdn.com/i2/2649224605/TB277mCmr_0UKFjy1XaXXbKfXXa_!!2649224605.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1074', '553624616801', 'https://img.alicdn.com/i2/2649224605/TB28bMTx5pnpuFjSZFkXXc4ZpXa_!!2649224605.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1075', '553624616801', 'https://img.alicdn.com/i3/2649224605/TB2lTk0t9xjpuFjSszeXXaeMVXa_!!2649224605.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1076', '573587995242', 'https://img.alicdn.com/i4/4002022277/TB2uS2jDHSYBuNjSspfXXcZCpXa_!!4002022277.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1077', '573587995242', 'https://img.alicdn.com/i3/4002022277/TB2YQoSviCYBuNkSnaVXXcMsVXa_!!4002022277.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1078', '573587995242', 'https://img.alicdn.com/i2/4002022277/TB2Pw80vDXYBeNkHFrdXXciuVXa_!!4002022277.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1079', '573587995242', 'https://img.alicdn.com/i1/4002022277/TB2Qxa3DN9YBuNjy0FfXXXIsVXa_!!4002022277.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1080', '576269971134', 'https://img.alicdn.com/i3/2236890531/TB2_6znsaQoBKNjSZJnXXaw9VXa_!!2236890531.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1081', '576269971134', 'https://img.alicdn.com/i3/2236890531/TB2tXvdsaAoBKNjSZSyXXaHAVXa_!!2236890531.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1082', '576269971134', 'https://img.alicdn.com/i4/2236890531/TB27n5ssvImBKNjSZFlXXc43FXa_!!2236890531.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1083', '576269971134', 'https://img.alicdn.com/i1/2236890531/TB2KayaspkoBKNjSZFkXXb4tFXa_!!2236890531.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1084', '577400008781', 'https://img.alicdn.com/i1/3114806227/TB23KQDaQvoK1RjSZFDXXXY3pXa_!!3114806227.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1085', '577400008781', 'https://img.alicdn.com/i1/3114806227/TB2P1gBaNTpK1RjSZFGXXcHqFXa_!!3114806227.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1086', '577400008781', 'https://img.alicdn.com/i3/3114806227/TB2McZCaOrpK1RjSZFhXXXSdXXa_!!3114806227.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1087', '577400008781', 'https://img.alicdn.com/i2/3114806227/TB2cmsAaSzqK1RjSZFLXXcn2XXa_!!3114806227.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1088', '577693470685', 'https://img.alicdn.com/i2/821460505/TB2XiA4aNTpK1RjSZFGXXcHqFXa_!!821460505.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1089', '577693470685', 'https://img.alicdn.com/i2/821460505/TB2BL76aHvpK1RjSZFqXXcXUVXa_!!821460505.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1090', '577693470685', 'https://img.alicdn.com/i4/821460505/TB2eNU6aIfpK1RjSZFOXXa6nFXa_!!821460505.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1091', '546291332295', 'https://img.alicdn.com/i3/1064942825/TB2q9Jkg9JjpuFjy0FdXXXmoFXa_!!1064942825.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1092', '546291332295', 'https://img.alicdn.com/i3/1064942825/TB2IcyOimFmpuFjSZFrXXayOXXa_!!1064942825.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1093', '546291332295', 'https://img.alicdn.com/i2/1064942825/TB2oFGjibBnpuFjSZFGXXX51pXa_!!1064942825.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1094', '546291332295', 'https://img.alicdn.com/i2/1064942825/TB2W7Z1gHVkpuFjSspcXXbSMVXa_!!1064942825.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1095', '548075443188', 'https://img.alicdn.com/i2/2923030390/TB2qHHxmxhmpuFjSZFyXXcLdFXa_!!2923030390.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1096', '548075443188', 'https://img.alicdn.com/i1/2923030390/TB2u4TukrtlpuFjSspoXXbcDpXa_!!2923030390.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1097', '548075443188', 'https://img.alicdn.com/i3/2923030390/TB2wT2pmypnpuFjSZFIXXXh2VXa_!!2923030390.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1098', '548075443188', 'https://img.alicdn.com/i4/2923030390/TB2e_HcmxBmpuFjSZFsXXcXpFXa_!!2923030390.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1099', '556222533446', 'https://img.alicdn.com/i1/411314805/TB2GXvObU.iyKJjSspdXXbB_pXa_!!411314805.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1100', '556222533446', 'https://img.alicdn.com/i1/411314805/TB2dur5bQZkyKJjy0FnXXXveFXa_!!411314805.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1101', '556444133207', 'https://img.alicdn.com/i3/725956494/TB27cy7b7UkyKJjy1zjXXX1wFXa_!!725956494.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1102', '556444133207', 'https://img.alicdn.com/i3/725956494/TB27CPfb7ZkyKJjy0FnXXXveFXa_!!725956494.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1103', '556444133207', 'https://img.alicdn.com/i1/725956494/TB29o3qbWAPyuJjy1XcXXXdjFXa_!!725956494.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1104', '556444133207', 'https://img.alicdn.com/i2/725956494/TB27jO_b3wjyKJjSsppXXaxUpXa_!!725956494.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1105', '575234629800', 'https://img.alicdn.com/i4/348907914/TB2b1Eqm0knBKNjSZKPXXX6OFXa_!!348907914.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1106', '575234629800', 'https://img.alicdn.com/i4/348907914/TB2tf6WdhtnkeRjSZSgXXXAuXXa_!!348907914.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1107', '575234629800', 'https://img.alicdn.com/i3/348907914/TB2SfHKmZIrBKNjSZK9XXagoVXa_!!348907914.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1108', '575234629800', 'https://img.alicdn.com/i2/348907914/TB2FuAqm0knBKNjSZKPXXX6OFXa_!!348907914.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1109', '575236445286', 'https://img.alicdn.com/i3/348907914/TB2BW18nXkoBKNjSZFEXXbrEVXa_!!348907914.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1110', '575236445286', 'https://img.alicdn.com/i4/348907914/TB2rNV9iwZC2uNjSZFnXXaxZpXa_!!348907914.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1111', '575236445286', 'https://img.alicdn.com/i2/348907914/TB2LNTsnbZnBKNjSZFhXXc.oXXa_!!348907914.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1112', '575236445286', 'https://img.alicdn.com/i4/348907914/TB2k1YmnfImBKNjSZFlXXc43FXa_!!348907914.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1113', '575236881200', 'https://img.alicdn.com/i1/348907914/TB2aIPPnmcqBKNjSZFgXXX_kXXa_!!348907914.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1114', '575236881200', 'https://img.alicdn.com/i4/348907914/TB2L.6SnbsrBKNjSZFpXXcXhFXa_!!348907914.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1115', '575236881200', 'https://img.alicdn.com/i2/348907914/TB2zGX.iwZC2uNjSZFnXXaxZpXa_!!348907914.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1116', '575236881200', 'https://img.alicdn.com/i1/348907914/TB2G.G.nljTBKNjSZFNXXasFXXa_!!348907914.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1117', '575975449933', 'https://img.alicdn.com/i2/2794106726/TB2H5fHr7omBKNjSZFqXXXtqVXa_!!2794106726.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1118', '575975449933', 'https://img.alicdn.com/i1/2794106726/TB2KoY_rYZnBKNjSZFKXXcGOVXa_!!2794106726.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1119', '575975449933', 'https://img.alicdn.com/i3/2794106726/TB2eEQRrYsrBKNjSZFpXXcXhFXa_!!2794106726.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1120', '575975449933', 'https://img.alicdn.com/i4/2794106726/TB2TBZzrY3nBKNjSZFMXXaUSFXa_!!2794106726.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1121', '576095106472', 'https://img.alicdn.com/i2/2794106726/TB2ENMCrQZmBKNjSZPiXXXFNVXa_!!2794106726.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1122', '576095106472', 'https://img.alicdn.com/i2/2794106726/TB2Kwk3rGAoBKNjSZSyXXaHAVXa_!!2794106726.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1123', '576095106472', 'https://img.alicdn.com/i1/2794106726/TB2rilPr.OWBKNjSZKzXXXfWFXa_!!2794106726.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1124', '576095106472', 'https://img.alicdn.com/i4/2794106726/TB2sj_QrZj_B1NjSZFHXXaDWpXa_!!2794106726.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1125', '578114679566', 'https://img.alicdn.com/i1/679384197/TB29n9qcXzqK1RjSZFvXXcB7VXa_!!679384197.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1126', '578114679566', 'https://img.alicdn.com/i3/679384197/TB2NVGrckvoK1RjSZFwXXciCFXa_!!679384197.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1127', '578114679566', 'https://img.alicdn.com/i2/679384197/TB2GrisclLoK1RjSZFuXXXn0XXa_!!679384197.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1128', '578114679566', 'https://img.alicdn.com/i2/679384197/TB2Fc9qckvoK1RjSZFNXXcxMVXa_!!679384197.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1129', '579331381882', 'https://img.alicdn.com/i3/2027744556/O1CN011jWgwL5dEvJJgxF_!!2027744556.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1130', '579331381882', 'https://img.alicdn.com/i4/2027744556/O1CN011jWgwSxk010ZWf3_!!2027744556.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1131', '579331381882', 'https://img.alicdn.com/i2/2027744556/O1CN011jWgwSxjrhZRK7l_!!2027744556.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1132', '579331381882', 'https://img.alicdn.com/i2/2027744556/O1CN011jWgwRbUlVfgT1Y_!!2027744556.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1133', '579578483724', 'https://img.alicdn.com/i2/2027744556/O1CN011jWgwRZ6xnNlws8_!!2027744556.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1134', '579578483724', 'https://img.alicdn.com/i4/2027744556/O1CN011jWgwRMQ0DihfOC_!!2027744556.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1135', '579578483724', 'https://img.alicdn.com/i2/2027744556/O1CN011jWgwRZ6d0YuoXx_!!2027744556.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1136', '579578483724', 'https://img.alicdn.com/i3/2027744556/O1CN011jWgwSYE2ICU7Eo_!!2027744556.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1137', '579806450126', 'https://img.alicdn.com/i2/2834854867/O1CN011lp87RdLf2Ioh1X_!!2834854867.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1138', '579806450126', 'https://img.alicdn.com/i1/2834854867/O1CN011lp87KmqjcmNFzH_!!2834854867.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1139', '579806450126', 'https://img.alicdn.com/i2/2834854867/O1CN011lp87ST0G6S0zaD_!!2834854867.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1140', '579806450126', 'https://img.alicdn.com/i1/2834854867/O1CN011lp87QSkLerAWDj_!!2834854867.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1141', '582899416285', 'https://img.alicdn.com/i3/4231264829/O1CN01SV4OjW1lXj5BLqRsi_!!4231264829.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1142', '582899416285', 'https://img.alicdn.com/i1/4231264829/O1CN0156OjEI1lXj5BfPNA1_!!4231264829.png', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1143', '582899416285', 'https://img.alicdn.com/i4/4231264829/O1CN015q0Zfk1lXj5D5eudW_!!4231264829.png', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1144', '582899416285', 'https://img.alicdn.com/i1/4231264829/O1CN013noTvy1lXj55481fz_!!4231264829.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1145', '582899580249', 'https://img.alicdn.com/i1/4231264829/O1CN01HdcSY41lXj5CHPakn_!!4231264829.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1146', '582899580249', 'https://img.alicdn.com/i1/4231264829/O1CN01FjoRua1lXj5AQ3sUO_!!4231264829.png', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1147', '582899580249', 'https://img.alicdn.com/i4/4231264829/O1CN01NiLzsI1lXj5Bmjeap_!!4231264829.png', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1148', '582899580249', 'https://img.alicdn.com/i4/4231264829/O1CN01GAHJyL1lXj5BM3PBD_!!4231264829.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1149', '582900464176', 'https://img.alicdn.com/i1/4231264829/O1CN01nIuEby1lXj5CIMwIj_!!4231264829.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1150', '582900464176', 'https://img.alicdn.com/i4/4231264829/O1CN01dnQN641lXj5ChTnbn_!!4231264829.png', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1151', '582900464176', 'https://img.alicdn.com/i2/4231264829/O1CN01i9O24z1lXj5D6iR4b_!!4231264829.png', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1152', '582900464176', 'https://img.alicdn.com/i4/4231264829/O1CN01NYlzBF1lXj5DYSteR_!!4231264829.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1153', '582900536349', 'https://img.alicdn.com/i4/4231264829/O1CN01SksFix1lXj5Bgf32w_!!4231264829.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1154', '582900536349', 'https://img.alicdn.com/i1/4231264829/O1CN01veA73v1lXj5ChfLXk_!!4231264829.png', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1155', '582900536349', 'https://img.alicdn.com/i3/4231264829/O1CN01xpKRaM1lXj5BgeJP6_!!4231264829.png', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1156', '582900536349', 'https://img.alicdn.com/i2/4231264829/O1CN01WLdeUL1lXj5DO4GhN_!!4231264829.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1157', '582900576676', 'https://img.alicdn.com/i2/4231264829/O1CN012ZuSqV1lXj555UTne_!!4231264829.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1158', '582900576676', 'https://img.alicdn.com/i1/4231264829/O1CN01Yt6pCS1lXj5CKxBz9_!!4231264829.png', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1159', '582900576676', 'https://img.alicdn.com/i4/4231264829/O1CN01cH9vyM1lXj5BNBMUM_!!4231264829.png', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1160', '582900576676', 'https://img.alicdn.com/i4/4231264829/O1CN015Lx5Ol1lXj5CKwO80_!!4231264829.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1161', '582900744617', 'https://img.alicdn.com/i4/4231264829/O1CN01xlNoh01lXj5CIp4OW_!!4231264829.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1162', '582900744617', 'https://img.alicdn.com/i3/4231264829/O1CN01UwRhtP1lXj5Bo8aoA_!!4231264829.png', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1163', '582900744617', 'https://img.alicdn.com/i4/4231264829/O1CN01fGY6ad1lXj5C6AscM_!!4231264829.png', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1164', '582900744617', 'https://img.alicdn.com/i2/4231264829/O1CN01AIC3Kh1lXj5Bo8rTO_!!4231264829.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1165', '582901228792', 'https://img.alicdn.com/i2/4231264829/O1CN01jmPEzR1lXj5BhWYXg_!!4231264829.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1166', '582901228792', 'https://img.alicdn.com/i2/4231264829/O1CN01JipZ1h1lXj5BhXQcS_!!4231264829.png', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1167', '582901228792', 'https://img.alicdn.com/i1/4231264829/O1CN01TikBTr1lXj5DZVgDO_!!4231264829.png', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1168', '582901228792', 'https://img.alicdn.com/i3/4231264829/O1CN01pUOON41lXj5A2abIc_!!4231264829.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1169', '582901332733', 'https://img.alicdn.com/i2/4231264829/O1CN018wrBZZ1lXj5DZZ6WX_!!4231264829.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1170', '582901332733', 'https://img.alicdn.com/i1/4231264829/O1CN01H5XnnQ1lXj5CLngxd_!!4231264829.png', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1171', '582901332733', 'https://img.alicdn.com/i2/4231264829/O1CN01QvG4Hd1lXj5BblSq8_!!4231264829.png', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1172', '582901332733', 'https://img.alicdn.com/i2/4231264829/O1CN01h0zjQP1lXj5Bhd45Z_!!4231264829.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1173', '582901440223', 'https://img.alicdn.com/i1/4231264829/O1CN01NvKo6i1lXj5DOy3iY_!!4231264829.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1174', '582901440223', 'https://img.alicdn.com/i1/4231264829/O1CN01JleLLg1lXj5Bbk7Yh_!!4231264829.png', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1175', '582901440223', 'https://img.alicdn.com/i3/4231264829/O1CN01YMWnql1lXj5DZWYY3_!!4231264829.png', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1176', '582901440223', 'https://img.alicdn.com/i3/4231264829/O1CN01YvU9zW1lXj5AS7loe_!!4231264829.jpg', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null);
INSERT INTO `t_item_img` VALUES ('1177', '582901916302', 'https://img.alicdn.com/i3/4231264829/O1CN01kayhnO1lXj5D8MkZy_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1178', '582901916302', 'https://img.alicdn.com/i4/4231264829/O1CN01wj27oE1lXj5Da0tuK_!!4231264829.png', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1179', '582901916302', 'https://img.alicdn.com/i2/4231264829/O1CN01T0CJL61lXj5D8NHtI_!!4231264829.png', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1180', '582901916302', 'https://img.alicdn.com/i1/4231264829/O1CN01cRDM5e1lXj5CK3bKP_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1181', '582901932027', 'https://img.alicdn.com/i4/4231264829/O1CN012oRE8p1lXj5Bi2Auu_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1182', '582901932027', 'https://img.alicdn.com/i3/4231264829/O1CN01NO0LGg1lXj5D8LL5g_!!4231264829.png', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1183', '582901932027', 'https://img.alicdn.com/i2/4231264829/O1CN01WsOjWj1lXj5BcFP4B_!!4231264829.png', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1184', '582901932027', 'https://img.alicdn.com/i1/4231264829/O1CN01HJ8GRS1lXj5B4GWJN_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1185', '582902096202', 'https://img.alicdn.com/i2/4231264829/O1CN01HtC2gS1lXj5CMRR67_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1186', '582902096202', 'https://img.alicdn.com/i2/4231264829/O1CN014xToc41lXj5DPhVQg_!!4231264829.png', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1187', '582902096202', 'https://img.alicdn.com/i3/4231264829/O1CN01qM3wwr1lXj5CjMoaf_!!4231264829.png', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1188', '582902096202', 'https://img.alicdn.com/i4/4231264829/O1CN01wACxVO1lXj5BpV7Dd_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1189', '582902100782', 'https://img.alicdn.com/i2/4231264829/O1CN015jVigH1lXj5BpdJ6e_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1190', '582902100782', 'https://img.alicdn.com/i1/4231264829/O1CN01S3IU111lXj5C7f7bC_!!4231264829.png', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1191', '582902100782', 'https://img.alicdn.com/i4/4231264829/O1CN01UZRCiB1lXj5Bcd6WU_!!4231264829.png', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1192', '582902100782', 'https://img.alicdn.com/i4/4231264829/O1CN01PO1gh41lXj5BiRU2P_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1193', '582902596628', 'https://img.alicdn.com/i1/4231264829/O1CN01NE7EKJ1lXj5CMudgU_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1194', '582902596628', 'https://img.alicdn.com/i4/4231264829/O1CN013gAKbM1lXj5ATITUs_!!4231264829.png', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1195', '582902596628', 'https://img.alicdn.com/i1/4231264829/O1CN01FCyP331lXj5ATIk8I_!!4231264829.png', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1196', '582902596628', 'https://img.alicdn.com/i1/4231264829/O1CN01xl2w7t1lXj5D947MS_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1197', '582925576958', 'https://img.alicdn.com/i3/4231264829/O1CN01hSlX351lXj5ATBxcv_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1198', '582925576958', 'https://img.alicdn.com/i4/4231264829/O1CN01DM1QJw1lXj5ATCZ01_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1199', '582925576958', 'https://img.alicdn.com/i1/4231264829/O1CN01hFx5HD1lXj5CmULrO_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1200', '582925576958', 'https://img.alicdn.com/i4/4231264829/O1CN01LMgzXC1lXj5Bo2IIN_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1201', '582925984223', 'https://img.alicdn.com/i2/4231264829/O1CN01jM0Vaw1lXj5Asi7J8_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1202', '582925984223', 'https://img.alicdn.com/i1/4231264829/O1CN01esDyUH1lXj5Dpfva3_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1203', '582925984223', 'https://img.alicdn.com/i2/4231264829/O1CN016oAOyW1lXj5C2L8pD_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1204', '582925984223', 'https://img.alicdn.com/i4/4231264829/O1CN01DXLw5I1lXj5BoKt1D_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1205', '582976556995', 'https://img.alicdn.com/i4/4231264829/O1CN01P8jJW41lXj5Br4SLo_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1206', '582976556995', 'https://img.alicdn.com/i1/4231264829/O1CN01HZKD1m1lXj5Dl4iz8_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1207', '582976556995', 'https://img.alicdn.com/i3/4231264829/O1CN01sgFrwL1lXj5Dl4epO_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);
INSERT INTO `t_item_img` VALUES ('1208', '582976556995', 'https://img.alicdn.com/i4/4231264829/O1CN01D91k8B1lXj5EysgXk_!!4231264829.jpg', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null);

-- ----------------------------
-- Table structure for t_key
-- ----------------------------
DROP TABLE IF EXISTS `t_key`;
CREATE TABLE `t_key` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(64) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_key
-- ----------------------------

-- ----------------------------
-- Table structure for t_tbk_item
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `alert` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1807 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_tbk_item
-- ----------------------------
INSERT INTO `t_tbk_item` VALUES ('1707', 'ZX', '900', null, '', null, '', '0', null, '0', null, '欧美品牌潮儿', '552916232397', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1708', 'ZX', '900', null, '', null, '', '0', null, '0', null, '欧美品牌潮儿', '557900373322', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1709', 'MKT', '1500', null, '', null, '', '0', null, '0', null, '欧美品牌潮儿', '558026237421', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'true');
INSERT INTO `t_tbk_item` VALUES ('1710', 'COMMON', '4500', null, '', null, '', '0', null, '0', null, '碧海蓝天女装店铺', '569750022321', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1711', 'COMMON', '4500', null, '', null, '', '0', null, '0', null, '小美美橙', '573026242525', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1712', 'COMMON', '4500', null, '', null, '', '0', null, '0', null, '碧海蓝天女装店铺', '577902214786', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1713', 'COMMON', '4500', null, '', null, '', '0', null, '0', null, '心有事友', '581373758001', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1714', 'COMMON', '4500', null, '', null, '', '0', null, '0', null, '尚风街社', '581994179917', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1715', 'COMMON', '4500', null, '', null, '', '0', null, '0', null, '尚风街社', '581994487071', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1716', 'COMMON', '4500', null, '', null, '', '0', null, '0', null, 'Hello丶女装', '582595080872', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1717', 'COMMON', '4500', null, '', null, '', '0', null, '0', null, '心有事友', '583744397858', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1718', 'COMMON', '4500', null, '', null, '', '0', null, '0', null, 'u[3685848019]', '584020227337', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1719', 'COMMON', '4050', null, '', null, '', '0', null, '0', null, '卓宝宝的衣橱', '583712061345', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1720', 'COMMON', '4050', null, '', null, '', '0', null, '0', null, '卓宝宝的衣橱', '583840746660', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1721', 'MKT', '1500', null, '', null, '', '0', null, '0', null, '欧美品牌潮儿', '553624616801', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'true');
INSERT INTO `t_tbk_item` VALUES ('1722', 'COMMON', '3600', null, '', null, '', '0', null, '0', null, 'SARA STUDIO轻奢定制', '573587995242', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1723', 'COMMON', '3600', null, '', null, '', '0', null, '0', null, '康老板的店KANGT', '576269971134', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1724', 'COMMON', '3600', null, '', null, '', '0', null, '0', null, '马先森衣舍', '577400008781', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1725', 'COMMON', '3600', null, '', null, '', '0', null, '0', null, 'IAM27女装屋', '577693470685', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1726', 'COMMON', '2700', null, '', null, '', '0', null, '0', null, '小清新治愈系列', '546291332295', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1727', 'ZX', '900', null, '', null, '', '0', null, '0', null, '美太佳人', '548075443188', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1728', 'MKT', '900', null, '', null, '', '0', null, '0', null, '贝贝伦健康店', '556222533446', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'true');
INSERT INTO `t_tbk_item` VALUES ('1729', 'COMMON', '2700', null, '', null, '', '0', null, '0', null, '宾小客女装', '556444133207', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'false');
INSERT INTO `t_tbk_item` VALUES ('1730', 'MKT', '1200', null, '', null, '', '0', null, '0', null, '甜甜喵的chest', '575234629800', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'true');
INSERT INTO `t_tbk_item` VALUES ('1731', 'MKT', '1200', null, '', null, '', '0', null, '0', null, '甜甜喵的chest', '575236445286', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'true');
INSERT INTO `t_tbk_item` VALUES ('1732', 'MKT', '1200', null, '', null, '', '0', null, '0', null, '甜甜喵的chest', '575236881200', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'false', 'true');
INSERT INTO `t_tbk_item` VALUES ('1733', 'COMMON', '2700', null, '', null, '', '0', null, '0', null, '客来健如意店', '575975449933', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1734', 'COMMON', '2700', null, '', null, '', '0', null, '0', null, '客来健如意店', '576095106472', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1735', 'COMMON', '2700', null, '', null, '', '0', null, '0', null, '唯美娜FASHION女装', '578114679566', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1736', 'COMMON', '2700', null, '', null, '', '0', null, '0', null, '琪美欧韩时尚女装', '579331381882', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1737', 'COMMON', '2700', null, '', null, '', '0', null, '0', null, '琪美欧韩时尚女装', '579578483724', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1738', 'COMMON', '2700', null, '', null, '', '0', null, '0', null, '紫荷靓衣坊', '579806450126', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1739', 'COMMON', '2700', null, '', null, '', '0', null, '0', null, '美馨馨女装店', '580241119864', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1740', 'COMMON', '2700', null, '4308a6e35c324409a6941f0c89a10e60', '2019-01-31 00:00:00', '满11.00元减10元', '960', '2018-12-13 00:00:00', '1000', null, 'o淘品店o', '582899416285', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1741', 'COMMON', '2700', null, '4308a6e35c324409a6941f0c89a10e60', '2019-01-31 00:00:00', '满11.00元减10元', '960', '2018-12-13 00:00:00', '1000', null, 'o淘品店o', '582899580249', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1742', 'COMMON', '2700', null, '4308a6e35c324409a6941f0c89a10e60', '2019-01-31 00:00:00', '满11.00元减10元', '960', '2018-12-13 00:00:00', '1000', null, 'o淘品店o', '582900464176', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1743', 'COMMON', '2700', null, '4308a6e35c324409a6941f0c89a10e60', '2019-01-31 00:00:00', '满11.00元减10元', '960', '2018-12-13 00:00:00', '1000', null, 'o淘品店o', '582900536349', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1744', 'COMMON', '2700', null, '4308a6e35c324409a6941f0c89a10e60', '2019-01-31 00:00:00', '满11.00元减10元', '960', '2018-12-13 00:00:00', '1000', null, 'o淘品店o', '582900576676', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1745', 'COMMON', '2700', null, '4308a6e35c324409a6941f0c89a10e60', '2019-01-31 00:00:00', '满11.00元减10元', '960', '2018-12-13 00:00:00', '1000', null, 'o淘品店o', '582900744617', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1746', 'COMMON', '2700', null, '4308a6e35c324409a6941f0c89a10e60', '2019-01-31 00:00:00', '满11.00元减10元', '960', '2018-12-13 00:00:00', '1000', null, 'o淘品店o', '582901228792', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1747', 'COMMON', '2700', null, '4308a6e35c324409a6941f0c89a10e60', '2019-01-31 00:00:00', '满11.00元减10元', '960', '2018-12-13 00:00:00', '1000', null, 'o淘品店o', '582901332733', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1748', 'COMMON', '2700', null, '4308a6e35c324409a6941f0c89a10e60', '2019-01-31 00:00:00', '满11.00元减10元', '960', '2018-12-13 00:00:00', '1000', null, 'o淘品店o', '582901440223', '2018-12-16 01:55:47', '2018-12-16 01:55:47', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1749', 'COMMON', '2700', null, '4308a6e35c324409a6941f0c89a10e60', '2019-01-31 00:00:00', '满11.00元减10元', '960', '2018-12-13 00:00:00', '1000', null, 'o淘品店o', '582901916302', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1750', 'COMMON', '2700', null, '4308a6e35c324409a6941f0c89a10e60', '2019-01-31 00:00:00', '满11.00元减10元', '960', '2018-12-13 00:00:00', '1000', null, 'o淘品店o', '582901932027', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1751', 'COMMON', '2700', null, '4308a6e35c324409a6941f0c89a10e60', '2019-01-31 00:00:00', '满11.00元减10元', '960', '2018-12-13 00:00:00', '1000', null, 'o淘品店o', '582902096202', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1752', 'COMMON', '2700', null, '4308a6e35c324409a6941f0c89a10e60', '2019-01-31 00:00:00', '满11.00元减10元', '960', '2018-12-13 00:00:00', '1000', null, 'o淘品店o', '582902100782', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1753', 'COMMON', '2700', null, '4308a6e35c324409a6941f0c89a10e60', '2019-01-31 00:00:00', '满11.00元减10元', '960', '2018-12-13 00:00:00', '1000', null, 'o淘品店o', '582902596628', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1754', 'COMMON', '2700', null, '4308a6e35c324409a6941f0c89a10e60', '2019-01-31 00:00:00', '满11.00元减10元', '960', '2018-12-13 00:00:00', '1000', null, 'o淘品店o', '582925576958', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1755', 'COMMON', '2700', null, '4308a6e35c324409a6941f0c89a10e60', '2019-01-31 00:00:00', '满11.00元减10元', '960', '2018-12-13 00:00:00', '1000', null, 'o淘品店o', '582925984223', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null, '50010850', 'true', 'false');
INSERT INTO `t_tbk_item` VALUES ('1756', 'COMMON', '2700', null, '4308a6e35c324409a6941f0c89a10e60', '2019-01-31 00:00:00', '满11.00元减10元', '960', '2018-12-13 00:00:00', '1000', null, 'o淘品店o', '582976556995', '2018-12-16 01:55:48', '2018-12-16 01:55:48', null, '50010850', 'true', 'false');
