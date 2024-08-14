package vn.edu.hcmuaf.fit.online.shoe.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Color;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Size;
import vn.edu.hcmuaf.fit.online.shoe.shop.service.ColorService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/color")
public class ColorController {

	@Autowired
	private ColorService colorService;

	@GetMapping("")
	public ResponseEntity<List<Color>> getAllColor() {
		List<Color> list = colorService.getAllColor();
		return ResponseEntity.ok(list);
	}

	@PostMapping("")
	public ResponseEntity<Color> addColor(@RequestBody Color color) {
		Color c = colorService.addColor(color);
		if (c != null) {
			return ResponseEntity.ok(c);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Color> getColor(@PathVariable Long id) {
		Color color = colorService.getColor(id);
		if (color != null) {
			return ResponseEntity.ok(color);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Color> updateColor(@PathVariable Long id, @RequestBody Color color) {
		Color c = colorService.getColor(id);
		Color c2 = colorService.findByColor(color.getColor());
		if (c != null && c2 == null) {
			c.setColor(color.getColor());
			colorService.addColor(c);
			return ResponseEntity.ok(c);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/{id}")
	public void deleteColor(@PathVariable Long id) {
		colorService.deleteColor(id);

	}
}
