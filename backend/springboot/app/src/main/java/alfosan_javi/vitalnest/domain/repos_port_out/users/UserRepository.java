package alfosan_javi.vitalnest.domain.repos_port_out.users;

import alfosan_javi.vitalnest.domain.models.users.User;
import java.util.List;
import java.util.Optional;

public interface UserRepository {
    List<User> findAll();
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
    User save(User user);
    void deleteById(Long id);

    boolean existsByEmail(String email);
}
