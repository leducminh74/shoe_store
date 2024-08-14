package vn.edu.hcmuaf.fit.online.shoe.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import vn.edu.hcmuaf.fit.online.shoe.shop.service.AccountService;
import vn.edu.hcmuaf.fit.online.shoe.shop.service.OrderService;

@RestController
@RequestMapping("api/v1/management")
@CrossOrigin("*")
public class ManagementController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private AccountService accountService;

	@GetMapping("/revenue")
	public ResponseEntity<?> getListRevenueOfYear(
			@RequestParam(value = "year", defaultValue = "2023", required = false) int year) {

		List<Double> list = orderService.getListRevenue(year);
		return ResponseEntity.ok(list);
	}

	@GetMapping("/account-statistics")
	public ResponseEntity<?> getListAccountStatistics() {
		List<Integer> list = accountService.accountStatistics();
		return ResponseEntity.ok(list);
	}

	@GetMapping("/order-statistics")
	public ResponseEntity<?> getListOrderStatus() {
		List<Integer> list = orderService.getListOrderStatus();
		return ResponseEntity.ok(list);
	}

	@GetMapping("/total-revenue-ofYear")
	public ResponseEntity<?> totalRevenueOfYear(
			@RequestParam(value = "year", defaultValue = "2023", required = false) int year) {
		double total = orderService.getTotalOfYear(year);
		return ResponseEntity.ok(total);
	}

}
