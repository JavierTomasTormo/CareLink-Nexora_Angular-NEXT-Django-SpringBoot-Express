package alfosan_javi.vitalnest.domain.repos_port_out.user;

import alfosan_javi.vitalnest.domain.models.User;
import java.util.Optional;

public interface UserRepository {
    Optional<User> findByEmail(String email);
}
