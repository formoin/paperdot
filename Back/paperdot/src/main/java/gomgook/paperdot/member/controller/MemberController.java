package gomgook.paperdot.member.controller;

import gomgook.paperdot.member.dto.LoginDto;
import gomgook.paperdot.member.dto.RegisterDto;
import gomgook.paperdot.member.entity.Member;
import gomgook.paperdot.member.service.MemberService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/members" )
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/register")
    public ResponseEntity<?> registerMember(@RequestBody RegisterDto signUpInfo) {
        Member check_exist = memberService.findByUserId(signUpInfo.getUserId());
        Map<String, String> response = new HashMap<>();
        if (check_exist == null) {
            if(signUpInfo.getDegree() == null) signUpInfo.setDegree("NULL");
            Member new_member = memberService.createMember(signUpInfo);

            if(new_member != null) {
                response.put("message", "회원 등록이 완료되었습니다.");
                return ResponseEntity.ok().body(response);
            } else {
                response.put("message", "회원 등록에 실패하였습니다.");
                return ResponseEntity.badRequest().body(response);
            }
        } else {
            if (check_exist.isActive()) {
                response.put("message", "이미 존재하는 아이디 입니다.");
            } else {
                response.put("message", "탈퇴한 계정입니다.");
            }
            return ResponseEntity.badRequest().body(response);
        }

    }

    @GetMapping("/validation-userid/{userid}")
    public ResponseEntity<Map<String, String>> checkIdValidation(@PathVariable String userid) {
        Map<String, String> response = new HashMap<>();
        Member check_exist = memberService.findByUserId(userid);

        if(check_exist==null || !check_exist.isActive()) {
            response.put("message", "사용 가능한 아이디입니다.");
            return ResponseEntity.ok().body(response);
        }
        else {
            response.put("message", "이미 존재하는 아이디입니다.");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/validation-nickname/{nickname}")
    public ResponseEntity<Map<String, String>> checkNicknameValidation(@PathVariable String nickname) {
        Map<String, String> response = new HashMap<>();
        Member check_exist = memberService.findByNickname(nickname);

        if(check_exist==null || !check_exist.isActive()) {
            response.put("message", "사용 가능한 닉네임입니다.");
            return ResponseEntity.ok().body(response);
        }
        else {
            response.put("message", "이미 존재하는 닉네임입니다.");
            return ResponseEntity.badRequest().body(response);
        }
    }
    @Transactional
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginMember(@RequestBody LoginDto loginInfo) {
        Map<String, String> response = new HashMap<>();


        Member member = memberService.findByUserId(loginInfo.getUserId());
        String token = memberService.loginAndGetToken(loginInfo);
        if (token != null) {
            if(member.isActive()){
                response.put("token", token);
                response.put("message", "로그인이 완료되었습니다.");
            } else {
                response.put("message", "탈퇴한 회원입니다.");
            }

            return ResponseEntity.ok().body(response);
        } else {
            response.put("message", "유효하지 않은 로그인입니다.");
            return ResponseEntity.badRequest().body(response);
        }
    }
}