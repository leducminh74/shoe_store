package vn.edu.hcmuaf.fit.online.shoe.shop.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "status")
public class Status {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String name;


	@OneToMany(cascade = CascadeType.ALL, mappedBy = "status")
	private Set<Account> accounts;

	public Status() {
	}

	public Status(long id, String name, Set<Account> accounts) {
		this.id = id;
		this.name = name;
		this.accounts = accounts;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
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
