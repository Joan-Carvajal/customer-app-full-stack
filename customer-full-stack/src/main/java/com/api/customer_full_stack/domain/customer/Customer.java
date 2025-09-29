package com.api.customer_full_stack.domain.customer;

import com.api.customer_full_stack.domain.customer.dto.CreateCustomerDTO;
import com.api.customer_full_stack.domain.customer.dto.UpdateCustomerDTO;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.Period;

@Table(name = "customer")
@Entity(name = "Customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String identificacion;
    @Enumerated(EnumType.STRING)
    private TipoIdentificacion tipoIdentificacion;

    private String primerNombre;
    private String segundoNombre;



    private String primerApellido;
    private String segundoApellido;

    private String direccion;

    private String telefono;

    private String email;

    private String ocupacion;

    private LocalDate fechaNacimiento;

    private String foto;

    public Customer() {
    }

    public Customer(Long id, String identificacion, TipoIdentificacion tipoIdentificacion, String primerNombre, String segundoNombre, String primerApellido, String segundoApellido, String direccion, String telefono, String email, String ocupacion, LocalDate fechaNacimiento, String foto) {
        this.id = id;
        this.identificacion = identificacion;
        this.tipoIdentificacion = tipoIdentificacion;
        this.primerNombre = primerNombre;
        this.segundoNombre = segundoNombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.ocupacion = ocupacion;
        this.fechaNacimiento = fechaNacimiento;
        this.foto = foto;
    }

    public Customer(CreateCustomerDTO datos) {

        this.identificacion = datos.identificacion();
        this.tipoIdentificacion = calcularTipo(datos.fechaNacimiento());
        this.primerNombre = datos.primerNombre();
        this.segundoNombre = datos.segundoNombre();
        this.primerApellido = datos.primerApellido();
        this.segundoApellido = datos.segundoApellido();
        this.direccion = datos.direccion();
        this.telefono = datos.telefono();
        this.email = datos.email();
        this.ocupacion = datos.ocupacion();
        this.fechaNacimiento = datos.fechaNacimiento();

    }

    public Long getId() {
        return id;
    }

    public String getIdentificacion() {
        return identificacion;
    }

    public TipoIdentificacion getTipoIdentificacion() {
        return tipoIdentificacion;
    }

    public String getPrimerNombre() {
        return primerNombre;
    }

    public String getSegundoNombre() {
        return segundoNombre;
    }

    public String getPrimerApellido() {
        return primerApellido;
    }

    public String getSegundoApellido() {
        return segundoApellido;
    }

    public String getDireccion() {
        return direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public String getEmail() {
        return email;
    }

    public String getOcupacion() {
        return ocupacion;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public String getFoto() {
        return foto;
    }
    public void setFoto(String foto) {
        this.foto = foto;
    }

    private TipoIdentificacion calcularTipo(LocalDate fechaNacimiento) {
        int edad = Period.between(fechaNacimiento, LocalDate.now()).getYears();

        if (edad < 7) return TipoIdentificacion.RC;
        else if (edad < 18) return TipoIdentificacion.TI;
        else return TipoIdentificacion.CC;
    }

    public void actualizarDatos(UpdateCustomerDTO datos) {
        if (datos.identificacion() != null) {
            this.identificacion = datos.identificacion();
        }

        if (datos.primerNombre() != null) {
            this.primerNombre = datos.primerNombre();
        }
        if (datos.segundoNombre() != null) {
            this.segundoNombre = datos.segundoNombre();
        }
        if (datos.primerApellido() != null) {
            this.primerApellido = datos.primerApellido();
        }
        if (datos.segundoApellido() != null) {
            this.segundoApellido = datos.segundoApellido();
        }
        if (datos.direccion() != null) {
            this.direccion = datos.direccion();
        }
        if (datos.telefono() != null) {
            this.telefono = datos.telefono();
        }
        if (datos.email() != null) {
            this.email = datos.email();
        }
        if (datos.ocupacion() != null) {
            this.ocupacion = datos.ocupacion();
        }
        if (datos.fechaNacimiento() != null) {
            this.fechaNacimiento = datos.fechaNacimiento();
        }

    }
}
