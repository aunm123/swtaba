package com.tim.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SQLUtil {

    public static String paransTSql(String tsql) {

        String value_math = "((\\d))";
        Pattern v_p = Pattern.compile(value_math);
        Matcher v_m = v_p.matcher(tsql);
        String result_value = "";
        while ( v_m.find() ) {
            result_value = v_m.group();
        }


        return "";


    }

    public static void main(String[] args) {

        SQLUtil.paransTSql("(a.*,b.*99)|t_tbk_item|left|t_item|{item_id,num_iid}[category=1+keyq&like-cc=1]");

    }
}
