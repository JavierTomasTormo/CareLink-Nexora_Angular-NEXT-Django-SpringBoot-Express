package alfosan_javi.vitalnest.application.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    private final JwtUtils jwtUtils;

    public JwtAuthenticationFilter(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String token = jwtUtils.getJwtFromRequest(request);

        if (token != null) {
            try {
                Long userId = jwtUtils.getUserIdFromJwtToken(token);
                String role = jwtUtils.getUserRoleFromToken(token);
                String email = jwtUtils.getUserEmailFromToken(token);

                if (userId != null && role != null && email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    // Se crea el usuario con el email en lugar del ID
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    new User(email, "", Collections.singletonList(new SimpleGrantedAuthority(role))),
                                    null,
                                    Collections.singletonList(new SimpleGrantedAuthority(role))
                            );

                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    
                    
                    logger.info("Usuario autenticado con ID: {}, email: {} y rol: {}", userId, email, role);
                }
            } catch (Exception e) {
                logger.error("Error en la autenticación del token: {}", e.getMessage());
            }
        }
        chain.doFilter(request, response);
    }
}
