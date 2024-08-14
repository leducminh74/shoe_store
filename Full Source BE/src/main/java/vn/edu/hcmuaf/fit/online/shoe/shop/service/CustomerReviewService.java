package vn.edu.hcmuaf.fit.online.shoe.shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.CustomerReview;
import vn.edu.hcmuaf.fit.online.shoe.shop.repository.CustomerReviewRepository;

@Service
public class CustomerReviewService {
	
	@Autowired
	private CustomerReviewRepository customerReviewRepository;
	
	public List<CustomerReview> getAllCustomerReview(){
		return customerReviewRepository.findAll();
	}

}
