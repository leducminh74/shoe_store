package vn.edu.hcmuaf.fit.online.shoe.shop.payload;

import javax.validation.constraints.Size;

public class ResetPassRequest {
	private String token;
	
	private String newPassword;

	public ResetPassRequest() {

	}

	public ResetPassRequest(String token, String newPassword) {

		this.token = token;
		this.newPassword = newPassword;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

}
