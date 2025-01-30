package com.proyectoprueba.cafebar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoprueba.cafebar.entity.Ventas;

@Repository
public interface VentaRepository extends JpaRepository<Ventas, Integer> {
}
