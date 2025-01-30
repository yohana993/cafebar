package com.proyectoprueba.cafebar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoprueba.cafebar.entity.Usuario;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
Usuario findByNombreUsuarioAndContrasena(String nombreUsuario,String contrasena);
boolean existsByIdUsuarioAndDocumentoAndIdRol(int idUsuario, String documento, int idRol);
boolean existsByNombreUsuario(String nombreUsuario);
}

