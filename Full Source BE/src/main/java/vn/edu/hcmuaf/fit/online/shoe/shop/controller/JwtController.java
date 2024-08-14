package vn.edu.hcmuaf.fit.online.shoe.shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Account;
import vn.edu.hcmuaf.fit.online.shoe.shop.helper.JwtUtil;
import vn.edu.hcmuaf.fit.online.shoe.shop.payload.JwtRequest;
import vn.edu.hcmuaf.fit.online.shoe.shop.payload.JwtRespone;
import vn.edu.hcmuaf.fit.online.shoe.shop.service.AccountDetail;
import vn.edu.hcmuaf.fit.online.shoe.shop.service.AccountService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class JwtController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private AccountDetail accountDetail;

	@Autowired
	private AccountService accountService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtUtil jwtUtil;

	@PostMapping(value = "/token")
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
		Account acc = accountService.getAccountByUsername(jwtRequest.getUsername());
		Account accMap = null;
		try {
			this.authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));
		} catch (UsernameNotFoundException e) {
			e.printStackTrace();
			throw new Exception("Bad Credential");
		} catch (BadCredentialsException e) {
			e.printStackTrace();
			throw new Exception("Bad Credential");
		}

		UserDetails userDetails = this.accountDetail.loadUserByUsername(jwtRequest.getUsername());
		String token = this.jwtUtil.generateToken(userDetails);
		if (acc != null && passwordEncoder.matches(jwtRequest.getPassword(), acc.getPassword())) {
			accMap = acc;
		}

		return ResponseEntity.ok(new JwtRespone(token, accMap));
	}
	
	@PostMapping(value = "/google")
	public ResponseEntity<?> google(@RequestBody JwtRequest jwtRequest){
		Account acc = accountService.getAccountByUsername(jwtRequest.getUsername());
		Account accMap = null;
		

		UserDetails userDetails = this.accountDetail.loadUserByUsername(jwtRequest.getUsername());
		String token = this.jwtUtil.generateToken(userDetails);
		if (acc != null && passwordEncoder.matches(jwtRequest.getPassword(), acc.getPassword())) {
			accMap = acc;
		}

		return ResponseEntity.ok(new JwtRespone(token, accMap));
	}
	
}
