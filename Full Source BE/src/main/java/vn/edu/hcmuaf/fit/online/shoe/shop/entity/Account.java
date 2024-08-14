package vn.edu.hcmuaf.fit.online.shoe.shop.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "account")
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long userId;
	
	@NotEmpty(message = "Username là bắt buộc")
	private String username;
	
	@NotEmpty(message = "Password là bắt buộc")
	@Size(min = 3,message = "Password phải tối thiểu 3 kí tự")
	private String password;
	
	@Email(message = "Email không hợp lệ")
	private String email;

	@ManyToOne
	@JoinColumn(name = "role")
	@JsonIgnoreProperties(value = { "account", "handler", "hibernateLazyInitializer" }, allowSetters = true)
	private Role role;

	@ManyToOne
	@JoinColumn(name = "status")
	@JsonIgnoreProperties(value = { "accounts", "handler", "hibernateLazyInitializer" }, allowSetters = true)
	private Status status;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "account")
	private Set<Order> orders;
	
	private String resetPasswordToken;
	
	private String checkVerifyToken;
	
	@ManyToMany
	@JsonIgnoreProperties(value = { "listAccount", "handler", "hibernateLazyInitializer" }, allowSetters = true)
	private Set<Product> favorite;
	
	public Account() {

	}

	public Account(String username, String password, String email, Role role, Status status) {
		super();
		this.username = username;
		this.password = password;
		this.email = email;
		this.role = role;
		this.status = status;
	}

	public Account(long userId, String username, String password, String email, Role role, Status status) {
		super();
		this.userId = userId;
		this.username = username;
		this.password = password;
		this.email = email;
		this.role = role;
		this.status = status;
	}
	
	

	public Set<Product> getFavorite() {
		return favorite;
	}

	public void setFavorite(Set<Product> favorite) {
		this.favorite = favorite;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
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

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public String getResetPasswordToken() {
		return resetPasswordToken;
	}

	public void setResetPasswordToken(String resetPasswordToken) {
		this.resetPasswordToken = resetPasswordToken;
	}

	public String getCheckVerifyToken() {
		return checkVerifyToken;
	}

	public void setCheckVerifyToken(String checkVerifyToken) {
		this.checkVerifyToken = checkVerifyToken;
	}
	
	
	

}
