package vn.edu.hcmuaf.fit.online.shoe.shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Color;
import vn.edu.hcmuaf.fit.online.shoe.shop.repository.ColorRepository;

@Service
public class ColorService {

	@Autowired
	private ColorRepository colorRepository;

	public List<Color> getAllColor() {
		return colorRepository.findAll();
	}

	public Color getColor(Long id) {
		return colorRepository.findById(id).get();
	}
	
	public Color findByColor(String color) {
		return colorRepository.findByColor(color);
	}

	public Color addColor(Color color) {
		Color c = findByColor(color.getColor().trim());
		if(c == null) {
			return colorRepository.save(color);
		}
		return null;
	}

	public Color editColor(Long id, Color newColor) {
		Color color = getColor(id);
		if (color != null) {
			color.setColor(newColor.getColor());
			return addColor(color);
		}
		return null;
	}

	public void deleteColor(Long id) {
		colorRepository.deleteById(id);
	}

}
