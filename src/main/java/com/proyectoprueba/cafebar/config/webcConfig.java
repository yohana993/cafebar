package com.proyectoprueba.cafebar.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class webcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Permite todas las rutas y orígenes
        registry.addMapping("/**") // Permite solicitudes a todas las rutas
            .allowedOrigins("http://127.0.0.1:5500") // Tu origen de frontend
            .allowedMethods("GET", "POST", "DELETE", "PUT", "OPTIONS") // Métodos permitidos
            .allowedHeaders("*") // Todos los headers permitidos
            .allowCredentials(true); // Permite credenciales (si es necesario)
    }
}
