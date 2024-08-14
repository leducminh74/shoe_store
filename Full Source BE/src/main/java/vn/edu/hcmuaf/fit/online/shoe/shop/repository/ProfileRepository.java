package vn.edu.hcmuaf.fit.online.shoe.shop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Account;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long>{
	
	Optional<Profile> findByAcc(Account acc);

}
