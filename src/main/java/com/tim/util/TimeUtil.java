package com.tim.util;

import com.tim.entity.TItemContent;

import java.util.Date;

public class TimeUtil {


    public static String timeBeet(Long time){

        Long diff = time;

        Long day = diff / (24 * 60 * 60 * 1000);
        Long hour = (diff / (60 * 60 * 1000) - day * 24);
        Long min = ((diff / (60 * 1000)) - day * 24 * 60 - hour * 60);
        Long sec = (diff/1000-day*24*60*60-hour*60*60-min*60);
        Long ms = (diff - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000 - min * 60 * 1000 - sec * 1000);

        return day + "天" + hour + "小时" + min + "分" + sec + "秒";

    }


    public static void main(String[] args){
        System.out.println(timeBeet(3600*24*2*1000L));
    }
}
