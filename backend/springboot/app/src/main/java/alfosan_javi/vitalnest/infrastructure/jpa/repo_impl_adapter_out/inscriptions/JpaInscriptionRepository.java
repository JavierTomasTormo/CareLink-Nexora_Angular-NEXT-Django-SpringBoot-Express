package alfosan_javi.vitalnest.infrastructure.jpa.repo_impl_adapter_out.inscriptions;

import alfosan_javi.vitalnest.domain.models.inscriptions.Inscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaInscriptionRepository extends JpaRepository<Inscription, Long> {
    List<Inscription> findByIdUser(Long idUser);
}