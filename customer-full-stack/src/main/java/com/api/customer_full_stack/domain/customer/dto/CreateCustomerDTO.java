package com.api.customer_full_stack.domain.customer.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record CreateCustomerDTO(

        @NotBlank(message = "La identificación es obligatoria")
        String identificacion,


        @NotBlank(message = "El primer nombre es obligatorio")
        @Pattern(regexp = "^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$", message = "El primer nombre solo acepta letras")
        String primerNombre,

        @Pattern(regexp = "^[A-Za-zÁÉÍÓÚáéíóúñÑ]*$", message = "El segundo nombre solo acepta letras")
        String segundoNombre,

        @NotBlank(message = "El primer apellido es obligatorio")
        @Pattern(regexp = "^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$", message = "El primer apellido solo acepta letras")
        String primerApellido,

        @Pattern(regexp = "^[A-Za-zÁÉÍÓÚáéíóúñÑ]*$", message = "El segundo apellido solo acepta letras")
        String segundoApellido,

        String direccion,

        @NotBlank(message = "El teléfono es obligatorio")
        @Pattern(regexp = "^[0-9]+$", message = "El teléfono solo acepta números")
        String telefono,

        @NotBlank(message = "El email es obligatorio")
        @Email(message = "Formato de email inválido")
        String email,

        String ocupacion,

        @NotNull(message = "La fecha de nacimiento es obligatoria")
        @Past(message = "La fecha de nacimiento debe ser en el pasado")
        LocalDate fechaNacimiento


        ) {
}
