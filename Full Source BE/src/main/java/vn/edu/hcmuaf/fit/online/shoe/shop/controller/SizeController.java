package vn.edu.hcmuaf.fit.online.shoe.shop.controller;

import java.util.List;
import java.util.Optional;

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

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Category;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Size;
import vn.edu.hcmuaf.fit.online.shoe.shop.service.SizeService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/size")
public class SizeController {

	@Autowired
	private SizeService sizeService;

	@GetMapping("")
	public ResponseEntity<List<Size>> getAllSize() {
		List<Size> list = sizeService.getAllSize();
		return ResponseEntity.ok(list);

	}

	@PostMapping("")
	public ResponseEntity<Size> addSize(@RequestBody Size size) {
		Size s = sizeService.addSize(size);
		if (s != null) {
			return ResponseEntity.ok(s);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Size> getSize(@PathVariable Long id) {
		Size size = sizeService.getSize(id);
		if (size != null) {
			return ResponseEntity.ok(size);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Size> updateSize(@PathVariable Long id, @RequestBody Size size) {
		Size s = sizeService.getSize(id);
		Size s2 = sizeService.findBySize(size.getSize());
		if (s != null && s2 == null) {
			s.setSize(size.getSize());
			sizeService.addSize(s);
			return ResponseEntity.ok(s);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/{id}")
	public void deleteSize(@PathVariable Long id) {
		sizeService.deleteSize(id);

	}
}
