package com.api.customer_full_stack.infra.security;

import com.api.customer_full_stack.domain.user.DatosAutenticacionUsuario;
import com.api.customer_full_stack.domain.user.User;
import com.api.customer_full_stack.domain.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AutenticacionService implements UserDetailsService {

    private  UserRepository usuarioRepository;
    private PasswordEncoder passwordEncoder;

    public AutenticacionService(UserRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByLogin(username);
    }



    public User registrarUsuario(String login, String clave) {
        if (usuarioRepository.findByLogin(login) != null) {
            throw new IllegalArgumentException("El usuario ya existe");
        }

        User usuario = new User(
                login,
                passwordEncoder.encode(clave)
        );

        return usuarioRepository.save(usuario);
    }
}
