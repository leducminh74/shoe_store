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
@Table(name = "payment")
public class Payment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String name;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "payment")
	private Set<Order> listOrder;

	public Payment() {

	}

	public Payment(long id, String name, Set<Order> listOrder) {
		super();
		this.id = id;
		this.name = name;
		this.listOrder = listOrder;
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

	public Set<Order> getListOrder() {
		return listOrder;
	}

	public void setListOrder(Set<Order> listOrder) {
		this.listOrder = listOrder;
	}
	
	

}
