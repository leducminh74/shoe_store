package vn.edu.hcmuaf.fit.online.shoe.shop.entity;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@ManyToOne
	@JoinColumn(name = "account_id")
	@JsonIgnoreProperties(value = { "orders", "handler", "hibernateLazyInitializer" }, allowSetters = true)
	private Account account;

	private double total;

	@ManyToOne
	@JoinColumn(name = "payment_id")
	@JsonIgnoreProperties(value = { "listOrder", "handler", "hibernateLazyInitializer" }, allowSetters = true)
	private Payment payment;

	private String fullName;
	private String address;
	private String phoneNumber;

	@CreationTimestamp
	private Timestamp createAt;

	@UpdateTimestamp
	private Timestamp updateAt;

	@ManyToOne
	@JoinColumn(name = "status_id")
	@JsonIgnoreProperties(value = { "listOrder", "handler", "hibernateLazyInitializer" }, allowSetters = true)
	private OrderStatus status;

	public Order() {

	}

	public Order(Account account, double total, Payment payment, String fullName, String address, String phoneNumber,
			OrderStatus status) {
		this.account = account;
		this.total = total;
		this.payment = payment;
		this.fullName = fullName;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.status = status;
	}

	public Order(long id, Account account, double total, Payment payment, String fullName, String address,
			String phoneNumber, Timestamp createAt, Timestamp updateAt, OrderStatus status) {
		super();
		this.id = id;
		this.account = account;
		this.total = total;
		this.payment = payment;
		this.fullName = fullName;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.createAt = createAt;
		this.updateAt = updateAt;
		this.status = status;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public Payment getPayment() {
		return payment;
	}

	public void setPayment(Payment payment) {
		this.payment = payment;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Timestamp getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Timestamp createAt) {
		this.createAt = createAt;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public Timestamp getUpdateAt() {
		return updateAt;
	}

	public void setUpdateAt(Timestamp updateAt) {
		this.updateAt = updateAt;
	}

}
