package vn.edu.hcmuaf.fit.online.shoe.shop.payload;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Account;

public class JwtRespone {
	private String token;
	private Account acc;

	public JwtRespone(String token, Account acc) {
		super();
		this.token = token;
		this.acc = acc;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Account getAcc() {
		return acc;
	}

	public void setAcc(Account acc) {
		this.acc = acc;
	}

	@Override
	public String toString() {
		return "JwtRespone [token=" + token + ", acc=" + acc + "]";
	}

}
