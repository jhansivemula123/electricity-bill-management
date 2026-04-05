package com.electricitybill.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bills")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bill_number", unique = true)
    private String billNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meter_id")
    private Meter meter;

    @Column(name = "previous_reading", nullable = false)
    private Double previousReading;

    @Column(name = "current_reading", nullable = false)
    private Double currentReading;

    @Column(name = "units_consumed")
    private Double unitsConsumed;

    @Column(name = "rate_per_unit")
    private Double ratePerUnit;

    @Column(name = "base_amount")
    private Double baseAmount;

    @Column(name = "fixed_charge")
    private Double fixedCharge = 50.0;

    @Column(name = "tax_amount")
    private Double taxAmount;

    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;

    @Column(name = "billing_month")
    private String billingMonth;

    @Column(name = "bill_date")
    private LocalDate billDate;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BillStatus status = BillStatus.PENDING;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToOne(mappedBy = "bill", cascade = CascadeType.ALL)
    private Payment payment;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (billDate == null) billDate = LocalDate.now();
        if (dueDate == null) dueDate = billDate.plusDays(30);
        if (unitsConsumed == null) unitsConsumed = currentReading - previousReading;
        if (baseAmount == null) baseAmount = unitsConsumed * ratePerUnit;
        if (taxAmount == null) taxAmount = baseAmount * 0.05;
        if (totalAmount == 0) totalAmount = baseAmount + fixedCharge + taxAmount;
        if (billNumber == null)
            billNumber = "BILL-" + System.currentTimeMillis();
    }

    public enum BillStatus {
        PENDING, PAID, OVERDUE, CANCELLED
    }
}
