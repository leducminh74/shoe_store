package vn.edu.hcmuaf.fit.online.shoe.shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.online.shoe.shop.entity.Size;
import vn.edu.hcmuaf.fit.online.shoe.shop.repository.SizeRepository;

@Service
public class SizeService {

	@Autowired
	SizeRepository sizeRepository;

	public List<Size> getAllSize() {
		return sizeRepository.findAll();
	}

	public Size getSize(Long id) {
		return sizeRepository.findById(id).get();
	}

	public Size findBySize(int size) {
		return sizeRepository.findBySize(size);
	}

	public Size addSize(Size size) {
		Size s = findBySize(size.getSize());
		if (s == null) {
			return sizeRepository.save(size);
		}
		return null;
	}

	public Size editSize(Long id, Size newSize) {
		Size size = getSize(id);
		if (size != null) {
			size.setSize(newSize.getSize());
			return addSize(size);
		}
		return null;
	}

	public void deleteSize(Long id) {
		sizeRepository.deleteById(id);
	}

}
