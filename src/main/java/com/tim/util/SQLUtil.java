package com.tim.util;

import com.alibaba.druid.support.spring.stat.annotation.Stat;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SQLUtil {

    public static String paransTSql(String tsql) throws Exception {

        // 值区 （结果）
        String value_math = "(?<=\\()(\\S+)(?=\\))";
        Pattern v_p = Pattern.compile(value_math);
        Matcher v_m = v_p.matcher(tsql);

        String result_value = "";
        while (v_m.find()) {
            result_value = v_m.group(1);
        }
        List<String> values = Arrays.asList(result_value.split(","));

        String res_values = valueFix(values);

        // 表区  （表）
        String table_math = "(?<=\\|\\|)(\\S+)(?=\\|\\|)";
        Pattern t_p = Pattern.compile(table_math);
        Matcher t_m = t_p.matcher(tsql);

        String result_table = "";
        while (t_m.find()) {
            result_table = t_m.group(1);
        }
        List<String> tables = Arrays.asList(result_table.split(","));
        String res_tables = tableFix(tables);

        // 条件区  （where 条件）
        String require_math = "(?<=\\[)(\\S+)(?=\\])";
        Pattern r_p = Pattern.compile(require_math);
        Matcher r_m = r_p.matcher(tsql);

        String result_require = "";
        while (r_m.find()) {
            result_require = r_m.group(1);
        }
        List<String> requires = Arrays.asList(result_require.split(","));
        String res_where = whereFix(requires);


        return "SELECT ( " + res_values + ")" + res_tables + res_where;

    }

    private static String valueFix(List<String> values) {
        ArrayList vs = new ArrayList();
        for (String v : values) {
            String temp = v;
            temp = temp.replace("'", "");
            temp = temp.replace("`", "");
            temp = "`" + temp + "`";

            vs.add(temp);
        }
        String result = String.join(",", vs);
        return result;
    }

    private static String tableFix(List<String> tables) throws Exception {
        ArrayList ts = new ArrayList();

        if (tables.size() <= 1) {
            // 没有连表
            return tables.get(1);
        } else {
            // 有连表
            // 先取得连表标记

            if (tables.size() < 3 || tables.size() % 3 != 0) {
                throw new Exception("table 解析错误");
            } else {
                // 连表以 3 组 为一组

                String r = "";
                Set<String> poSet = new HashSet<>();
                Integer length = tables.size() / 3;
                for (int i = 0; i < length; i++) {
                    String j_l_String = tables.get(3 * i + 0).replace("|", ".");
                    String j_m_String = tables.get(3 * i + 1);
                    String j_r_String = tables.get(3 * i + 2).replace("|", ".");

                    String temp_m_string = "";
                    switch (j_m_String) {
                        case "left": {
                            temp_m_string = " LEFT JOIN ";
                            break;
                        }
                        case "inner": {
                            temp_m_string = " INNER JOIN ";
                            break;
                        }
                        case "right": {
                            temp_m_string = " RIGHT JOIN ";
                            break;
                        }
                    }
                    poSet.add(tableName(j_l_String));  // 设置主表
                    String tempRsult = temp_m_string + tableName(j_r_String)
                            + " ON " + j_l_String + " = " + j_r_String;
                    poSet.add(tempRsult);
                }

                ArrayList<String> list = new ArrayList<>(poSet);
                r = String.join(" ", list);

                return r;
            }
        }
    }

    private static String whereFix(List<String> where) {
        if (where.size() <= 0) return "";
        ArrayList ws = new ArrayList();
        for (String w : where) {

            // 先获取 Where 标签
            String q_str = w.substring(0, 1);

            String temp_qs = "";
            String temp_qr = w;
            switch (q_str) {
                case "+": {
                    temp_qs = " AND ";
                    temp_qr = w.substring(1, w.length());
                    break;
                }
                case "-": {
                    temp_qs = " OR ";
                    temp_qr = w.substring(1, w.length());
                    break;
                }
            }

            String temp = temp_qs + temp_qr;

            ws.add(temp);
        }
        String result = String.join(" ", ws);
        return " WHERE " + result;
    }

    private static String tableName(String JString) {
        String table = JString.split("\\.")[0];
        return "`" + table + "`";
    }

    public static void main(String[] args) {

        try {
            System.out.println(SQLUtil.paransTSql("(a.*,b.*)||t_tbk_item|item_id,left,t_item|num_iid||[category=1,+key=1,-cc=1]"));
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
