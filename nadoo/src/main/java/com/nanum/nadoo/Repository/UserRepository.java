package com.nanum.nadoo.Repository;

import com.nanum.nadoo.Entity.TestMember;
import com.nanum.nadoo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    List<User> findAll();

    User findByUserAccount(String userAccount);
}