package alfosan_javi.vitalnest.application.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${security.jwt.token.secret-key}")
    private String jwtSecret;

    private Key secretKey;

    @PostConstruct
    public void init() {
        try {
            if (jwtSecret == null || jwtSecret.trim().isEmpty()) {
                throw new IllegalArgumentException("La clave secreta no está definida.");
            }

            // Inicializa la clave secreta desde el valor de la propiedad
            this.secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
            logger.info("Clave secreta inicializada correctamente.", jwtSecret);
        } catch (Exception e) {
            logger.error("Error al inicializar la clave secreta: {}", e.getMessage());
            throw new RuntimeException("Error al inicializar la clave secreta.", e);
        }
    }

    // Extraer el ID del usuario desde el JWT
    public Long getUserIdFromJwtToken(String token) {
        try {
            if (token == null || token.trim().isEmpty()) {
                throw new IllegalArgumentException("Token JWT es nulo o vacío");
            }

            token = token.trim();
            if (token.split("\\.").length != 3) {
                throw new MalformedJwtException("Token JWT no tiene un formato válido");
            }

            logger.info("Token procesado correctamente: {}", token);  // Log para verificar token

            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            if (claims.getExpiration().before(new Date())) {
                throw new ExpiredJwtException(null, claims, "El token ha expirado");
            }

            // Cambiar el tipo de conversión a Integer
            return claims.get("id_user", Integer.class).longValue();  // Convertir de Integer a Long

        } catch (JwtException | IllegalArgumentException e) {
            logger.error("Error al procesar el JWT: {}", e.getMessage());
            throw new RuntimeException("Error al procesar el JWT: " + e.getMessage());
        }
    }

    // Extraer el rol del usuario desde el JWT
    public String getUserRoleFromToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.get("role", String.class);  // Extraer 'role'
        } catch (Exception e) {
            logger.error("Error al obtener el rol del token: {}", e.getMessage());
            return null;
        }
    }

    // Obtener el JWT desde la cabecera 'Authorization' en la solicitud
    public String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            String token = bearerToken.substring(7).trim();  // Eliminar el prefijo 'Bearer ' y limpiar cualquier espacio extra
            logger.info("Token recibido (sin prefijo Bearer): [{}]", token);  // Verificación detallada del token
            if (token.contains(" ")) {
                logger.error("El token contiene espacios extra, lo cual es inválido: [{}]", token);
                throw new RuntimeException("El token contiene espacios extra, lo cual es inválido");
            }
            return token;
        }
        return null;
    }



    // Extraer el email del usuario desde el JWT
   public String getUserEmailFromToken(String token) {
        try {
            String cleanedToken = token.replace("Bearer ", "").trim();  // Eliminar el prefijo 'Bearer ' y cualquier espacio adicional
            Claims claims = Jwts.parser()
                                .setSigningKey(secretKey)
                                .parseClaimsJws(cleanedToken)
                                .getBody();
            return claims.get("email", String.class);  // Obtener el email desde los claims
        } catch (Exception e) {
            logger.error("Error al obtener el email desde el token JWT", e);
            return null;
        }
    }

}
