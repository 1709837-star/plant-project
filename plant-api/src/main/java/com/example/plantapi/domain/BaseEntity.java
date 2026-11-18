package com.example.plantapi.domain;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(value = { AuditingEntityListener.class }) // 날짜 자동으로 채워주는 감시자
@Getter
public abstract class BaseEntity {

    // 둘 다 우리가 직접 안 넣고, 스프링이 저장할 때 자동으로 채워줌
    // 그래서 extends BaseEntity하면 셋 다 regdate, moddate 칼럼을 갖게 됨
    @CreatedDate
    @Column(name = "regdate", updatable = false)
    private LocalDateTime regDate;

    @LastModifiedDate
    @Column(name = "moddate")
    private LocalDateTime modDate;
}
