package alfosan_javi.vitalnest.application.service_impl.inscriptions;

import alfosan_javi.vitalnest.application.dto.inscriptions.InscriptionDTO;
import alfosan_javi.vitalnest.application.security.jwt.JwtUtils;
import alfosan_javi.vitalnest.application.services_port_in.inscriptions.InscriptionService;
import alfosan_javi.vitalnest.domain.models.inscriptions.Inscription;
import alfosan_javi.vitalnest.domain.repos_port_out.inscriptions.InscriptionRepository;
import alfosan_javi.vitalnest.presentation.assemblers.inscriptions.InscriptionAssembler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InscriptionServiceImpl implements InscriptionService {

    @Autowired
    private InscriptionRepository inscriptionRepository;

    @Autowired
    private InscriptionAssembler inscriptionAssembler;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public List<InscriptionDTO> getAllInscriptions() {
        return inscriptionRepository.findAll().stream()
                .map(inscriptionAssembler::toModel)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<InscriptionDTO> getInscriptionById(Long id) {
        return inscriptionRepository.findById(id)
                .map(inscriptionAssembler::toModel);
    }

    @Override
    public InscriptionDTO createInscription(String token, InscriptionDTO inscriptionDTO) {
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        String email = jwtUtils.getUserEmailFromToken(token);  // Obtener el email del token
        String role = jwtUtils.getUserRoleFromToken(token);

        if (userId == null) {
            throw new AccessDeniedException("El usuario no está autenticado.");
        }

        if (!"tutor".equals(role)) {
            throw new AccessDeniedException("El usuario no tiene permisos para crear inscripciones.");
        }

        // Crear la inscripción
        Inscription inscription = inscriptionAssembler.toEntity(inscriptionDTO);
        inscription.setIdUser(userId);  // Asignar el id del usuario desde el token
        inscription.setEmail(email);    // Asignar el email del usuario desde el token
        inscription.setCreatedAt(java.time.LocalDateTime.now());
        inscription.setUpdatedAt(java.time.LocalDateTime.now());
        inscription.setIsActive(1);     // Establecer que está activa

        // Guardar la inscripción en la base de datos
        Inscription savedInscription = inscriptionRepository.save(inscription);

        return inscriptionAssembler.toModel(savedInscription);
    }


}
