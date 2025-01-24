package alfosan_javi.vitalnest.application.service_impl.inscriptions;

import alfosan_javi.vitalnest.application.dto.inscriptions.InscriptionDTO;
import alfosan_javi.vitalnest.application.services.inscriptions.InscriptionService;
import alfosan_javi.vitalnest.domain.models.inscriptions.Inscription;
import alfosan_javi.vitalnest.domain.repos.inscriptions.InscriptionRepository;
import alfosan_javi.vitalnest.presentation.assemblers.inscriptions.InscriptionAssembler;
import org.springframework.beans.factory.annotation.Autowired;
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
}