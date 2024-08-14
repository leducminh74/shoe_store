package vn.edu.hcmuaf.fit.online.shoe.shop.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "profile")
public class Profile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@OneToOne
	@JoinColumn(name = "account_id")	
	private Account acc;
	
	private String address;
	private String phoneNumber;
	
	private String name;

	public Profile() {

	}

	public Profile(String name, Account acc, String address, String phoneNumber) {
		this.name = name;
		this.acc = acc;
		this.address = address;
		this.phoneNumber = phoneNumber;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Account getAcc() {
		return acc;
	}

	public void setAcc(Account acc) {
		this.acc = acc;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	

}
