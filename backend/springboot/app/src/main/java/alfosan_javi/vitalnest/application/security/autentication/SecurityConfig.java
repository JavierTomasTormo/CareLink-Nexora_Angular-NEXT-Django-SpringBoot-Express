package alfosan_javi.vitalnest.application.security;

import alfosan_javi.vitalnest.application.security.jwt.JwtAuthenticationFilter;
import alfosan_javi.vitalnest.application.security.jwt.JwtUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtUtils jwtUtils;

    public SecurityConfig(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Deshabilita CSRF (usamos JWT)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // JWT sin estado
            .authorizeRequests(auth -> auth
                .requestMatchers("/payments/**").permitAll() // Pagos sin autenticación
                .requestMatchers("/inscriptions/create").authenticated() // Inscripciones requieren autenticación
                .anyRequest().authenticated() // Cualquier otra petición también requiere autenticación
            )
            .addFilterBefore(new JwtAuthenticationFilter(jwtUtils), UsernamePasswordAuthenticationFilter.class); // Filtro JWT

        return http.build();
    }

}
