package com.tim.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


public class ResultUtil {

	private Object data;
	private String message;
	private Integer total;
	private Integer currentPage;
	private String done;



	private ResultUtil(){}

	/**
	 * 生成成功的结构体
	 * @param data
	 * @param total
	 * @param currentpage
	 */
	public ResultUtil(List data, Integer total, Integer currentpage) {

		this.data = data;
		this.total = total;
		this.currentPage = currentpage;
		this.message = "";
		this.done = "success";
	}


	/**
	 * 生成成功的结构体
	 * @param data
	 */
	public ResultUtil(Map data) {

		this.data = data;
		this.total = 1;
		this.currentPage = 1;
		this.message = "";
		this.done = "success";
	}

	/**
	 * 生成失败的结构体
	 * @param e
	 */
	public ResultUtil(Exception e) {
		this.data = new ArrayList<>();
		this.total = 0;
		this.currentPage = 1;
		this.message = e.getLocalizedMessage();
		this.done = "faile";

	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public Integer getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(Integer currentPage) {
		this.currentPage = currentPage;
	}

	public String getDone() {
		return done;
	}

	public void setDone(String done) {
		this.done = done;
	}
}
