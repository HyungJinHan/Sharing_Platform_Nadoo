package com.nanum.nadoo.Service;

import com.nanum.nadoo.Entity.Users;
import com.nanum.nadoo.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NadooService{

    @Autowired
    UsersRepository uRespository;
    public List<Users> getUsers() {
        return uRespository.findAll();
    }
}
