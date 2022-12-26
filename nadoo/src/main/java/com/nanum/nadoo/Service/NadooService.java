package com.nanum.nadoo.Service;

import com.nanum.nadoo.Entity.Users;
import org.springframework.stereotype.Service;

import java.util.List;

public interface NadooService {
    List<Users> getUsers();
}
