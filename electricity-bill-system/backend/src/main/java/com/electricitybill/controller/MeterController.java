package com.electricitybill.controller;

import com.electricitybill.entity.Meter;
import com.electricitybill.service.MeterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/meters")
@CrossOrigin(origins = "*")
public class MeterController {

    @Autowired
    private MeterService meterService;

    @GetMapping
    public ResponseEntity<List<Meter>> getAllMeters() {
        return ResponseEntity.ok(meterService.getAllMeters());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMeterById(@PathVariable Long id) {
        return meterService.getMeterById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/number/{meterNumber}")
    public ResponseEntity<?> getMeterByNumber(@PathVariable String meterNumber) {
        return meterService.getMeterByNumber(meterNumber)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Meter>> getMetersByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(meterService.getMetersByCustomer(customerId));
    }

    @PostMapping
    public ResponseEntity<?> createMeter(@RequestBody Meter meter) {
        try {
            return ResponseEntity.ok(meterService.createMeter(meter));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMeter(@PathVariable Long id, @RequestBody Meter meter) {
        try {
            return ResponseEntity.ok(meterService.updateMeter(id, meter));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
