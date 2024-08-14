package vn.edu.hcmuaf.fit.online.shoe.shop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Category;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Product;
import vn.edu.hcmuaf.fit.online.shoe.shop.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	public List<Product> getAllProduct(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
		Sort sort = (sortDir.equalsIgnoreCase("asc")) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

		Pageable p = PageRequest.of(pageNumber, pageSize, sort);
		Page<Product> pageProduct = productRepository.findAll(p);
		return pageProduct.getContent();
	}

	public Optional<Product> getProduct(Long id) {
		return productRepository.findById(id);
	}

	public List<Product> SearchByName(String name) {
		return productRepository.findByNameContaining(name);
	}

	public Product saveProduct(Product product) {
		return productRepository.save(product);
	}

	public void removeProduct(Long id) {
		productRepository.deleteById(id);
	}

	public List<Product> getProductByCategory(Category category) {
		return productRepository.findByCategory(category);
	}

	public List<Product> get12NewProduct() {
		return productRepository.findTop12ByOrderByCreateAtDesc();
	}

	public List<Product> get12PopularProduct() {
		return productRepository.findTop12ByOrderByQuantitySoldDesc();
	}

	public Long countAllProduct() {
		return productRepository.count();
	}
	
	public List<Product> get4ProductByCategory(Category category){
		return productRepository.findTop4ByCategoryOrderByIdDesc(category);
		
	}

}
