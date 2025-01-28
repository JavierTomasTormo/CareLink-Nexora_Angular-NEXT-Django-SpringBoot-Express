package alfosan_javi.vitalnest.domain.repos_port_out.inscriptions;

import alfosan_javi.vitalnest.domain.models.inscriptions.Inscription;
import java.util.List;
import java.util.Optional;

public interface InscriptionRepository {
    List<Inscription> findAll();
    Optional<Inscription> findById(Long id);
    Inscription save(Inscription inscription);
    void deleteById(Long id);
}