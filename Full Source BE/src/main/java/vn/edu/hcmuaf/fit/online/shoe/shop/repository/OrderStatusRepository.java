package vn.edu.hcmuaf.fit.online.shoe.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.OrderStatus;

public interface OrderStatusRepository extends JpaRepository<OrderStatus, Long> {

	OrderStatus findByName(String name);


}
