package com.nanum.nadoo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

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

	@Bean
	public ServerEndpointExporter serverEndpointExporter() {
		return new ServerEndpointExporter();
	}
	// @Bean
	// public ChatServerEndpoint chatServerEndpoint() {
	// return new ChatServerEndpoint();
	// }
}