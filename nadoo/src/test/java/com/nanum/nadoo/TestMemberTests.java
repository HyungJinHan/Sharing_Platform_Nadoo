package com.nanum.nadoo;

import com.nanum.nadoo.Entity.TestMember;
import com.nanum.nadoo.Repository.TestMemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;
import java.util.List;

@SpringBootTest
public class TestMemberTests {

    TestMember hhj = new TestMember();

    @Autowired
    TestMemberRepository repository;

    // 테스트유저 insert하는 테스트 코드
    @Test
    void insertSampleUsers(){
        hhj.setMemId("hhj");
        hhj.setMemName("한형진");
        hhj.setMemAddress("광주광역시");
        hhj.setMemHp("010-1111-1112");
        repository.save(hhj);
    }

    // assertJ 사용 코드
    @Test
    void aseertTest(){
        // 현재 TestMember의 모든 객체를 불러와서 myk 객체가 포함되있는지 확인하는 메소드
        List<TestMember> temp = repository.findAll();
        TestMember myk = new TestMember("myk", "민윤기", null, null, null);

        assertThat(temp).isNotIn(myk);
    }
}
