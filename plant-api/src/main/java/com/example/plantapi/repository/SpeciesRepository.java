package com.example.plantapi.repository;
/* 도감 조회 */
import com.example.plantapi.domain.Species;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SpeciesRepository extends JpaRepository<Species, Long> {

    // JpaRepository<Species, Long>을 상속받아서, findById(), save() 같은 기본 기능은 공짜로 가져옴
    // search()는 직접 만든 쿼리
    @Query("""
        SELECT s FROM Species s
        WHERE (:keyword IS NULL OR s.name LIKE CONCAT('%', :keyword, '%'))
          AND (:light IS NULL OR s.lightLevel = :light)
          AND (:difficulty IS NULL OR s.difficulty = :difficulty)
        """)
        // :keyword IS NULL : 키워드가 NULL이면 이 조건은 무시해.
        // s.name LIKE CONCAT('%', :keyword, '%')) : 이름에 키워드가 들어간 것만 가져와.
    Page<Species> search(
            @Param("keyword") String keyword,
            @Param("light") String light,
            @Param("difficulty") String difficulty,
            Pageable pageable
            // (6) @Param("keyword")로 서비스에게 받은 "몬스테라"를 쿼리의 :keyword자리에 넣어줘."
            // (7) 돌아올 때는 DB에서 Page<Species>를 가져옴
    );

    // Fast API
    Optional<Species> findByName(String name);

}
