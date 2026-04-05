package com.electricitybill.service;

import com.electricitybill.entity.Customer;
import com.electricitybill.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    public Customer createCustomer(Customer customer) {
        if (customerRepository.existsByMeterNumber(customer.getMeterNumber())) {
            throw new RuntimeException("Meter number already exists: " + customer.getMeterNumber());
        }
        if (customerRepository.existsByPhone(customer.getPhone())) {
            throw new RuntimeException("Phone number already registered: " + customer.getPhone());
        }
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Long id, Customer updatedCustomer) {
        return customerRepository.findById(id).map(customer -> {
            customer.setName(updatedCustomer.getName());
            customer.setAddress(updatedCustomer.getAddress());
            customer.setPhone(updatedCustomer.getPhone());
            customer.setMeterNumber(updatedCustomer.getMeterNumber());
            customer.setStatus(updatedCustomer.getStatus());
            customer.setEmail(updatedCustomer.getEmail());
            return customerRepository.save(customer);
        }).orElseThrow(() -> new RuntimeException("Customer not found: " + id));
    }

    public void deleteCustomer(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new RuntimeException("Customer not found: " + id);
        }
        customerRepository.deleteById(id);
    }

    public List<Customer> searchCustomers(String query) {
        return customerRepository.searchCustomers(query);
    }

    public List<Customer> getCustomersByStatus(Customer.CustomerStatus status) {
        return customerRepository.findByStatus(status);
    }

    public long getTotalCustomers() {
        return customerRepository.count();
    }
}
