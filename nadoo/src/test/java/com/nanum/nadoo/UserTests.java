package com.nanum.nadoo;

import com.nanum.nadoo.Entity.User;
import com.nanum.nadoo.Repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class UserTests {

	@Autowired
	UserRepository repository;
	@Test	// User 가데이터 생성
	void insertSampleUsers() {
		List<User> list = new ArrayList<User>();

		list.add(new User("hhj1234", "나는한형진", "010-2067-4413", null, null, null));
		list.add(new User("myk1234", "나는민윤기", "010-6420-7598", null, null, null));
		list.add(new User("kmj1234", "나는김민정", "010-7358-6606", null, null, null));
		list.add(new User("kyr1234", "나는김유리", "010-7427-7275", null, null, null));
		list.add(new User("bhn1234", "나는백하늘", "010-8505-6569", null, null, null));
		list.add(new User("bsj1234", "나는배수진", "010-7266-3107", null, null, null));

		for(int i = 0; i < list.size(); i++){
			repository.save(list.get(i));
		}
	}

}
