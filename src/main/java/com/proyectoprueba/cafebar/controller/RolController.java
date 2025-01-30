package com.proyectoprueba.cafebar.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.proyectoprueba.cafebar.entity.Roles;
import com.proyectoprueba.cafebar.repository.RolRepository;


@RestController
@RequestMapping("/roles")
public class RolController {
    @Autowired
    private RolRepository rolService;

    @PostMapping
    public ResponseEntity<Roles> crearRol(@RequestBody Roles rol) {
        rolService.save(rol);
        return ResponseEntity.ok(rol);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Roles>> obtenerRolPorId(@PathVariable int id) {
        return ResponseEntity.ok(rolService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Roles>> obtenerTodosLosRoles() {
        return ResponseEntity.ok(rolService.findAll());
    }

    @PutMapping
    public ResponseEntity<Roles> actualizarRol(@RequestBody Roles rol) {
        rolService.save(rol);
        return ResponseEntity.ok(rol);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarRol(@PathVariable int id) {
        rolService.deleteById(id);
        String mensaje = "Se elimino el Rol " + id;
        return ResponseEntity.ok(mensaje);
    }
}
