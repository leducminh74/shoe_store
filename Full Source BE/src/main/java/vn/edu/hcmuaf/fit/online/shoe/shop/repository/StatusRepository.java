package vn.edu.hcmuaf.fit.online.shoe.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Status;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {

	Status findByName(String name);

}
