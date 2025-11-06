package com.cloudbridge.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
public class WebConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);

        // 🚨 [핵심] 프론트엔드 포트 5180 허용
        config.addAllowedOrigin("http://localhost:5180");
        config.addAllowedOrigin("http://127.0.0.1:5180");

        config.addAllowedMethod("*");
        config.addAllowedHeader("*");

        // 모든 경로에 CORS 설정 적용
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}