package com.api.customer_full_stack.infra.security;

import com.api.customer_full_stack.domain.user.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    private TokenService tokenService;

    private UserRepository usuarioRepository;

    public SecurityFilter(TokenService tokenService, UserRepository usuarioRepository) {
        this.tokenService = tokenService;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    protected void doFilterInternal(@NotNull HttpServletRequest request, @NotNull HttpServletResponse response, @NotNull FilterChain filterChain) throws ServletException, IOException {
        var authHearder = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHearder!=null ){
            var token =authHearder.substring(7);
            var subject= tokenService.getSubject(token);
            if (subject !=null){

                var usuario = usuarioRepository.findByLogin(subject);
                var authenticacion = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authenticacion);
            }
        }
        filterChain.doFilter(request,response);

    }
}
