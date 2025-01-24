package alfosan_javi.vitalnest.domain.repos.inscriptions;

import alfosan_javi.vitalnest.domain.models.inscriptions.Inscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InscriptionRepository extends JpaRepository<Inscription, Long> {
    Optional<Inscription> findById(Long id);
}