package com.api.customer_full_stack.domain.customer.dto;

import com.api.customer_full_stack.domain.customer.Customer;
import com.api.customer_full_stack.domain.customer.TipoIdentificacion;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;

public record ResponseCustomerDTO(
        Long id,

        String identificacion,


        TipoIdentificacion tipoIdentificacion,


        String primerNombre,

        String segundoNombre,


        String primerApellido,


        String segundoApellido,

        String direccion,


        String telefono,


        String email,

        String ocupacion,


        LocalDate fechaNacimiento,

        String foto
) {
    public ResponseCustomerDTO(Customer customer) {
        this(customer.getId(), customer.getIdentificacion(), customer.getTipoIdentificacion(), customer.getPrimerNombre(),
                customer.getSegundoNombre(), customer.getPrimerApellido(), customer.getSegundoApellido(), customer.getDireccion(),
                customer.getTelefono(), customer.getEmail(), customer.getOcupacion(), customer.getFechaNacimiento(), customer.getFoto());
    }


}
