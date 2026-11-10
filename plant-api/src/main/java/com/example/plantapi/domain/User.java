package com.example.plantapi.domain;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "myPlants")
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 로그인 아이디, 중복 불가
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    // 비밀번호 해시만 저장해. 평문은 절대 안 돼
    @Column(nullable = false, length = 100)
    private String password;

    // 닉네임
    @Column(nullable = false, length = 50)
    private String nickname;

    // 내 식물들. 회원 탈퇴하면 식물도 같이 지워져
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<MyPlant> myPlants = new ArrayList<>();

    // 수정은 닉네임만. 이메일·비밀번호는 따로 바꿔
    public void change(String nickname) {
        this.nickname = nickname;
    }

    // 비밀번호 변경
    public void changePassword(String encodedPassword) {
        this.password = encodedPassword;
    }

}
