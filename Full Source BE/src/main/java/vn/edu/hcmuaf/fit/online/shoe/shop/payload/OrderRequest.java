package vn.edu.hcmuaf.fit.online.shoe.shop.payload;

public class OrderRequest {
	private Long id;
	private String fullName;
	private String address;
	private String phoneNumber;
	private Long userId;
	private double total;
	private Long paymentId;

	public OrderRequest() {

	}

	public OrderRequest(Long id, String fullName, String address, String phoneNumber, Long userId, double total,
			Long paymentId) {
		super();
		this.id = id;
		this.fullName = fullName;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.userId = userId;
		this.total = total;
		this.paymentId = paymentId;

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public Long getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(Long paymentId) {
		this.paymentId = paymentId;
	}

	@Override
	public String toString() {
		return "OrderRequest [id=" + id + ", fullName=" + fullName + ", address=" + address + ", phoneNumber="
				+ phoneNumber + ", userId=" + userId + ", total=" + total + ", paymentId=" + paymentId + "]";
	}

}
