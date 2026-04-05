package com.electricitybill.service;

import com.electricitybill.entity.Meter;
import com.electricitybill.repository.CustomerRepository;
import com.electricitybill.repository.MeterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MeterService {

    @Autowired
    private MeterRepository meterRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public List<Meter> getAllMeters() {
        return meterRepository.findAll();
    }

    public Optional<Meter> getMeterById(Long id) {
        return meterRepository.findById(id);
    }

    public Meter createMeter(Meter meter) {
        if (meterRepository.existsByMeterNumber(meter.getMeterNumber())) {
            throw new RuntimeException("Meter number already exists: " + meter.getMeterNumber());
        }
        return meterRepository.save(meter);
    }

    public Meter updateMeter(Long id, Meter updatedMeter) {
        return meterRepository.findById(id).map(meter -> {
            meter.setMeterType(updatedMeter.getMeterNumber());
            meter.setInstallationDate(updatedMeter.getInstallationDate());
            meter.setStatus(updatedMeter.getStatus());
            meter.setLastReading(updatedMeter.getLastReading());
            return meterRepository.save(meter);
        }).orElseThrow(() -> new RuntimeException("Meter not found: " + id));
    }

    public List<Meter> getMetersByCustomer(Long customerId) {
        return meterRepository.findByCustomerId(customerId);
    }

    public Optional<Meter> getMeterByNumber(String meterNumber) {
        return meterRepository.findByMeterNumber(meterNumber);
    }
}
