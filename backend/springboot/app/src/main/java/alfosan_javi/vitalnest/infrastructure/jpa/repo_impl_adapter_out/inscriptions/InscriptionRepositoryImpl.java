package alfosan_javi.vitalnest.infrastructure.jpa.repo_impl_adapter_out.inscriptions;

import alfosan_javi.vitalnest.domain.models.inscriptions.Inscription;
import alfosan_javi.vitalnest.domain.repos_port_out.inscriptions.InscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class InscriptionRepositoryImpl implements InscriptionRepository {

    @Autowired
    private JpaInscriptionRepository jpaInscriptionRepository;

    @Override
    public List<Inscription> findAll() {
        return jpaInscriptionRepository.findAll();
    }

    @Override
    public Optional<Inscription> findById(Long id) {
        return jpaInscriptionRepository.findById(id);
    }

    @Override
    public Inscription save(Inscription inscription) {
        return jpaInscriptionRepository.save(inscription);
    }

    @Override
    public void deleteById(Long id) {
        jpaInscriptionRepository.deleteById(id);
    }
}