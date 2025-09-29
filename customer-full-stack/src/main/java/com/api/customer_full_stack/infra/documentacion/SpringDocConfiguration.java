package com.api.customer_full_stack.infra.documentacion;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringDocConfiguration {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("bearer-key",
                                new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")))
                .info(new Info()
                        .title("Voll.med API")
                        .description("Api rest para un crud de clientes (customers) con autenticacion usando JWT ")
                        .contact(new Contact()
                                .name("Joan")
                                .email("customer@prueba.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://prueba/api/licencia")));
    }
}
