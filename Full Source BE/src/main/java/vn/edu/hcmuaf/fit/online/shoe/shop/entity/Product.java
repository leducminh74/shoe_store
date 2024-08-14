package vn.edu.hcmuaf.fit.online.shoe.shop.entity;

import java.sql.Timestamp;
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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "product")
public class Product  {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String name;
	private String brand;
	private String description;

	@ManyToOne
	@JoinColumn(name = "color")
	@JsonIgnoreProperties(value = { "products", "handler", "hibernateLazyInitializer" }, allowSetters = true)
	private Color color;

	@ManyToOne
	@JoinColumn(name = "size")
	@JsonIgnoreProperties(value = { "listProduct", "handler", "hibernateLazyInitializer" }, allowSetters = true)
	private Size size;
	
	private double price;
	private double sellPrice;
	private String img;
	private long quantity;
	private long quantitySold;

	@CreationTimestamp
	private Timestamp createAt;

	@UpdateTimestamp
	private Timestamp updateAt;

	@ManyToOne
	@JoinColumn(name = "category_id")
	@JsonIgnoreProperties(value = { "products", "handler", "hibernateLazyInitializer" }, allowSetters = true)
	private Category category;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
	private Set<OrderDetail> orderDetails;
	
	@ManyToMany(mappedBy = "favorite")
	@JsonIgnoreProperties(value = { "favorite", "handler", "hibernateLazyInitializer" }, allowSetters = true)
	private Set<Account> listAccount;

	public Product() {

	}
	
	public Product( String name, String brand, String description, Color color, Size size,
			double price, double sellPrice, String img, long quantity, long quantitySold, Category category) {
		
		this.name = name;
		this.brand = brand;
		this.description = description;
		this.color = color;
		this.size = size;
		this.price = price;
		this.sellPrice = sellPrice;
		this.img = img;
		this.quantity = quantity;
		this.quantitySold = quantitySold;
		this.category = category;
	}


	public Product(long id, String name, String brand, String description, Color color, Size size,
			double price, double sellPrice, String img, long quantity, long quantitySold, Timestamp createAt,
			Timestamp updateAt, Category category) {
		
		this.id = id;
		this.name = name;
		this.brand = brand;
		this.description = description;
		this.color = color;
		this.size = size;
		this.price = price;
		this.sellPrice = sellPrice;
		this.img = img;
		this.quantity = quantity;
		this.quantitySold = quantitySold;
		this.createAt = createAt;
		this.updateAt = updateAt;
		this.category = category;
	}
	

	public Set<Account> getListAccount() {
		return listAccount;
	}

	public void setListAccount(Set<Account> listAccount) {
		this.listAccount = listAccount;
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

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Color getColor() {
		return color;
	}

	public void setColor(Color color) {
		this.color = color;
	}

	public Size getSize() {
		return size;
	}

	public void setSize(Size size) {
		this.size = size;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getSellPrice() {
		return sellPrice;
	}

	public void setSellPrice(double sellPrice) {
		this.sellPrice = sellPrice;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public long getQuantity() {
		return quantity;
	}

	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}

	public long getQuantitySold() {
		return quantitySold;
	}

	public void setQuantitySold(long quantitySold) {
		this.quantitySold = quantitySold;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}


	public Timestamp getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Timestamp createAt) {
		this.createAt = createAt;
	}

	public Timestamp getUpdateAt() {
		return updateAt;
	}

	public void setUpdateAt(Timestamp updateAt) {
		this.updateAt = updateAt;
	}

	
}
