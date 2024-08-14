package vn.edu.hcmuaf.fit.online.shoe.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Color;

public interface ColorRepository extends JpaRepository<Color, Long>{

	Color findByColor(String color);

}
