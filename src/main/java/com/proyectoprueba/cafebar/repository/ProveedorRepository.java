package com.proyectoprueba.cafebar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoprueba.cafebar.entity.Proveedores;

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedores, Integer> {
}
