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
import vn.edu.hcmuaf.fit.online.shoe.shop.service.CategoryService;

@RestController
@RequestMapping("api/v1/category")
@CrossOrigin("*")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@GetMapping("")
	public ResponseEntity<List<Category>> getAllCategory() {
		List<Category> list = categoryService.getAllCategory();
		if (!list.isEmpty()) {
			return new ResponseEntity<List<Category>>(list, HttpStatus.OK);
		}
		return new ResponseEntity<List<Category>>(HttpStatus.NO_CONTENT);
	}

	@PostMapping("")
	public ResponseEntity<Category> addCategory(@RequestBody Category category) {
		Category c = categoryService.saveCategory(category);
		if (c != null) {
			return ResponseEntity.ok(c);
		}
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Category> getCategory(@PathVariable Long id) {
		Optional<Category> category = categoryService.getCategoryById(id);
		if (category.isPresent()) {
			return ResponseEntity.ok(category.get());
		}
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category) {
		Optional<Category> c = categoryService.getCategoryById(id);
		if (c.isPresent()) {
			c.get().setName(category.getName());
			categoryService.saveCategory(c.get());
			return ResponseEntity.ok(c.get());
		}
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@DeleteMapping("/{id}")
	public void deleteCategory(@PathVariable Long id) {
		categoryService.removeCategory(id);

	}

}
