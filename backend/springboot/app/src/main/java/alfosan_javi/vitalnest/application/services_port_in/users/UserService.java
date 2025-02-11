package alfosan_javi.vitalnest.application.services_port_in.users;

import alfosan_javi.vitalnest.application.dto.users.UserDTO;
import java.util.List;
import java.util.Optional;

public interface UserService {
    List<UserDTO> getAllUsers();
    Optional<UserDTO> getUserById(Long id);
    UserDTO createUser(UserDTO userDTO);
    void deleteUser(Long id);
    boolean existsByEmail(String email);
    Long getUserIdByEmail(String email);
}
