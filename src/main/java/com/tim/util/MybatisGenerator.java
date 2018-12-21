package com.tim.util;

import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.InjectionConfig;
import com.baomidou.mybatisplus.generator.config.*;
import com.baomidou.mybatisplus.generator.config.converts.MySqlTypeConvert;
import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.baomidou.mybatisplus.generator.config.rules.DbColumnType;
import com.baomidou.mybatisplus.generator.config.rules.DbType;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;

import java.io.File;
import java.util.*;

/**
 * Created by Tim on 2018/12/4.
 */
public class MybatisGenerator {

	private static Map conf = new HashMap() {
		{
			//jdbc
			put("jdbc.driver", "com.mysql.cj.jdbc.Driver");
			put("jdbc.url", "jdbc:mysql://localhost:3306/tbshop?useUnicode=true&useSSL=false&characterEncoding=utf8");
			put("jdbc.user", "root");
			put("jdbc.pass", "123123");

			//config
			put("packageName", "com.tim");
			put("superEntityClass", "com.tim.common.BaseEntity");

			//tables
			put("tables", new String[]{
//                    "t_category",
//                    "t_item",
//                    "t_item_content",
//                    "t_item_img",
//                    "t_tbk_item",
					"t_key",
			});

			put("tablePrefix", new String[]{"t_"});
			put("propertyNamingStrategy", NamingStrategy.nochange);

		}
	};

	public void runGenerator(){
		// 代码生成器
		AutoGenerator mpg = new AutoGenerator();

		// 全局配置
		GlobalConfig gc = new GlobalConfig();
		String projectPath = System.getProperty("user.dir");
		gc.setOutputDir(projectPath + "/generator/");
		gc.setAuthor("tim");
		gc.setOpen(false);
		gc.setFileOverride(true);
		gc.setActiveRecord(false);// 开启 activeRecord 模式
		gc.setEnableCache(false);// XML 二级缓存
		gc.setBaseResultMap(true);// XML ResultMap
		gc.setBaseColumnList(false);// XML columList
		mpg.setGlobalConfig(gc);

		// 数据源配置
		DataSourceConfig dsc = new DataSourceConfig();
		dsc.setDbType(DbType.MYSQL) ;// 数据库类型

		dsc.setTypeConvert(new MySqlTypeConvert() {
			// 自定义数据库表字段类型转换【可选】
			public DbColumnType processTypeConvert(String fieldType) {
				System.out.println("转换类型：" + fieldType);
				if ( "time".equals(fieldType.toLowerCase()) ) {
					return DbColumnType.TIME;
				}
				return super.processTypeConvert(fieldType);
			}
		});

		dsc.setUrl((String) conf.get("jdbc.url"));
		// dsc.setSchemaName("public");
		dsc.setDriverName((String) conf.get("jdbc.driver"));
		dsc.setUsername((String) conf.get("jdbc.user"));
		dsc.setPassword((String) conf.get("jdbc.pass"));

		mpg.setDataSource(dsc);

		// 包配置
		PackageConfig pc = new PackageConfig();
//		pc.setModuleName(scanner("模块名"));
		pc.setParent((String) conf.get("packageName"));
		mpg.setPackageInfo(pc);

		mpg.setTemplate(new TemplateConfig());

		// 策略配置
		StrategyConfig strategy = new StrategyConfig();
		strategy.setNaming(NamingStrategy.underline_to_camel);  // 表名生成策略
		strategy.setColumnNaming(NamingStrategy.underline_to_camel);
		strategy.setSuperEntityClass((String) conf.get("superEntityClass"));
//		strategy.setEntityLombokModel(true);
//		strategy.setRestControllerStyle(false);

		strategy.setInclude((String[]) conf.get("tables"));

//		strategy.setSuperEntityColumns("id"); //自定义实体，公共字段

		strategy.setControllerMappingHyphenStyle(true);
		strategy.setTablePrefix(pc.getModuleName() + "_");
		mpg.setStrategy(strategy);
		mpg.setTemplateEngine(new FreemarkerTemplateEngine());
		mpg.execute();
	}

	public static void  main(String[] args){
		System.out.println("自动生成所需要的文件");
		new MybatisGenerator().runGenerator();
	}

}
