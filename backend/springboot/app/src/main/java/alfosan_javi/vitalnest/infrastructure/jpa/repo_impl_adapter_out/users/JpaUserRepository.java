package alfosan_javi.vitalnest.infrastructure.jpa.repo_impl_adapter_out.users;

import alfosan_javi.vitalnest.domain.models.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface JpaUserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);  
    boolean existsByEmail(String email); 
}
