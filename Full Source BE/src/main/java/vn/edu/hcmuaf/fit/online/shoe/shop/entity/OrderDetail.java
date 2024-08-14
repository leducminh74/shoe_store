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
@Table(name = "order_detail")
public class OrderDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@ManyToOne
	@JoinColumn(name = "order_id")
	private Order order;

	@ManyToOne
	@JoinColumn(name = "product_id")
	@JsonIgnoreProperties(value = { "orderDetails", "handler", "hibernateLazyInitializer" }, allowSetters = true)
	private Product product;
	
	private double price;
	
	private long quantity;
	
	@CreationTimestamp
	private Timestamp createAt;
	
	@UpdateTimestamp
	private Timestamp updateAt;

	public OrderDetail() {

	}

	public OrderDetail(Order order, Product product, double price, long quantity) {
		this.order = order;
		this.product = product;
		this.price = price;
		this.quantity = quantity;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Order getOrderId() {
		return order;
	}

	public void setOrderId(Order orderId) {
		this.order = orderId;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public long getQuantity() {
		return quantity;
	}

	public void setQuantity(long quantity) {
		this.quantity = quantity;
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

	@Override
	public String toString() {
		return "OrderDetail [id=" + id + ", order=" + order + ", product=" + product + ", price=" + price
				+ ", quantity=" + quantity + ", createAt=" + createAt + ", updateAt=" + updateAt + "]";
	}

	
}
