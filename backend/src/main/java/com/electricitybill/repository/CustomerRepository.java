package com.electricitybill.repository;

import com.electricitybill.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByMeterNumber(String meterNumber);

    Optional<Customer> findByPhone(String phone);

    List<Customer> findByStatus(Customer.CustomerStatus status);

    @Query("SELECT c FROM Customer c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :query, '%')) OR c.meterNumber LIKE CONCAT('%', :query, '%')")
    List<Customer> searchCustomers(String query);

    boolean existsByMeterNumber(String meterNumber);

    boolean existsByPhone(String phone);
}
