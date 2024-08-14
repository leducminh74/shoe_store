package vn.edu.hcmuaf.fit.online.shoe.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Size;

public interface SizeRepository extends JpaRepository<Size, Long>{

	Size findBySize(int size);

}
