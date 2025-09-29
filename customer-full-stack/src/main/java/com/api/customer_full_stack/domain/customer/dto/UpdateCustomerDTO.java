package com.api.customer_full_stack.domain.customer.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record UpdateCustomerDTO(

        String identificacion,


        @Pattern(regexp = "^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$", message = "El primer nombre solo acepta letras")
        String primerNombre,

        @Pattern(regexp = "^[A-Za-zÁÉÍÓÚáéíóúñÑ]*$", message = "El segundo nombre solo acepta letras")
        String segundoNombre,


        @Pattern(regexp = "^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$", message = "El primer apellido solo acepta letras")
        String primerApellido,

        @Pattern(regexp = "^[A-Za-zÁÉÍÓÚáéíóúñÑ]*$", message = "El segundo apellido solo acepta letras")
        String segundoApellido,

        String direccion,


        @Pattern(regexp = "^[0-9]+$", message = "El teléfono solo acepta números")
        String telefono,


        @Email(message = "Formato de email inválido")
        String email,

        String ocupacion,

        @Past(message = "La fecha de nacimiento debe ser en el pasado")
        LocalDate fechaNacimiento


) {
}
