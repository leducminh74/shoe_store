package vn.edu.hcmuaf.fit.online.shoe.shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Slider;
import vn.edu.hcmuaf.fit.online.shoe.shop.repository.SliderRepository;

@Service
public class SliderService {

	@Autowired
	private SliderRepository sliderRepository;

	public List<Slider> getAllSlider() {
		return sliderRepository.findAll();
	}
}
