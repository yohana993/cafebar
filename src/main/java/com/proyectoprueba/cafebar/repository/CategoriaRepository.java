package com.proyectoprueba.cafebar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoprueba.cafebar.entity.Categorias;

@Repository
public interface CategoriaRepository extends JpaRepository<Categorias, Integer> {
}
