package vn.edu.hcmuaf.fit.online.shoe.shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Payment;
import vn.edu.hcmuaf.fit.online.shoe.shop.repository.PaymentRepository;

@Service
public class PaymentService {
	
	@Autowired
	private PaymentRepository paymentRepository;
	
	public List<Payment> getAllPayment(){
		return this.paymentRepository.findAll();
	}

}
