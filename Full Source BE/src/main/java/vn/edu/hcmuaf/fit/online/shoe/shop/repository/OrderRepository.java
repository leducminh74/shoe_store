package vn.edu.hcmuaf.fit.online.shoe.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Account;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{

	List<Order> findByAccount(Account a);
	

}
