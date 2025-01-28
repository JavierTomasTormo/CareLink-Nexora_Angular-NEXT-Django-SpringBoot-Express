package alfosan_javi.vitalnest.presentation.controllers_adapter_in.inscriptions;

import alfosan_javi.vitalnest.application.dto.inscriptions.InscriptionDTO;
import alfosan_javi.vitalnest.application.services_port_in.inscriptions.InscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/inscriptions")
public class InscriptionController {

    @Autowired
    private InscriptionService inscriptionService;

    @GetMapping
    public List<InscriptionDTO> getAllInscriptions() {
        return inscriptionService.getAllInscriptions();
    }

    @GetMapping("/{id}")
    public Optional<InscriptionDTO> getInscriptionById(@PathVariable Long id) {
        return inscriptionService.getInscriptionById(id);
    }
}