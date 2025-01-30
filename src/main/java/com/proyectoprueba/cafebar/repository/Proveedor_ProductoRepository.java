package com.proyectoprueba.cafebar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoprueba.cafebar.entity.Proveedor_Producto;

@Repository
public interface Proveedor_ProductoRepository extends JpaRepository<Proveedor_Producto, Integer> {
    
}
