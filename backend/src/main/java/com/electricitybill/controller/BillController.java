package com.electricitybill.controller;

import com.electricitybill.entity.Bill;
import com.electricitybill.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bills")
@CrossOrigin(origins = "*")
public class BillController {

    @Autowired
    private BillService billService;

    @GetMapping
    public ResponseEntity<List<Bill>> getAllBills() {
        return ResponseEntity.ok(billService.getAllBills());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBillById(@PathVariable Long id) {
        return billService.getBillById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Bill>> getBillsByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(billService.getBillsByCustomer(customerId));
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generateBill(@RequestBody Map<String, Object> request) {
        try {
            Long customerId = Long.parseLong(request.get("customerId").toString());
            String meterNumber = request.get("meterNumber").toString();
            Double prevReading = Double.parseDouble(request.get("previousReading").toString());
            Double currReading = Double.parseDouble(request.get("currentReading").toString());
            String billingMonth = request.get("billingMonth").toString();
            String category = request.getOrDefault("category", "domestic").toString();

            Bill bill = billService.generateBill(customerId, meterNumber,
                prevReading, currReading, billingMonth, category);
            return ResponseEntity.ok(bill);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}/pay")
    public ResponseEntity<?> markAsPaid(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(billService.markAsPaid(id));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getBillStats() {
        Map<String, Object> stats = Map.of(
            "totalRevenue", billService.getTotalRevenue(),
            "pendingCount", billService.getPendingCount()
        );
        return ResponseEntity.ok(stats);
    }
}
