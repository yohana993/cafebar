package com.proyectoprueba.cafebar.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// import lombok.Data;

@Entity
@Table(name = "roles")
public class Roles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRol;
    private String nombre;
    public Integer getIdRol() {
        return this.idRol;
    }
 
    public void setIdRol(Integer idRol) {
        this.idRol = idRol;
    }
    
    public String getNombre() {
        return this.nombre;
    }
 
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}