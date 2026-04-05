package com.electricitybill.service;

import com.electricitybill.entity.Bill;
import com.electricitybill.entity.Payment;
import com.electricitybill.repository.BillRepository;
import com.electricitybill.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BillRepository billRepository;

    @Transactional
    public Payment makePayment(Long billId, Payment.PaymentMode mode, String remarks) {
        Bill bill = billRepository.findById(billId)
            .orElseThrow(() -> new RuntimeException("Bill not found: " + billId));

        if (bill.getStatus() == Bill.BillStatus.PAID) {
            throw new RuntimeException("Bill is already paid");
        }

        Payment payment = new Payment();
        payment.setBill(bill);
        payment.setCustomer(bill.getCustomer());
        payment.setAmountPaid(bill.getTotalAmount());
        payment.setPaymentMode(mode);
        payment.setStatus(Payment.PaymentStatus.SUCCESS);
        payment.setRemarks(remarks);

        Payment saved = paymentRepository.save(payment);

        // Mark bill as paid
        bill.setStatus(Bill.BillStatus.PAID);
        billRepository.save(bill);

        return saved;
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public List<Payment> getPaymentsByCustomer(Long customerId) {
        return paymentRepository.findByCustomerId(customerId);
    }

    public Optional<Payment> getPaymentByBill(Long billId) {
        return paymentRepository.findByBillId(billId);
    }

    public Optional<Payment> getPaymentByReceipt(String receiptNumber) {
        return paymentRepository.findByReceiptNumber(receiptNumber);
    }
}
