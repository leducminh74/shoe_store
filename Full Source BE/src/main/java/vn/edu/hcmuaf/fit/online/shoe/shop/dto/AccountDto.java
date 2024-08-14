package vn.edu.hcmuaf.fit.online.shoe.shop.dto;

public class AccountDto {
	private int userId;
	private String username;
	private String password;
	private String email;
	private RoleDto role;
	private StatusDto status;

	public AccountDto() {

	}

	public AccountDto(int userId, String username, String password, String email, RoleDto role, StatusDto status) {
		this.userId = userId;
		this.username = username;
		this.password = password;
		this.email = email;
		this.role = role;
		this.status = status;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
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

	public RoleDto getRole() {
		return role;
	}

	public void setRole(RoleDto role) {
		this.role = role;
	}

	public StatusDto getStatus() {
		return status;
	}

	public void setStatus(StatusDto status) {
		this.status = status;
	}

}
