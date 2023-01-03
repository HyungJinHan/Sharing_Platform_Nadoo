package com.nanum.nadoo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

// RestAPI = bc0087aabafb7dfffe6d3b037523ea69

@SpringBootApplication
public class NadooApplication {

	public static void main(String[] args) {

		SpringApplication.run(NadooApplication.class, args);
	}

}