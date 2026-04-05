package com.electricitybill.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "receipt_number", unique = true)
    private String receiptNumber;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bill_id", nullable = false)
    private Bill bill;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Column(name = "amount_paid", nullable = false)
    private Double amountPaid;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_mode", nullable = false)
    private PaymentMode paymentMode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status = PaymentStatus.SUCCESS;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "remarks")
    private String remarks;

    @PrePersist
    protected void onCreate() {
        paymentDate = LocalDateTime.now();
        if (receiptNumber == null)
            receiptNumber = "RCP-" + System.currentTimeMillis();
        if (transactionId == null)
            transactionId = "TXN" + (long)(Math.random() * 9_000_000_000L + 1_000_000_000L);
    }

    public enum PaymentMode {
        UPI, DEBIT_CARD, CREDIT_CARD, NET_BANKING, CASH
    }

    public enum PaymentStatus {
        SUCCESS, FAILED, PENDING, REFUNDED
    }

	public void setBill(Bill bill2) {
		// TODO Auto-generated method stub
		
	}

	public void setRemarks(String remarks2) {
		// TODO Auto-generated method stub
		
	}

	public void setPaymentMode(PaymentMode mode) {
		// TODO Auto-generated method stub
		
	}

	public void setAmountPaid(Object totalAmount) {
		// TODO Auto-generated method stub
		
	}

	public void setCustomer(Object customer2) {
		// TODO Auto-generated method stub
		
	}

	public void setStatus(PaymentStatus success) {
		// TODO Auto-generated method stub
		
	}
}
