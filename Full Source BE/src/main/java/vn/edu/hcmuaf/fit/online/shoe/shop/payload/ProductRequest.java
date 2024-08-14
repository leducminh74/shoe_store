package vn.edu.hcmuaf.fit.online.shoe.shop.payload;

public class ProductRequest {
	private String name;
	private String img;
	private String description;
	private String brand;
	private Long color;
	private Long size;
	private double price;
	private double sellPrice;
	private Long quantity;
	private Long category;

	public ProductRequest() {

	}

	public ProductRequest(String name, String img, String description, String brand, Long color, Long size,
			double price, double sellPrice, Long quantity, Long category) {
		super();
		this.name = name;
		this.img = img;
		this.description = description;
		this.brand = brand;
		this.color = color;
		this.size = size;
		this.price = price;
		this.sellPrice = sellPrice;
		this.quantity = quantity;
		this.category = category;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public Long getColor() {
		return color;
	}

	public void setColor(Long color) {
		this.color = color;
	}

	public Long getSize() {
		return size;
	}

	public void setSize(Long size) {
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

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}

	public Long getCategory() {
		return category;
	}

	public void setCategory(Long category) {
		this.category = category;
	}

}
