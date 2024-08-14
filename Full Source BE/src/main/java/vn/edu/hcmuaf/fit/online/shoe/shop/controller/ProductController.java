package vn.edu.hcmuaf.fit.online.shoe.shop.controller;

import java.io.IOException;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Category;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Color;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Product;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Size;
import vn.edu.hcmuaf.fit.online.shoe.shop.helper.FileUploadHelper;
import vn.edu.hcmuaf.fit.online.shoe.shop.payload.ProductRequest;
import vn.edu.hcmuaf.fit.online.shoe.shop.service.CategoryService;
import vn.edu.hcmuaf.fit.online.shoe.shop.service.ColorService;
import vn.edu.hcmuaf.fit.online.shoe.shop.service.ProductService;
import vn.edu.hcmuaf.fit.online.shoe.shop.service.SizeService;

@RestController
@RequestMapping(path = "api/v1/product")
public class ProductController {

	@Autowired
	private ProductService productService;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private ColorService colorService;

	@Autowired
	private SizeService sizeService;
	
	@Autowired
	private FileUploadHelper fileUploadHelper;

	@GetMapping("")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Product>> getAllProduct(
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "5", required = false) Integer pageSize,
			@RequestParam( value = "sortBy",defaultValue = "id", required = false) String sortBy,
			@RequestParam(value = "sortDir",defaultValue = "asc",required = false) String sortDir) {
		List<Product> list = productService.getAllProduct(pageNumber, pageSize, sortBy,sortDir);
		return new ResponseEntity<List<Product>>(list, HttpStatus.OK);
	}

	@GetMapping("/count")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<?> countAllProduct() {
		Long value = productService.countAllProduct();
		return new ResponseEntity<>(value, HttpStatus.OK);
	}

	@PostMapping("")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Product> saveProduct(@RequestBody ProductRequest productRequest) {
		Color color = colorService.getColor(productRequest.getColor());
		Size size = sizeService.getSize(productRequest.getSize());
		Category category = categoryService.getCategoryById(productRequest.getCategory()).get();
		Product p = new Product(productRequest.getName(), productRequest.getBrand(), productRequest.getDescription(),
				color, size, productRequest.getPrice(), productRequest.getSellPrice(), productRequest.getImg(),
				productRequest.getQuantity(), 0, category);
		Product product = productService.saveProduct(p);
		return new ResponseEntity<Product>(product, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Product> getProduct(@PathVariable Long id) {
		Optional<Product> p = productService.getProduct(id);
		if (p.isPresent()) {
			return new ResponseEntity<Product>(p.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

	}

	@GetMapping("/search")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Product>> searchProduct(
			@RequestParam(value = "name", defaultValue = "", required = false) String name) {
		List<Product> list = productService.SearchByName(name);
		return new ResponseEntity<List<Product>>(list, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
		Optional<Product> p = productService.getProduct(id);

		if (p.isPresent()) {
			p.get().setName(product.getName());
			p.get().setBrand(product.getBrand());
			p.get().setDescription(product.getDescription());
			p.get().setColor(product.getColor());
			p.get().setSize(product.getSize());
			p.get().setPrice(product.getPrice());
			p.get().setSellPrice(product.getSellPrice());
			p.get().setImg(product.getImg());
			p.get().setQuantity(product.getQuantity());
			p.get().setCategory(product.getCategory());
			return new ResponseEntity<Product>(productService.saveProduct(p.get()), HttpStatus.OK);

		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

	}

	@DeleteMapping("/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Product> deleteProduct(@PathVariable Long id) {
		Optional<Product> p = productService.getProduct(id);
		if (p.isPresent()) {
			productService.removeProduct(id);
			return new ResponseEntity<Product>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

	}

	@GetMapping("/category/{cid}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Product>> getProductByCategory(@PathVariable Long cid) {
		Optional<Category> c = categoryService.getCategoryById(cid);

		List<Product> list = productService.getProductByCategory(c.get());

		return new ResponseEntity<List<Product>>(list, HttpStatus.OK);

//		return new ResponseEntity<List<Product>>(HttpStatus.NOT_FOUND);

	}

	@GetMapping("/new-product")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Product>> getTop12ProductByDateDESC() {
		List<Product> list = productService.get12NewProduct();
		if (!list.isEmpty()) {
			return new ResponseEntity<List<Product>>(list, HttpStatus.OK);
		}
		return new ResponseEntity<List<Product>>(HttpStatus.NOT_FOUND);

	}

	@GetMapping("/popular-product")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Product>> getTop12ProductByQuantitySoldASC() {
		List<Product> list = productService.get12PopularProduct();
		if (!list.isEmpty()) {
			return new ResponseEntity<List<Product>>(list, HttpStatus.OK);
		}
		return new ResponseEntity<List<Product>>(HttpStatus.NOT_FOUND);

	}
	
	@PostMapping("/upload_image")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<?> uplaodImage(@RequestParam("file") MultipartFile file) throws IOException {

		try {

			if (file.isEmpty()) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Request must contain file");
			}
			
			boolean f = fileUploadHelper.uploadFile(file);
			if(f) {
//				return ResponseEntity.ok("File successfully upload");
				return ResponseEntity.ok(ServletUriComponentsBuilder.fromCurrentContextPath().path("/img/").path(file.getOriginalFilename()).toUriString());
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong! try again");
	}
	
	@GetMapping("/same-product/{cid}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<?> getSameProduct(@PathVariable Long cid){
		Category category = categoryService.getCategoryById(cid).get();
		List<Product> list = productService.get4ProductByCategory(category);
		return ResponseEntity.ok(list);
	}

}
