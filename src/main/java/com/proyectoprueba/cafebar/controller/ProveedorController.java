package com.proyectoprueba.cafebar.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.proyectoprueba.cafebar.entity.Proveedores;
import com.proyectoprueba.cafebar.repository.ProveedorRepository;

@RestController
@RequestMapping("/proveedores")
public class ProveedorController {
    @Autowired
    private ProveedorRepository proveedorRepository;

    @PostMapping
    public ResponseEntity<Proveedores> crearProveedor(@RequestBody Proveedores proveedor) {
        proveedorRepository.save(proveedor);
        return ResponseEntity.ok(proveedor);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Proveedores>> obtenerProveedorPorId(@PathVariable int id) {
        return ResponseEntity.ok(proveedorRepository.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Proveedores>> obtenerTodosLosProveedores() {
        return ResponseEntity.ok(proveedorRepository.findAll());
    }

    @PutMapping
    public ResponseEntity<Proveedores> actualizarProveedor(@RequestBody Proveedores proveedor) {
        proveedorRepository.save(proveedor);
        return ResponseEntity.ok(proveedor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarProveedor(@PathVariable int id) {
        proveedorRepository.deleteById(id);
        String mensaje = "Se elimino el Proveedor " + id;
        return ResponseEntity.ok(mensaje);
    }
}
