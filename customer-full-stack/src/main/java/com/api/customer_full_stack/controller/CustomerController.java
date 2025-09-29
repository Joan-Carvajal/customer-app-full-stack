package com.api.customer_full_stack.controller;

import com.api.customer_full_stack.domain.customer.dto.CreateCustomerDTO;
import com.api.customer_full_stack.domain.customer.dto.ResponseCustomerDTO;
import com.api.customer_full_stack.domain.customer.dto.UpdateCustomerDTO;
import com.api.customer_full_stack.domain.customer.Customer;
import com.api.customer_full_stack.domain.customer.CustomerRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/customer")
@SecurityRequirement(name = "bearer-key")

public class CustomerController {

    private final CustomerRepository repository;

    public CustomerController(CustomerRepository repository) {
        this.repository = repository;
    }
    @GetMapping
    public Page<ResponseCustomerDTO> listar(@PageableDefault() Pageable pageable ){
        Page<Customer> customer = repository.findAll(pageable);
        return customer.map(ResponseCustomerDTO::new);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomer(@PathVariable Long id ){
        Customer customer = repository.findById(id).orElseThrow();
        return ResponseEntity.ok(customer);
    }

    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody @Valid CreateCustomerDTO datos){
        var customer = repository.save(new Customer(datos));
        return new ResponseEntity<>(customer, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<?> updateCustomer( @RequestBody @Valid UpdateCustomerDTO datos, @PathVariable Long id){
        try {
            Customer customer = repository.getReferenceById(id);
            customer.actualizarDatos(datos);
            return ResponseEntity.ok(new ResponseCustomerDTO(customer));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Cliente no encontrado");
        }
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deleteCustomer(@PathVariable Long id){
        Customer customer = repository.getReferenceById(id);
        repository.delete(customer);
        return  ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/{id}/foto", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> subirFoto(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) throws IOException {
        String uploadDir = "uploads/";
        Files.createDirectories(Paths.get(uploadDir));
        String fileName = UUID.randomUUID() + "-" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);
        Files.write(filePath, file.getBytes());
        var customer = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        customer.setFoto(filePath.toString());
        repository.save(customer);

        return ResponseEntity.ok("Foto guardada en: " + filePath);
    }



}
