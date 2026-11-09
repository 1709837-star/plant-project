// src/main/java/com/example/plantapi/repository/MyPlantRepository.java
package com.example.plantapi.repository;

import com.example.plantapi.domain.MyPlant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MyPlantRepository extends JpaRepository<MyPlant, Long> {
    List<MyPlant> findByUserId(Long userId);
    Optional<MyPlant> findByIdAndUserId(Long id, Long userId);
}
