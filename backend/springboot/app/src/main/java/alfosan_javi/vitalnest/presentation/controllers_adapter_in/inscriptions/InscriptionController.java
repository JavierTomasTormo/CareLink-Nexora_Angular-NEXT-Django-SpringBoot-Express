package alfosan_javi.vitalnest.presentation.controllers_adapter_in.inscriptions;

import alfosan_javi.vitalnest.application.dto.inscriptions.InscriptionDTO;
import alfosan_javi.vitalnest.application.services_port_in.inscriptions.InscriptionService;
import alfosan_javi.vitalnest.application.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/inscriptions")
public class InscriptionController {

    @Autowired
    private InscriptionService inscriptionService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping
    public List<InscriptionDTO> getAllInscriptions() {
        return inscriptionService.getAllInscriptions();
    }

    @GetMapping("/{id}")
    public Optional<InscriptionDTO> getInscriptionById(@PathVariable Long id) {
        return inscriptionService.getInscriptionById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<InscriptionDTO> createInscription(@RequestHeader("Authorization") String token, @RequestBody InscriptionDTO inscriptionDTO) {
        try {
            // Eliminar el prefijo 'Bearer ' y cualquier espacio innecesario
            String cleanedToken = token.replace("Bearer ", "").trim();

            // Obtén el ID y el email desde el token JWT
            Long userId = jwtUtils.getUserIdFromJwtToken(cleanedToken);
            String email = jwtUtils.getUserEmailFromToken(cleanedToken); 

            // Si el token no tiene el ID o el email, arroja un error
            if (userId == null || email == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }

            // Establece el ID y el email en el DTO
            inscriptionDTO.setIdUser(userId);
            inscriptionDTO.setEmail(email);

            // Llama al servicio para crear la inscripción
            InscriptionDTO createdInscription = inscriptionService.createInscription(cleanedToken, inscriptionDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdInscription);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }

    @GetMapping("/user")
    public ResponseEntity<List<InscriptionDTO>> getInscriptionsByUser(@RequestHeader("Authorization") String token) {
        try {
            // Eliminar el prefijo 'Bearer ' y cualquier espacio innecesario
            String cleanedToken = token.replace("Bearer ", "").trim();

            // Obtén el ID del usuario desde el token JWT
            Long userId = jwtUtils.getUserIdFromJwtToken(cleanedToken);

            // Si el token no tiene el ID, arroja un error
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }

            // Llama al servicio para obtener las inscripciones del usuario
            List<InscriptionDTO> inscriptions = inscriptionService.getInscriptionsByUserId(userId);
            return ResponseEntity.ok(inscriptions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }
}