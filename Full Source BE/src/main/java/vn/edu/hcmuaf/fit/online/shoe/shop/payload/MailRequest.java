package vn.edu.hcmuaf.fit.online.shoe.shop.payload;

public class MailRequest {
	private String email;

	public MailRequest() {

	}

	public MailRequest(String email) {

		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
