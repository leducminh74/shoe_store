package vn.edu.hcmuaf.fit.online.shoe.shop.controller;

import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.bytebuddy.utility.RandomString;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Account;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Profile;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Role;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Status;
import vn.edu.hcmuaf.fit.online.shoe.shop.payload.AccountRequest;
import vn.edu.hcmuaf.fit.online.shoe.shop.payload.ChangePasswordRequest;
import vn.edu.hcmuaf.fit.online.shoe.shop.payload.MailRequest;
import vn.edu.hcmuaf.fit.online.shoe.shop.payload.ResetPassRequest;
import vn.edu.hcmuaf.fit.online.shoe.shop.service.AccountService;
import vn.edu.hcmuaf.fit.online.shoe.shop.service.ProfileService;
import vn.edu.hcmuaf.fit.online.shoe.shop.service.RoleService;
import vn.edu.hcmuaf.fit.online.shoe.shop.service.StatusAccountService;

@RestController
@RequestMapping(path = "api/v1/account")
@CrossOrigin(origins = "*")
public class AccountController {

	@Autowired
	private AccountService accountService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private ProfileService profileService;

	@Autowired
	private RoleService roleService;

	@Autowired
	private StatusAccountService statusAccountService;

	@GetMapping("")
	public ResponseEntity<List<Account>> getAllAccounts() {
		List<Account> list = accountService.getAllAccounts();
		if (!list.isEmpty()) {
			return new ResponseEntity<List<Account>>(list, HttpStatus.OK);
		}
		return new ResponseEntity<List<Account>>(HttpStatus.NO_CONTENT);
	}

