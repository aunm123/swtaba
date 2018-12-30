package com.tim.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;

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

}
