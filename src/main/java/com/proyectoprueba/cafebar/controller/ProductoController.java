package com.proyectoprueba.cafebar.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.proyectoprueba.cafebar.entity.Productos;
import com.proyectoprueba.cafebar.repository.ProductoRepository;


@RestController
@RequestMapping("/productos")
public class ProductoController {
    @Autowired
    private ProductoRepository productoService;

    @PostMapping
    public ResponseEntity<Productos> crearProducto(@RequestBody Productos producto) {
        productoService.save(producto);
        return ResponseEntity.ok(producto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Productos>> obtenerProductoPorId(@PathVariable int id) {
        return ResponseEntity.ok(productoService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Productos>> obtenerTodosLosProductos() {
        return ResponseEntity.ok(productoService.findAll());
    }

    @PutMapping
    public ResponseEntity<Productos> actualizarProducto(@RequestBody Productos producto) {
        productoService.save(producto);
        return ResponseEntity.ok(producto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarProducto(@PathVariable int id) {
        productoService.deleteById(id);
        String mensaje = "Se elimino el Producto " + id;
        return ResponseEntity.ok(mensaje);
    }

    @GetMapping("/ProductoporCategoria/{id}")
    public ResponseEntity <List<Productos>> cargarProductosPorCategoria(@PathVariable int id) {
        return ResponseEntity.ok(productoService.findByIdCategoria(id));
    }
}
