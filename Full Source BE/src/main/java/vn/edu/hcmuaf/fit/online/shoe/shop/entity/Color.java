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
@Table(name = "color")
public class Color {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String color;

	@OneToMany(mappedBy = "color",cascade = CascadeType.ALL)
	private Set<Product> products;

	public Color() {

	}

	public Color(long id, String color, Set<Product> products) {
		this.id = id;
		this.color = color;
		this.products = products;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Set<Product> getProducts() {
		return products;
	}

	public void setProducts(Set<Product> products) {
		this.products = products;
	}

}
