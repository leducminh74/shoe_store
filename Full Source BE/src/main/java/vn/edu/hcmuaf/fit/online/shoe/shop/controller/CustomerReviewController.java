package vn.edu.hcmuaf.fit.online.shoe.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.CustomerReview;
import vn.edu.hcmuaf.fit.online.shoe.shop.service.CustomerReviewService;

@RestController
@RequestMapping("api/v1/customer_review")
@CrossOrigin("*")
public class CustomerReviewController {
	
	@Autowired
	private CustomerReviewService customerReviewService;
	
	@GetMapping("")
	public ResponseEntity<?> getAllCustomerReview(){
		List<CustomerReview> list =  customerReviewService.getAllCustomerReview();
		return ResponseEntity.ok(list);
				
	}

}
