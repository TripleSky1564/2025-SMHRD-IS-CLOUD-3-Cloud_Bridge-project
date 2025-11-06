package com.cloudbridge.repository;

import com.cloudbridge.entity.Member; // 🚨 User 대신 Member 엔티티 import
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> { // 🚨 User 대신 Member 엔티티 사용

    // 1. 로그인 시: 이름과 전화번호로 사용자를 찾기 위한 메서드
    // 🚨 엔티티 필드명(NAME, PHONE)에 맞춰 메서드명 변경
    Optional<Member> findByNAMEAndPHONE(String name, String phone);

    // 2. 회원가입 시: 이미 가입된 전화번호인지 확인하기 위한 메서드
    // 🚨 엔티티 필드명(PHONE)에 맞춰 메서드명 변경
    boolean existsByPHONE(String phone);
}