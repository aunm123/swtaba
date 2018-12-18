package com.tim;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@SpringBootApplication
@EnableTransactionManagement(proxyTargetClass = true)
@MapperScan("com.tim.mapper")
@ComponentScan(basePackages = "com.tim")
public class Swtaobao3Application {

	public static void main(String[] args) {
		SpringApplication.run(Swtaobao3Application.class, args);

	}

}
