package alfosan_javi.vitalnest.application.security;

import alfosan_javi.vitalnest.application.security.jwt.JwtAuthenticationFilter;
import alfosan_javi.vitalnest.application.security.jwt.JwtUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);
    private final JwtUtils jwtUtils;

    public SecurityConfig(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        logger.info("Configurando seguridad con CORS deshabilitado");
        return http
            .csrf(csrf -> {
                csrf.disable();
                logger.debug("CSRF deshabilitado");
            })
            .cors(cors -> {
                cors.disable();
                logger.debug("CORS deshabilitado - Todas las peticiones serán permitidas");
            })
            .sessionManagement(session -> {
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                logger.debug("Gestión de sesiones configurada como STATELESS");
            })
            .authorizeHttpRequests(auth -> {
                auth.anyRequest().permitAll();
                logger.debug("Todas las peticiones HTTP están permitidas");
            })
            .addFilterBefore(new JwtAuthenticationFilter(jwtUtils), 
                UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     private final JwtUtils jwtUtils;

//     public SecurityConfig(JwtUtils jwtUtils) {
//         this.jwtUtils = jwtUtils;
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf(csrf -> csrf.disable())
//             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//             .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .authorizeRequests(auth -> auth
//                 .requestMatchers("/inscriptions/user").authenticated()
//                 .requestMatchers("/inscriptions/create").authenticated()
//                 .requestMatchers("/inscriptions/**").permitAll()
//                 .anyRequest().permitAll()
//             )
//             .addFilterBefore(new JwtAuthenticationFilter(jwtUtils), UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
//         configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//         configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
//         configuration.setAllowCredentials(true);
        
//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", configuration);
//         return source;
//     }
// }
