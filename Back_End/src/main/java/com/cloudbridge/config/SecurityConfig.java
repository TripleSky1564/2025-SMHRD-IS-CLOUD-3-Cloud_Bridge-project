package com.cloudbridge.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;
import java.util.Collections;

/**
 * 보안 설정을 담당하는 클래스입니다.
 * 🚨 CORS 문제 해결 및 회원가입/로그인 경로에 대한 접근을 인증 없이 허용합니다.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);

        // 프론트엔드 URL 허용
        config.setAllowedOriginPatterns(Arrays.asList("http://localhost:5180", "http://127.0.0.1:5180"));

        // 모든 HTTP 메서드 및 헤더 허용
        config.setAllowedMethods(Collections.singletonList("*"));
        config.setAllowedHeaders(Collections.singletonList("*"));
        config.setExposedHeaders(Arrays.asList("Authorization"));

        // 모든 경로(/**)에 대해 CORS 설정을 적용
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 🚨 CORS 설정 적용 (CORS 문제 해결의 핵심)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 🚨 CSRF 비활성화 (프론트-백 연동 시 필요)
                .csrf(AbstractHttpConfigurer::disable)

                // 요청에 대한 접근 권한 설정
                .authorizeHttpRequests(auth -> auth
                        // 🚨 /api/auth/** 경로는 인증 없이 접근 가능하도록 허용 (회원가입/로그인 우회)
                        .requestMatchers("/api/auth/**").permitAll()

                        // 나머지 모든 요청은 인증 필요
                        .anyRequest().authenticated()
                );

        return http.build();
    }

    // 현재는 비밀번호 인코딩을 건너뛰기 위해 NoOp(평문) 인코더를 임시로 사용합니다.
    @Bean
    public static NoOpPasswordEncoder passwordEncoder() {
        return (NoOpPasswordEncoder) NoOpPasswordEncoder.getInstance();
    }
}