package com.example.plantapi.repository;
/* 도감 조회 */
import com.example.plantapi.domain.Species;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SpeciesRepository extends JpaRepository<Species, Long> {

    // keyword / light / difficulty가 null이면 그 조건은 무시해
    @Query("""
        SELECT s FROM Species s
        WHERE (:keyword IS NULL OR s.name LIKE CONCAT('%', :keyword, '%'))
          AND (:light IS NULL OR s.lightLevel = :light)
          AND (:difficulty IS NULL OR s.difficulty = :difficulty)
        """)
    Page<Species> search(
            @Param("keyword") String keyword,
            @Param("light") String light,
            @Param("difficulty") String difficulty,
            Pageable pageable
    );
}
