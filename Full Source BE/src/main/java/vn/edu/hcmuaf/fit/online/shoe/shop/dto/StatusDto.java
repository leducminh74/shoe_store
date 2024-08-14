package vn.edu.hcmuaf.fit.online.shoe.shop.dto;

import java.util.HashSet;
import java.util.Set;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Account;

public class StatusDto {
	private int id;
	private String name;
	private Set<Account> accounts = new HashSet<>();

	public StatusDto() {
	}

	public StatusDto(int id, String name, Set<Account> accounts) {
		this.id = id;
		this.name = name;
		this.accounts = accounts;
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

	public Set<Account> getAccounts() {
		return accounts;
	}

	public void setAccounts(Set<Account> accounts) {
		this.accounts = accounts;
	}

}
