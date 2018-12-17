package com.tim.common;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by Tim on 2018/12/5.
 */
public abstract class BaseEntity<T> implements Serializable {

	public BaseEntity() {
		Serializable serializable;
	}

	public Date getCreate_date() {
		return null;
	}

	public void setCreate_date(Date createDate) {
	}

}
