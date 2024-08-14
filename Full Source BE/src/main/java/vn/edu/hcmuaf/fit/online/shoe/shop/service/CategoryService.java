package vn.edu.hcmuaf.fit.online.shoe.shop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Category;
import vn.edu.hcmuaf.fit.online.shoe.shop.repository.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	public List<Category> getAllCategory() {
		return categoryRepository.findAll();
	}

	public Optional<Category> getCategoryById(Long id) {
		return categoryRepository.findById(id);
	}

	public Category saveCategory(Category category) {
		return categoryRepository.save(category);
	}

	public void removeCategory(Long id) {
		categoryRepository.deleteById(id);
	}

}
