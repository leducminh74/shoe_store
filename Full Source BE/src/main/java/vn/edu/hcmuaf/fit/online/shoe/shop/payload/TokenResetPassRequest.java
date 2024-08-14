package vn.edu.hcmuaf.fit.online.shoe.shop.payload;

public class TokenResetPassRequest {
	private String token;

	public TokenResetPassRequest() {

	}

	public TokenResetPassRequest(String token) {

		this.token = token;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
