package com.example.plantapi.repository;
/* 내 식물 조회 */
import com.example.plantapi.domain.MyPlant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
// 구현을 안 써도 스프링이 알아서 만들어줌
// <MyPlant, Long> — "MyPlant 엔티티를 다루는 레포지토리야. id 타입은 Long이야"
// Jpa를 상속하면, save() / findById() / findAll() / delete()가 공짜로 생김

public interface MyPlantRepository extends JpaRepository<MyPlant, Long> {

    List<MyPlant> findByUserId(Long userId); // "이 유저의 식물을 전부 찾아줘"
    Optional<MyPlant> findByIdAndUserId(Long id, Long userId); // 여기선 서비스에서 myPlantThrow()로 확인중
}
