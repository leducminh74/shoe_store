package vn.edu.hcmuaf.fit.online.shoe.shop.payload;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Product;

public class OrderDetailRequest {
	private Long _orderId;
	private double _price;
	private int _quantity;
	private Product _product;

	public OrderDetailRequest(Long _id, Long _orderId, double _price, int _quantity, Product _product) {

	
		this._orderId = _orderId;
		this._price = _price;
		this._quantity = _quantity;
		this._product = _product;
	}



	public Long get_orderId() {
		return _orderId;
	}

	public void set_orderId(Long _orderId) {
		this._orderId = _orderId;
	}

	public double get_price() {
		return _price;
	}

	public void set_price(double _price) {
		this._price = _price;
	}

	public int get_quantity() {
		return _quantity;
	}

	public void set_quantity(int _quantity) {
		this._quantity = _quantity;
	}

	public Product get_product() {
		return _product;
	}

	public void set_product(Product _product) {
		this._product = _product;
	}

	
}
