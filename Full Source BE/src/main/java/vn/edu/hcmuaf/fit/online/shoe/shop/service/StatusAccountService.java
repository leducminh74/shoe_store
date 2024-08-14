package vn.edu.hcmuaf.fit.online.shoe.shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Status;
import vn.edu.hcmuaf.fit.online.shoe.shop.repository.StatusRepository;

@Service
public class StatusAccountService {

	@Autowired
	private StatusRepository statusRepository;

	public List<Status> getAllStatus() {
		return statusRepository.findAll();
	}
	
	public Status getStatus(Long id) {
		return statusRepository.findById(id).get();
	}
}
