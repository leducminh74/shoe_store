package vn.edu.hcmuaf.fit.online.shoe.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Category;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

	List<Product> findByCategory(Category category);
	
	List<Product> findByNameContaining(String name);

	List<Product> findTop12ByOrderByCreateAtDesc();
	
	List<Product> findTop12ByOrderByQuantitySoldDesc();

	List<Product> findTop4ByCategoryOrderByIdDesc(Category category);



}
