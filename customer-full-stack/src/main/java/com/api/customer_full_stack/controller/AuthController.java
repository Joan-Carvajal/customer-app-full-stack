package com.api.customer_full_stack.controller;

import com.api.customer_full_stack.domain.user.DatosAutenticacionUsuario;
import com.api.customer_full_stack.domain.user.User;
import com.api.customer_full_stack.infra.security.AutenticacionService;
import com.api.customer_full_stack.infra.security.DatosJWTToken;
import com.api.customer_full_stack.infra.security.TokenService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private AuthenticationManager authenticationManager;
    private TokenService tokenService;
    private AutenticacionService userService;

    public AuthController(AuthenticationManager authenticationManager, TokenService tokenService, AutenticacionService userService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity autenticarUsuario(@RequestBody @Valid DatosAutenticacionUsuario datosAutenticacionUsuario){
        Authentication authToken = new UsernamePasswordAuthenticationToken(datosAutenticacionUsuario.login(),datosAutenticacionUsuario.clave());
        var usuarioAutenticado= authenticationManager.authenticate(authToken);
        var jwtToken = tokenService.generarToken((User) usuarioAutenticado.getPrincipal());
        return ResponseEntity.ok(new DatosJWTToken(jwtToken));
    }
    @PostMapping("/register")
    public ResponseEntity registrarUsuario(@RequestBody @Valid DatosAutenticacionUsuario datos) {

        User usuario = userService.registrarUsuario(
                datos.login(),
                datos.clave()
        );
        return new ResponseEntity<>("Usuario registrado con éxito: " + usuario.getLogin(), HttpStatus.CREATED);


    }
}
