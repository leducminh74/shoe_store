package vn.edu.hcmuaf.fit.online.shoe.shop.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Account;
import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Profile;
import vn.edu.hcmuaf.fit.online.shoe.shop.repository.ProfileRepository;

@Service
public class ProfileService {

	@Autowired
	private ProfileRepository profileRepository;

	public Optional<Profile> getProfileByAccount(Account acc) {
		return profileRepository.findByAcc(acc);
	}

	public void saveProfile(Profile p) {
		profileRepository.save(p);
	}

	public Profile createProfile(Account acc) {
		Optional<Profile> p = getProfileByAccount(acc);
		if (p.isEmpty()) {
			Profile newProfile = new Profile(null, acc, null, null);
			saveProfile(newProfile);
			return newProfile;
		}
		return null;
	}

	public Profile updateProfile(Profile newProfile) {
		Optional<Profile> profile = getProfileByAccount(newProfile.getAcc());
		if (profile.isPresent()) {
			profile.get().setAddress(newProfile.getAddress());
			profile.get().setName(newProfile.getName());
			profile.get().setPhoneNumber(newProfile.getPhoneNumber());
			saveProfile(profile.get());
			return profile.get();
		}
		return null;
	}
}
