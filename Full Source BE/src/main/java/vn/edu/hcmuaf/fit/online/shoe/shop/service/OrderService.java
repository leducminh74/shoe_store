package vn.edu.hcmuaf.fit.online.shoe.shop.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Account;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Order;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.OrderDetail;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.OrderStatus;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Payment;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Product;
import vn.edu.hcmuaf.fit.online.shoe.shop.repository.OrderDetailRepository;
import vn.edu.hcmuaf.fit.online.shoe.shop.repository.OrderRepository;
import vn.edu.hcmuaf.fit.online.shoe.shop.repository.OrderStatusRepository;
import vn.edu.hcmuaf.fit.online.shoe.shop.repository.PaymentRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private OrderDetailRepository orderDetailRepository;

	@Autowired
	private OrderStatusRepository orderStatusRepository;

	@Autowired
	private PaymentRepository paymentRepository;

	@Autowired
	private ProductService productService;

	public List<Order> getAllOrder() {
		return orderRepository.findAll();
	}

	public List<OrderDetail> getAllOrderDetail() {
		return orderDetailRepository.findAll();
	}

	public Optional<Order> getOrderById(Long id) {
		return orderRepository.findById(id);
	}

	public Optional<Payment> getPaymentById(Long id) {
		return paymentRepository.findById(id);
	}

	public Order createOrder(Order order) {
		return orderRepository.save(order);
	}

	public OrderDetail createOrderDetail(OrderDetail orderDetail) {
		return orderDetailRepository.save(orderDetail);
	}

	public List<Order> getAllOrderByAccount(Account a) {
		return orderRepository.findByAccount(a);
	}

	public List<OrderDetail> getAllOrderDetailByOrder(Order order) {
		return orderDetailRepository.findByOrder(order);
	}

//	set status order = cancel
	public Order cancelOrder(Order order) {
		Optional<OrderStatus> cancel = getOrderStatusById((long) 5);
		order.setStatus(cancel.get());
		return orderRepository.save(order);
	}

	public Product updateProductQuantityOrder(OrderDetail orderDetail) {
		Product p = orderDetail.getProduct();
		if (p != null) {
			p.setQuantity(p.getQuantity() - orderDetail.getQuantity());
			p.setQuantitySold(orderDetail.getQuantity());
			return productService.saveProduct(p);
		}
		return null;

	}

	public Product updateProductQuantityCancelOrder(OrderDetail orderDetail) {
		Product p = orderDetail.getProduct();
		if (p != null) {
			p.setQuantity(p.getQuantity() + orderDetail.getQuantity());
			return productService.saveProduct(p);
		}
		return null;

	}

	public OrderStatus getOrderStatusByName(String name) {
		return orderStatusRepository.findByName(name);
	}

	public Optional<OrderStatus> getOrderStatusById(Long i) {
		return orderStatusRepository.findById(i);
	}

	public Order acceptOrder(Long id) {
		Order order = getOrderById(id).get();
		OrderStatus accepted = orderStatusRepository.findById((long) 2).get();
		order.setStatus(accepted);
		return orderRepository.save(order);
	}

	public Order shipping(Long id) {
		Order order = getOrderById(id).get();
		OrderStatus shipping = orderStatusRepository.findById((long) 3).get();
		order.setStatus(shipping);
		return orderRepository.save(order);
	}

	public Order delivered(Long id) {
		Order order = getOrderById(id).get();
		OrderStatus delivered = orderStatusRepository.findById((long) 4).get();
		order.setStatus(delivered);
		return orderRepository.save(order);
	}

	public List<Double> getListRevenue(int year) {
		List<Order> list = orderRepository.findAll();
		List<Double> doubleList = new ArrayList<>();
		double totalRevenueOfMonth = 0;
		for (int i = 0; i < 12; i++) {
			if (list != null) {
				for (Order order : list) {
					Calendar cal = Calendar.getInstance();
					cal.setTime(order.getCreateAt());
					if (cal.get(Calendar.MONTH) == i && cal.get(Calendar.YEAR) == year && order.getStatus().getId() == 4) {
						totalRevenueOfMonth += order.getTotal();
					}
				}
				doubleList.add(totalRevenueOfMonth);
				totalRevenueOfMonth = 0;
			} else {
				doubleList.add(totalRevenueOfMonth);
			}

		}

		return doubleList;
	}

	public double getTotalOfYear(int year) {
		List<Order> list = orderRepository.findAll();
		double totalOfYear = 0;
		if (list != null) {
			for (Order order : list) {
				Calendar cal = Calendar.getInstance();
				cal.setTime(order.getCreateAt());
				if (cal.get(Calendar.YEAR) == year && order.getStatus().getId() == 4) {
					totalOfYear += order.getTotal();
				}
			}
		}
		return totalOfYear;

	}

	public List<Integer> getListOrderStatus() {
		List<Order> list = orderRepository.findAll();
		List<Integer> intList = new ArrayList<>();
		int waitingStatus = 0;
		int packStatus = 0;
		int shippingStatus = 0;
		int deliStatus = 0;
		int cancedStatus = 0;
		for (Order order : list) {
			if (order.getStatus().getId() == 1) {
				waitingStatus += 1;
			}
			if (order.getStatus().getId() == 2) {
				packStatus += 1;
			}
			if (order.getStatus().getId() == 3) {
				shippingStatus += 1;
			}
			if (order.getStatus().getId() == 4) {
				deliStatus += 1;
			}
			if (order.getStatus().getId() == 5) {
				cancedStatus += 1;
			}

		}
		intList.add(waitingStatus);
		intList.add(packStatus);
		intList.add(shippingStatus);
		intList.add(deliStatus);
		intList.add(cancedStatus);

		return intList;

	}

}
