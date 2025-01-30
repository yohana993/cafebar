package com.proyectoprueba.cafebar.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.proyectoprueba.cafebar.entity.Categorias;
import com.proyectoprueba.cafebar.repository.CategoriaRepository;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {
    @Autowired
    private CategoriaRepository categoriaService;

    @PostMapping
    public ResponseEntity<Categorias> crearCategoria(@RequestBody Categorias categoria) {
        categoriaService.save(categoria);
        return ResponseEntity.ok(categoria);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Categorias>> obtenerCategoriaPorId(@PathVariable int id) {
        return ResponseEntity.ok(categoriaService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Categorias>> obtenerTodasLasCategorias() {
        return ResponseEntity.ok(categoriaService.findAll());
    }

    @PutMapping
    public ResponseEntity<Categorias> actualizarCategoria(@RequestBody Categorias categoria) {
        categoriaService.save(categoria);
        return ResponseEntity.ok(categoria);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarCategoria(@PathVariable int id) {
        categoriaService.deleteById(id);
        String mensaje = "Se elimino la Categoria " + id;
        return ResponseEntity.ok(mensaje);
    }
}
