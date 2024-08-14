package vn.edu.hcmuaf.fit.online.shoe.shop.dto;

import java.util.HashSet;
import java.util.Set;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Account;

public class RoleDto {
	private int id;
	private String name;
	private Set<Account> account = new HashSet<>();

	public RoleDto() {
	}

	public RoleDto(int id, String name, Set<Account> account) {
		super();
		this.id = id;
		this.name = name;
		this.account = account;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Account> getAccount() {
		return account;
	}

	public void setAccount(Set<Account> account) {
		this.account = account;
	}

}
