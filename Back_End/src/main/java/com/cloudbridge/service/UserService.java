package com.cloudbridge.service;

import com.cloudbridge.dto.MemberDto; // 🚨 MemberDto import
import com.cloudbridge.entity.Member;
import com.cloudbridge.repository.MemberRepository; // 🚨 MemberRepository 사용
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
// 🚨 클래스 이름은 UserService를 유지하는 것이 일반적입니다.
public class UserService {

    private final MemberRepository memberRepository;

    @Autowired
    public UserService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    /**
     * 회원가입 로직
     */
    public MemberDto.Response register(MemberDto.AuthRequest request) {
        // 1. 전화번호 중복 확인
        if (memberRepository.existsByPHONE(request.getPhone())) {
            throw new IllegalArgumentException("이미 가입된 휴대전화 번호입니다.");
        }

        // 2. 새로운 Member 엔티티 생성
        Member newMember = new Member();
        newMember.setNAME(request.getName());
        newMember.setPHONE(request.getPhone());

        // 3. DB에 저장
        Member savedMember = memberRepository.save(newMember);

        // 4. Response DTO로 변환하여 반환
        return new MemberDto.Response(savedMember);
    }

    /**
     * 로그인 로직
     */
    @Transactional(readOnly = true)
    public MemberDto.Response login(MemberDto.AuthRequest request) {
        // 1. 이름과 전화번호로 사용자 조회
        Member member = memberRepository.findByNAMEAndPHONE(request.getName(), request.getPhone())
                .orElseThrow(() -> new IllegalArgumentException("이름 또는 휴대전화 번호가 일치하지 않습니다."));

        // 2. 사용자가 존재하면 Response DTO로 변환하여 반환
        return new MemberDto.Response(member);
    }
}