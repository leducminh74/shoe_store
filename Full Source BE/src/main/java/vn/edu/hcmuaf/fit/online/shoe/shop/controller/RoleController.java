package vn.edu.hcmuaf.fit.online.shoe.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Role;
import vn.edu.hcmuaf.fit.online.shoe.shop.service.RoleService;

@RestController
@RequestMapping("api/v1/role")
@CrossOrigin("*")
public class RoleController {

	@Autowired
	private RoleService roleService;

	@GetMapping("")
	public ResponseEntity<?> getAllRole() {
		List<Role> list = roleService.getAllRole();
		return ResponseEntity.ok(list);
	}

}
