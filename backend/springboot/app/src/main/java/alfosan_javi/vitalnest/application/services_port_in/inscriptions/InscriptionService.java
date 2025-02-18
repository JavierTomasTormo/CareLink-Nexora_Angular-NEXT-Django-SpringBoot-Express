package alfosan_javi.vitalnest.application.services_port_in.inscriptions;

import alfosan_javi.vitalnest.application.dto.inscriptions.InscriptionDTO;

import java.util.List;
import java.util.Optional;

public interface InscriptionService {
    List<InscriptionDTO> getAllInscriptions();
    Optional<InscriptionDTO> getInscriptionById(Long id);
    InscriptionDTO createInscription(String token, InscriptionDTO inscriptionDTO);
    List<InscriptionDTO> getInscriptionsByUserId(Long userId);
}