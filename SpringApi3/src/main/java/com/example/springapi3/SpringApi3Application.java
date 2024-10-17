package com.example.springapi3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "Controller")
public class SpringApi3Application {

    public static void main(String[] args) {
        SpringApplication.run(SpringApi3Application.class, args);
    }

}
