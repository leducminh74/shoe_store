package vn.edu.hcmuaf.fit.online.shoe.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Order;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

	List<OrderDetail> findByOrder(Order order);

}
