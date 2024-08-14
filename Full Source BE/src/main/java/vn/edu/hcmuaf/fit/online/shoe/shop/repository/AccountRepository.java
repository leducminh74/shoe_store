package vn.edu.hcmuaf.fit.online.shoe.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Account;


@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

	Account findByUsername(String username);
	
	Account findByEmail(String email);

	Account findByUsernameAndPassword(String username, String encodePassword);

	Account findByResetPasswordToken(String token);

	Account findByCheckVerifyToken(String token);

}
