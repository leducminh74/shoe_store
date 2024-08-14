package vn.edu.hcmuaf.fit.online.shoe.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Status;
import vn.edu.hcmuaf.fit.online.shoe.shop.service.StatusAccountService;

@RestController
@RequestMapping("api/v1/status-account")
@CrossOrigin("*")
public class StatusAccountController {

	@Autowired
	private StatusAccountService statusAccountService;

	@GetMapping("")
	public ResponseEntity<?> getAllStatus() {
		List<Status> list = statusAccountService.getAllStatus();
		return ResponseEntity.ok(list);
	}

}
