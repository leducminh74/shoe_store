package vn.edu.hcmuaf.fit.online.shoe.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Slider;
import vn.edu.hcmuaf.fit.online.shoe.shop.service.SliderService;

@RestController
@RequestMapping("api/v1/slider")
@CrossOrigin("*")
public class SliderController {

	@Autowired
	private SliderService sliderService;

	@GetMapping("")
	public ResponseEntity<?> getAllSlider() {
		List<Slider> list = sliderService.getAllSlider();
		return ResponseEntity.ok(list);
	}
}
