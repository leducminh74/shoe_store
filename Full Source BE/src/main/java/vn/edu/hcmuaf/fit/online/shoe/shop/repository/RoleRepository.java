package vn.edu.hcmuaf.fit.online.shoe.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

	Role findByName(String name);

}