	@PostMapping("")
	public ResponseEntity<Account> register(@RequestBody @Valid Account account,BindingResult bindingResult)
			throws Exception {
		if(bindingResult.hasErrors()) {
			throw new Exception("Invalid value");
		}
		Account existingUsername = accountService.getAccountByUsername(account.getUsername());
		Account existingEmail = accountService.getAccountByEmail(account.getEmail());
		if (existingUsername == null && existingEmail == null) {
			String token = RandomString.make(30);
			Role userRole = accountService.getRoleByName("user");
			Status notActiveStatus = accountService.getStatusByName("Not Activated");
			Account a = new Account(account.getUsername(), passwordEncoder.encode(account.getPassword()),
					account.getEmail(), userRole, notActiveStatus);
			a.setCheckVerifyToken(token);
			accountService.saveAccount(a);
			String verifyAccountLink = "http://localhost:4200/verify?token=" + token;
			String subject = "Link xác thực tài khoản";
			String content = "<p>Xin chào,</p>" + "<p>Bạn có gửi yêu cầu đăng kí tài khoản</p>"
					+ "<p>Nhấn vào link để xác nhận đăng kí tài khoản:</p>" + "<p><a href=\"" + verifyAccountLink
					+ "\">Xác nhận</a></p>" + "<br>" + "<p>Bỏ qua email nếu bạn không đăng kí tài khoản.";
			accountService.sendEmail(a.getEmail(), content, subject);
			return new ResponseEntity<Account>(a, HttpStatus.OK);
		} else {
			return new ResponseEntity<Account>(HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/admin")
	public ResponseEntity<Account> addUser(@RequestBody AccountRequest accountRequest)
			throws UnsupportedEncodingException, MessagingException {
		Account existingUsername = accountService.getAccountByUsername(accountRequest.getUsername());
		Account existingEmail = accountService.getAccountByEmail(accountRequest.getEmail());
		if (existingUsername == null && existingEmail == null) {
			Role role = roleService.getRole(accountRequest.getRole());
			Status status = statusAccountService.getStatus(accountRequest.getStatus());
			Account a = new Account(accountRequest.getUsername(), passwordEncoder.encode(accountRequest.getPassword()),
					accountRequest.getEmail(), role, status);
			accountService.saveAccount(a);
			return new ResponseEntity<Account>(a, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/verify/{token}")
	public ResponseEntity<?> checkTokenVerify(@PathVariable String token) {
		Account acc = accountService.getByVerifyToken(token);
		if (acc == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		Status activeStatus = accountService.getStatusByName("Activated");
		acc.setStatus(activeStatus);
		acc.setCheckVerifyToken(null);
		accountService.saveAccount(acc);
		profileService.createProfile(acc);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/add-account")
	public ResponseEntity<Account> addAccount(@RequestBody Account account) {
		Account existingUsername = accountService.getAccountByUsername(account.getUsername());
		Account existingEmail = accountService.getAccountByEmail(account.getEmail());
		if (existingUsername == null && existingEmail == null) {
			Status activeStatus = accountService.getStatusByName("Activated");
			Account a = new Account(account.getUsername(), account.getPassword(), account.getEmail(), account.getRole(),
					activeStatus);
			accountService.saveAccount(a);
			return new ResponseEntity<Account>(a, HttpStatus.OK);
		} else {
			return new ResponseEntity<Account>(HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Account> getAccountById(@PathVariable Long id) {
		Optional<Account> a = accountService.getAccountById(id);
		if (a.isPresent()) {
			return new ResponseEntity<Account>(a.get(), HttpStatus.OK);
		}
		return new ResponseEntity<Account>(HttpStatus.NOT_FOUND);
	}

	@PostMapping("/forgot_password")
	public ResponseEntity<?> processForgotPassword(@RequestBody MailRequest mail) throws Exception {
		String token = RandomString.make(30);
		try {
			accountService.updateResetPasswordToken(token, mail.getEmail());
			String resetPasswordLink = "http://localhost:4200/reset_password?token=" + token;
			String subject = "Link thay đổi mật khẩu";
			String content = "<p>Xin chào,</p>" + "<p>Bạn có gửi yêu cầu thay đổi mật khẩu.</p>"
					+ "<p>Nhấn vào link để thay đổi mật khẩu:</p>" + "<p><a href=\"" + resetPasswordLink
					+ "\">Đổi mật khẩu</a></p>" + "<br>" + "<p>Bỏ qua email nếu bạn đã nhớ mật khẩu của mình, "
					+ "hoặc bạn không gửi yêu cầu.</p>";
			accountService.sendEmail(mail.getEmail(), content, subject);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (UsernameNotFoundException e) {
			e.printStackTrace();
			throw new Exception("Account not found!");
		} catch (UnsupportedEncodingException | MessagingException e) {
			e.printStackTrace();

		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@GetMapping("/reset_password/{token}")
	public ResponseEntity<?> checkTokenResetPass(@PathVariable String token) {
		Account acc = accountService.getByResetPasswordToken(token);
		if (acc == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/reset_password")
	public ResponseEntity<?> processResetPassword(@RequestBody ResetPassRequest reset) {

		Account acc = accountService.getByResetPasswordToken(reset.getToken());
		if (acc == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			accountService.updatePassword(acc, reset.getNewPassword());
			return new ResponseEntity<>(HttpStatus.OK);
		}

	}

	@PostMapping("/change_password")
	public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePassword) throws Exception {

		Optional<Account> acc = accountService.getAccountById(changePassword.getUserId());
		if (acc.isPresent()) {
			if (passwordEncoder.matches(changePassword.getPassword(), acc.get().getPassword())) {
				accountService.changePassword(acc, changePassword.getNewPassword());
				return new ResponseEntity<>(HttpStatus.OK);
			} else {
				throw new Exception("Current Password doesn't match");
			}
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

	}

	@GetMapping("/profile/{id}")
	public ResponseEntity<Profile> getProfile(@PathVariable Long id) {

		Optional<Account> acc = accountService.getAccountById(id);
		if (acc.isPresent()) {
			Optional<Profile> profile = profileService.getProfileByAccount(acc.get());
			if (profile.isPresent())
				return new ResponseEntity<>(profile.get(), HttpStatus.OK);

		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}

	@PutMapping("/profile")
	public ResponseEntity<Profile> updateProfile(@RequestBody Profile profile) {
		Profile p = profileService.updateProfile(profile);
		if (p != null)
			return new ResponseEntity<>(p, HttpStatus.OK);

		return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}

	@GetMapping("/disable/{id}")
	public ResponseEntity<Account> disableAccount(@PathVariable Long id) {
		Account account = accountService.disableAccount(id);
		if (account != null) {
			return ResponseEntity.ok(account);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@GetMapping("/enable/{id}")
	public ResponseEntity<Account> enableAccount(@PathVariable Long id) {
		Account account = accountService.enableAccount(id);
		if (account != null) {
			return ResponseEntity.ok(account);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@GetMapping("/setAdmin/{id}")
	public ResponseEntity<Account> setRoleToAdmin(@PathVariable Long id) {
		Account account = accountService.setToAdmin(id);
		if (account != null) {
			return ResponseEntity.ok(account);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@GetMapping("/setUser/{id}")
	public ResponseEntity<Account> setRoleToUser(@PathVariable Long id) {
		Account account = accountService.setToUser(id);
		if (account != null) {
			return ResponseEntity.ok(account);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@PostMapping("/favorite/{id}")
	public ResponseEntity<Account> addProductToFavoriteList(@PathVariable Long id, @RequestBody Long pId) {
		Account acc = accountService.addFavorite(id, pId);
		if (acc != null) {
			return ResponseEntity.ok(acc);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}
	
	@PostMapping("/favorite/remove/{id}")
	public ResponseEntity<Account> removeProductToFavoriteList(@PathVariable Long id, @RequestBody Long pId) {
		Account acc = accountService.removeFavorite(id, pId);
		if (acc != null) {
			return ResponseEntity.ok(acc);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}

}
