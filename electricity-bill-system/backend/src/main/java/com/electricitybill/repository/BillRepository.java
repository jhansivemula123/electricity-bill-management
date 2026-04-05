package com.electricitybill.repository;

import com.electricitybill.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {

    List<Bill> findByCustomerId(Long customerId);

    List<Bill> findByStatus(Bill.BillStatus status);

    List<Bill> findByCustomerIdOrderByBillDateDesc(Long customerId);

    Optional<Bill> findByBillNumber(String billNumber);

    @Query("SELECT SUM(b.totalAmount) FROM Bill b WHERE b.status = 'PAID'")
    Double getTotalRevenue();

    @Query("SELECT COUNT(b) FROM Bill b WHERE b.status = 'PENDING' OR b.status = 'OVERDUE'")
    Long getPendingBillCount();

    List<Bill> findByBillingMonth(String billingMonth);
}
