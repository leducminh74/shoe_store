package vn.edu.hcmuaf.fit.online.shoe.shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Role;
import vn.edu.hcmuaf.fit.online.shoe.shop.repository.RoleRepository;

@Service
public class RoleService {

	@Autowired
	private RoleRepository roleRepository;

	public List<Role> getAllRole() {
		return roleRepository.findAll();
	}
	
	public Role getRole(Long id) {
		return roleRepository.findById(id).get();
	}

}
