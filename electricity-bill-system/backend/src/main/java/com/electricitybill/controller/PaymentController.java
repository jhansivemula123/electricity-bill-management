package com.electricitybill.controller;

import com.electricitybill.entity.Payment;
import com.electricitybill.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Payment>> getPaymentsByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(paymentService.getPaymentsByCustomer(customerId));
    }

    @GetMapping("/bill/{billId}")
    public ResponseEntity<?> getPaymentByBill(@PathVariable Long billId) {
        return paymentService.getPaymentByBill(billId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/receipt/{receiptNumber}")
    public ResponseEntity<?> getPaymentByReceipt(@PathVariable String receiptNumber) {
        return paymentService.getPaymentByReceipt(receiptNumber)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> makePayment(@RequestBody Map<String, Object> request) {
        try {
            Long billId = Long.parseLong(request.get("billId").toString());
            String modeStr = request.get("paymentMode").toString().toUpperCase().replace(" ", "_");
            Payment.PaymentMode mode = Payment.PaymentMode.valueOf(modeStr);
            String remarks = request.getOrDefault("remarks", "").toString();

            Payment payment = paymentService.makePayment(billId, mode, remarks);
            return ResponseEntity.ok(payment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
