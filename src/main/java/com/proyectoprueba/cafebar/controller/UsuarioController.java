package com.proyectoprueba.cafebar.controller;

import java.security.SecureRandom;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.proyectoprueba.cafebar.entity.Login;
import com.proyectoprueba.cafebar.entity.Usuario;
import com.proyectoprueba.cafebar.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> obtenerUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        String nombreUsuario = generateUniqueUsername();
        String contrasena = generateRandomPassword();
        usuario.setNombreUsuario(nombreUsuario);
        usuario.setContrasena(contrasena);
        return usuarioRepository.save(usuario);
    }

    @PutMapping
    public ResponseEntity<Usuario> actualizarRol(@RequestBody Usuario usuario) {
        usuarioRepository.save(usuario);
        return ResponseEntity.ok(usuario);
    }

    @DeleteMapping("/Eliminar")
    public ResponseEntity<String> eliminarRol(@RequestBody Usuario usuario) {
        if (usuarioRepository.existsByIdUsuarioAndDocumentoAndIdRol(usuario.getIdUsuario(), usuario.getDocumento(), usuario.getIdRol())){
            usuarioRepository.deleteById(usuario.getIdUsuario());
            return ResponseEntity.ok("Se elimino el Usuario " + usuario.getIdUsuario()) ;
        }
        else
            return ResponseEntity.ok("No se econtro usuario con los datos");        
    }

    //front
    @PostMapping("/login")
    public Usuario loginIngreso(@RequestBody Login login) {
        return usuarioRepository.findByNombreUsuarioAndContrasena(login.getUsuario(), login.getContrasena());
    }

    private String generateUniqueUsername() {
        String baseUsername = "Prueba";
        int counter = 1;
        String newUsername = baseUsername + counter;
        while (usuarioRepository.existsByNombreUsuario(newUsername)) {
            counter++;
            newUsername = baseUsername + counter;
        }
        return newUsername;
    }

    private String generateRandomPassword() {
        SecureRandom random = new SecureRandom();
        int length = 6 + random.nextInt(5); // Genera una longitud entre 6 y 10
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder password = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            password.append(characters.charAt(random.nextInt(characters.length())));
        }
        return password.toString();
    }
}
