package vn.edu.hcmuaf.fit.online.shoe.shop.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import vn.edu.hcmuaf.fit.online.shoe.shop.config.PaymentConfig;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Payment;
import vn.edu.hcmuaf.fit.online.shoe.shop.service.PaymentService;

@RestController
@RequestMapping("api/v1/payment")
@CrossOrigin("*")
public class PaymentController {
	
	@Autowired
	private PaymentService paymentService;

	@GetMapping("/create-payment")
	public ResponseEntity<?> createpayment(@RequestParam Long totalPrice,@RequestParam Long orderId) throws UnsupportedEncodingException {
		String vnp_Version = "2.1.0";
		String vnp_Command = "pay";
//        long amount = Integer.parseInt(req.getParameter("amount"))*100;

		long amount = totalPrice * 100;

		String vnp_TxnRef = PaymentConfig.getRandomNumber(8);
		String vnp_TmnCode = PaymentConfig.vnp_TmnCode;

		Map<String, String> vnp_Params = new HashMap<>();
		vnp_Params.put("vnp_Version", vnp_Version);
		vnp_Params.put("vnp_Command", vnp_Command);
		vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
		vnp_Params.put("vnp_Amount", String.valueOf(amount));
		vnp_Params.put("vnp_CurrCode", "VND");
		vnp_Params.put("vnp_BankCode", "NCB");

		vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
		vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
		vnp_Params.put("vnp_Locale", "vn");
	
		vnp_Params.put("vnp_ReturnUrl", (PaymentConfig.vnp_Returnurl)+"?orderId="+orderId);

		Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		String vnp_CreateDate = formatter.format(cld.getTime());
		vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

		cld.add(Calendar.MINUTE, 15);
		String vnp_ExpireDate = formatter.format(cld.getTime());
		vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

		List fieldNames = new ArrayList(vnp_Params.keySet());
		Collections.sort(fieldNames);
		StringBuilder hashData = new StringBuilder();
		StringBuilder query = new StringBuilder();
		Iterator itr = fieldNames.iterator();
		while (itr.hasNext()) {
			String fieldName = (String) itr.next();
			String fieldValue = (String) vnp_Params.get(fieldName);
			if ((fieldValue != null) && (fieldValue.length() > 0)) {
				// Build hash data
				hashData.append(fieldName);
				hashData.append('=');
				hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
				// Build query
				query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
				query.append('=');
				query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
				if (itr.hasNext()) {
					query.append('&');
					hashData.append('&');
				}
			}
		}
		String queryUrl = query.toString();
		String vnp_SecureHash = PaymentConfig.hmacSHA512(PaymentConfig.vnp_HashSecret, hashData.toString());
		queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
		String paymentUrl = PaymentConfig.vnp_PayUrl + "?" + queryUrl;

		Map<String, Object> url = new HashMap<>();
		url.put("url", paymentUrl);
		url.put("orderId", orderId);

		return ResponseEntity.ok(url);
	}
	
	@GetMapping("/getAllPayment")
	public ResponseEntity<List<Payment>> getAllPayment(){
		return ResponseEntity.ok(this.paymentService.getAllPayment());
	}

}
