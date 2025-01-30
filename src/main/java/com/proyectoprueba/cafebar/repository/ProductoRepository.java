package com.proyectoprueba.cafebar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoprueba.cafebar.entity.Productos;

@Repository
public interface ProductoRepository extends JpaRepository<Productos, Integer> {
    List<Productos> findByIdCategoria(int idCategoria);
}
