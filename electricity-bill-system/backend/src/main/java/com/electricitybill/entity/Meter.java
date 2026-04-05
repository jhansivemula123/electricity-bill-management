package com.electricitybill.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "meters")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Meter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "meter_number", nullable = false, unique = true)
    private String meterNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Enumerated(EnumType.STRING)
    @Column(name = "meter_type", nullable = false)
    private MeterType meterType = MeterType.DIGITAL;

    @Column(name = "installation_date")
    private LocalDate installationDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MeterStatus status = MeterStatus.ACTIVE;

    @Column(name = "last_reading")
    private Double lastReading = 0.0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public enum MeterType {
        DIGITAL, ANALOG, SMART
    }

    public enum MeterStatus {
        ACTIVE, FAULTY, REPLACED, INACTIVE
    }
}
