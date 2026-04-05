package com.electricitybill.service;

import com.electricitybill.entity.Bill;
import com.electricitybill.entity.Customer;
import com.electricitybill.entity.Meter;
import com.electricitybill.repository.BillRepository;
import com.electricitybill.repository.CustomerRepository;
import com.electricitybill.repository.MeterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private MeterRepository meterRepository;

    // Rate per unit by category
    private static final Map<String, Double> RATE_MAP = Map.of(
        "domestic", 6.0,
        "commercial", 9.0,
        "industrial", 12.0
    );

    public Bill generateBill(Long customerId, String meterNumber, Double prevReading,
                             Double currReading, String billingMonth, String category) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new RuntimeException("Customer not found: " + customerId));

        Meter meter = meterRepository.findByMeterNumber(meterNumber)
            .orElseThrow(() -> new RuntimeException("Meter not found: " + meterNumber));

        if (currReading < prevReading) {
            throw new RuntimeException("Current reading must be >= previous reading");
        }

        double rate = RATE_MAP.getOrDefault(category.toLowerCase(), 6.0);
        double units = currReading - prevReading;
        double base = units * rate;
        double fixed = 50.0;
        double tax = base * 0.05;
        double total = base + fixed + tax;

        Bill bill = new Bill();
        bill.setCustomer(customer);
        bill.setMeter(meter);
        bill.setPreviousReading(prevReading);
        bill.setCurrentReading(currReading);
        bill.setUnitsConsumed(units);
        bill.setRatePerUnit(rate);
        bill.setBaseAmount(base);
        bill.setFixedCharge(fixed);
        bill.setBaseAmount(tax);
        bill.setBaseAmount(total);
        bill.setBillingMonth(billingMonth);
        bill.setDueDate(LocalDate.now());
        bill.setDueDate(LocalDate.now().plusDays(30));
        bill.setStatus(Bill.BillStatus.PENDING);

        // Update last meter reading
        meter.setLastReading(currReading);
        meterRepository.save(meter);

        return billRepository.save(bill);
    }

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    public List<Bill> getBillsByCustomer(Long customerId) {
        return billRepository.findByCustomerIdOrderByBillDateDesc(customerId);
    }

    public Optional<Bill> getBillById(Long id) {
        return billRepository.findById(id);
    }

    public Bill markAsPaid(Long billId) {
        return billRepository.findById(billId).map(bill -> {
            bill.setStatus(Bill.BillStatus.PAID);
            return billRepository.save(bill);
        }).orElseThrow(() -> new RuntimeException("Bill not found: " + billId));
    }

    public Double getTotalRevenue() {
        Double rev = billRepository.getTotalRevenue();
        return rev != null ? rev : 0.0;
    }

    public Long getPendingCount() {
        return billRepository.getPendingBillCount();
    }
}
