package com.proyectoprueba.cafebar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoprueba.cafebar.entity.Roles;

@Repository
public interface RolRepository extends JpaRepository<Roles, Integer> {
}
