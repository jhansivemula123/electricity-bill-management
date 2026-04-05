package com.electricitybill.repository;

import com.electricitybill.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByCustomerId(Long customerId);

    Optional<Payment> findByBillId(Long billId);

    Optional<Payment> findByReceiptNumber(String receiptNumber);

    List<Payment> findByStatus(Payment.PaymentStatus status);
}
