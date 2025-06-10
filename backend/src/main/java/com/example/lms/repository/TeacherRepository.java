package com.example.lms.repository;

import com.example.lms.model.Teacher;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class TeacherRepository {
    private final List<Teacher> teachers = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong();

    public List<Teacher> findAll() {
        return teachers;
    }

    public Optional<Teacher> findById(Long id) {
        return teachers.stream().filter(t -> t.getId().equals(id)).findFirst();
    }

    public Teacher save(Teacher teacher) {
        teacher.setId(counter.incrementAndGet());
        teachers.add(teacher);
        return teacher;
    }
}
