package vn.edu.hcmuaf.fit.online.shoe.shop.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Account;
import vn.edu.hcmuaf.fit.online.shoe.shop.repository.AccountRepository;

@Service
public class AccountDetail implements UserDetailsService {

	@Autowired
	private AccountRepository accountRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Account acc = accountRepository.findByUsername(username);
		List<GrantedAuthority> authorities = null;
		if (acc == null) {
			throw new UsernameNotFoundException("Not found username: " + username);
		}
		String password = acc.getPassword();
		authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(acc.getRole().getName()));

		return new User(username, password, authorities);
		
	}

}
