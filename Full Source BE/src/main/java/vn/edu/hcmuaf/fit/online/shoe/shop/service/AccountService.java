package vn.edu.hcmuaf.fit.online.shoe.shop.service;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Account;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Product;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Role;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Status;
import vn.edu.hcmuaf.fit.online.shoe.shop.repository.AccountRepository;
import vn.edu.hcmuaf.fit.online.shoe.shop.repository.RoleRepository;
import vn.edu.hcmuaf.fit.online.shoe.shop.repository.StatusRepository;

@Service
public class AccountService {

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private StatusRepository statusRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private ProductService productService;

	public List<Account> getAllAccounts() {
		return accountRepository.findAll();
	}

	public Account getAccountByUsername(String username) {
		return accountRepository.findByUsername(username);
	}

	public Account getAccountByEmail(String email) {
		return accountRepository.findByEmail(email);
	}

	public Role getRoleByName(String name) {
		return roleRepository.findByName(name);
	}

	public Role getRoleById(Long id) {
		return roleRepository.findById(id).get();
	}

	public Status getStatusByName(String name) {
		return statusRepository.findByName(name);
	}

	public Status getStatusById(Long id) {
		return statusRepository.findById(id).get();
	}

	public Account saveAccount(Account a) {
		return accountRepository.save(a);
	}

	public Optional<Account> getAccountById(Long id) {
		return accountRepository.findById(id);

	}

	public Account getAccountByUsernameAndPassword(String username, String password) {
		return accountRepository.findByUsernameAndPassword(username, passwordEncoder.encode(password));
	}

	public void sendEmail(String recipientEmail, String content, String subject)
			throws MessagingException, UnsupportedEncodingException {
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

		helper.setFrom("ducminh0573@gmail.com", "Box Shoe Support");
		helper.setTo(recipientEmail);
		helper.setSubject(subject);
		helper.setText(content, true);
		mailSender.send(message);
	}

	public void updateResetPasswordToken(String token, String email) throws UsernameNotFoundException {
		Account acc = accountRepository.findByEmail(email);
		if (acc != null) {
			acc.setResetPasswordToken(token);
			saveAccount(acc);
		} else {
			throw new UsernameNotFoundException("Could not find any customer with the email " + email);
		}
	}

	public Account getByResetPasswordToken(String token) {
		return accountRepository.findByResetPasswordToken(token);
	}

	public void updatePassword(Account acc, String newPassword) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String encodedPassword = passwordEncoder.encode(newPassword);
		acc.setPassword(encodedPassword);

		acc.setResetPasswordToken(null);
		saveAccount(acc);
	}

	public Account getByVerifyToken(String token) {
		return accountRepository.findByCheckVerifyToken(token);
	}

	public Account changePassword(Optional<Account> a, String newPass) {
		if (a.isPresent()) {
			a.get().setPassword(passwordEncoder.encode(newPass));
			saveAccount(a.get());
			return a.get();
		}
		return null;
	}

	public Account disableAccount(Long id) {
		Account account = getAccountById(id).get();
		Status disable = getStatusById((long) 2);
		account.setStatus(disable);
		return saveAccount(account);
	}

	public Account enableAccount(Long id) {
		Account account = getAccountById(id).get();
		Status enable = getStatusById((long) 1);
		account.setStatus(enable);
		return saveAccount(account);
	}

	public Account setToAdmin(Long id) {
		Account account = getAccountById(id).get();
		Role admin = getRoleById((long) 1);
		account.setRole(admin);
		return saveAccount(account);
	}

	public Account setToUser(Long id) {
		Account account = getAccountById(id).get();
		Role user = getRoleById((long) 0);
		account.setRole(user);
		return saveAccount(account);
	}

	public Account addFavorite(Long userId, Long pId) {
		Account acc = getAccountById(userId).get();
		Product product = productService.getProduct(pId).get();
		if (acc == null || product == null) {
			return null;
		}
		Set<Product> favorite = acc.getFavorite();
		if (favorite.contains(product)) {
			return null;
		}
		favorite.add(product);
		saveAccount(acc);
		return acc;
	}

	public Account removeFavorite(Long userId, Long pId) {
		Account acc = getAccountById(userId).get();
		Product product = productService.getProduct(pId).get();
		if (acc == null || product == null) {
			return null;
		}
		Set<Product> favorite = acc.getFavorite();
		if (!favorite.contains(product)) {
			return null;
		}
		favorite.remove(product);
		saveAccount(acc);
		return acc;
	}

	public List<Integer> accountStatistics() {
		int activeAccount = 0;
		int disableAccount = 0;
		int notActiveAccount = 0;
		List<Account> acc = getAllAccounts();
		List<Integer> list = new ArrayList<>();
		for (Account account : acc) {
			if (account.getStatus().getId() == 0) {
				notActiveAccount += 1;
			}
			if (account.getStatus().getId() == 1) {
				activeAccount += 1;
			}
			if (account.getStatus().getId() == 2) {
				disableAccount += 1;
			}
		}
		list.add(notActiveAccount);
		list.add(activeAccount);
		list.add(disableAccount);
		
		return list;

	}

}
