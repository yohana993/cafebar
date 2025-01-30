package com.proyectoprueba.cafebar.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.proyectoprueba.cafebar.entity.Productos;
import com.proyectoprueba.cafebar.entity.Ventas;
import com.proyectoprueba.cafebar.repository.ProductoRepository;
import com.proyectoprueba.cafebar.repository.VentaRepository;

@RestController
@RequestMapping("/ventas")
public class VentaController {
    @Autowired
    private VentaRepository ventaService;
    @Autowired
    private ProductoRepository productoRepository;
    @PostMapping
    public ResponseEntity<Ventas> crearVenta(@RequestBody Ventas venta) {
        ventaService.save(venta);
        Productos p = productoRepository.findById(venta.getIdProducto()).get();
        p.setCantidad(p.getCantidad()-venta.getCantidad());
        productoRepository.save(p);
        return ResponseEntity.ok(venta);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Ventas>> obtenerVentaPorId(@PathVariable int id) {
        return ResponseEntity.ok(ventaService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Ventas>> obtenerTodasLasVentas() {
        return ResponseEntity.ok(ventaService.findAll());
    }

    @PutMapping
    public ResponseEntity<Ventas> actualizarVenta(@RequestBody Ventas venta) {
        ventaService.save(venta);
        return ResponseEntity.ok(venta);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarVenta(@PathVariable int id) {
        ventaService.deleteById(id);
        String mensaje = "Se elimino la Venta " + id;
        return ResponseEntity.ok(mensaje);
    }
}
