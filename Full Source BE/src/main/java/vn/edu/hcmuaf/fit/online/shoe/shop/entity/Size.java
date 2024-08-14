package vn.edu.hcmuaf.fit.online.shoe.shop.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "size")
public class Size {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private int size;

	@OneToMany(mappedBy = "size",cascade = CascadeType.ALL)
	private Set<Product> listProduct;

	public Size() {

	}

	public Size(long id, int size, Set<Product> listProduct) {

		this.id = id;
		this.size = size;
		this.listProduct = listProduct;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public Set<Product> getListProduct() {
		return listProduct;
	}

	public void setListProduct(Set<Product> listProduct) {
		this.listProduct = listProduct;
	}

}
