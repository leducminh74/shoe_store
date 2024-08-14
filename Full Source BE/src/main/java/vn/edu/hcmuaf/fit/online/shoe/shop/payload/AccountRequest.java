package vn.edu.hcmuaf.fit.online.shoe.shop.payload;

public class AccountRequest {
	private String username;
	private String password;
	private String email;
	private Long role;
	private Long status;

	public AccountRequest() {

	}

	public AccountRequest(String username, String password, String email, Long role, Long status) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.role = role;
		this.status = status;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getRole() {
		return role;
	}

	public void setRole(Long role) {
		this.role = role;
	}

	public Long getStatus() {
		return status;
	}

	public void setStatus(Long status) {
		this.status = status;
	}

}
