package com.tim.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

/**
 * Created by Tim on 2018/12/7.
 */
@Slf4j
public class JSONUtil {

	public static JSONObject connect(Object main, Object... args){
		String mainStr = JSON.toJSONString(main);
		JSONObject mainObj = JSON.parseObject(mainStr);

		for (Object o : args){
			String oStr = JSON.toJSONString(o);
			JSONObject jo = JSON.parseObject(oStr);

			try {
				for (String key : jo.keySet()){
					mainObj.put(key,jo.get(key));
				}
			}catch (Exception e){
				log.error("json connect error");
			}
		}

		return mainObj;

	}


	public static String StringFilter(String str) throws PatternSyntaxException {
		String regEx="[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]";
		Pattern p = Pattern.compile(regEx);
		Matcher m = p.matcher(str);
		String result = m.replaceAll(" ").trim();
		return result.replace(" ","%");
	}

	/**
	 * MD5方法
	 *
	 * @param text 明文
	 * @return 密文
	 * @throws Exception
	 */
	public static String md5(String text) {
		try {
			//加密后的字符串
			String encodeStr= DigestUtils.md5Hex(text);
			return encodeStr;
		}catch (Exception e){
			return "";
		}
	}


}
