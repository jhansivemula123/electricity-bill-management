package com.electricitybill.controller;

import com.electricitybill.entity.Customer;
import com.electricitybill.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status) {
        if (search != null && !search.isEmpty()) {
            return ResponseEntity.ok(customerService.searchCustomers(search));
        }
        if (status != null && !status.isEmpty()) {
            return ResponseEntity.ok(customerService.getCustomersByStatus(
                Customer.CustomerStatus.valueOf(status.toUpperCase())));
        }
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createCustomer(@Valid @RequestBody Customer customer) {
        try {
            Customer saved = customerService.createCustomer(customer);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable Long id,
                                             @Valid @RequestBody Customer customer) {
        try {
            Customer updated = customerService.updateCustomer(id, customer);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id) {
        try {
            customerService.deleteCustomer(id);
            return ResponseEntity.ok(Map.of("message", "Customer deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getCustomerCount() {
        return ResponseEntity.ok(Map.of("total", customerService.getTotalCustomers()));
    }
}
