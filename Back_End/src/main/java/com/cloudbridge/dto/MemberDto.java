package com.cloudbridge.dto; // 🚨 패키지 경로는 그대로 유지

import com.cloudbridge.entity.Member; // Member 엔티티 import
import lombok.Getter;
import lombok.Setter;

// 🚨 클래스 이름을 MemberDto로 변경
public class MemberDto {

    // 1. 프론트엔드 -> 백엔드 (요청)
    @Getter
    @Setter
    public static class AuthRequest {
        private String name;
        private String phone;
    }

    // 2. 백엔드 -> 프론트엔드 (응답)
    @Getter
    public static class Response {
        private String memberId; // 🚨 DTO는 카멜 케이스(memberId) 유지
        private String name;
        private String phone;

        // Entity를 DTO로 변환하는 생성자
        public Response(Member member) { // Member 엔티티를 받음
            // 🚨 엔티티의 대문자 필드를 참조하는 Getter 사용
            this.memberId = member.getMEMBER_ID();
            this.name = member.getNAME();
            this.phone = member.getPHONE();
        }
    }
}