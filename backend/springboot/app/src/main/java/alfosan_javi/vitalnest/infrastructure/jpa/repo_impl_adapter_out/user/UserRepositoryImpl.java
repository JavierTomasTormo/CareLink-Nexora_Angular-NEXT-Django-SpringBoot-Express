package alfosan_javi.vitalnest.infrastructure.jpa.repo_impl_adapter_out.user;

import alfosan_javi.vitalnest.domain.models.User;
import alfosan_javi.vitalnest.domain.repos_port_out.user.UserRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepositoryImpl extends JpaRepository<User, Long>, UserRepository {
    Optional<User> findByEmail(String email);
}
