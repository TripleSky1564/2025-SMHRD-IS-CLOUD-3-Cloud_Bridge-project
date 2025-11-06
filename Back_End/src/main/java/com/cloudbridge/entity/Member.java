package com.cloudbridge.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "MEMBER") // DB 테이블명과 일치시킵니다.
@Getter
@Setter
@NoArgsConstructor // JPA는 기본 생성자가 필요합니다.
public class Member { // 클래스 이름을 Member로 사용

    @Id // 기본 키(PK)임을 알립니다.
    @Column(name = "MEMBER_ID", length = 50, nullable = false)
    private String MEMBER_ID; // 🚨 대문자 필드명으로 변경 (DB 컬럼명과 일치)

    @Column(name = "NAME", length = 50, nullable = false)
    private String NAME; // 🚨 대문자 필드명으로 변경

    @Column(name = "PHONE", length = 20, nullable = false, unique = true) // UK 제약조건
    private String PHONE; // 🚨 대문자 필드명으로 변경

    // 회원이 저장되기 직전에 UUID로 랜덤한 MEMBER_ID를 생성합니다.
    @PrePersist
    public void createMemberId() {
        // 🚨 대문자 필드명에 값을 할당합니다.
        this.MEMBER_ID = UUID.randomUUID().toString();
    }
}