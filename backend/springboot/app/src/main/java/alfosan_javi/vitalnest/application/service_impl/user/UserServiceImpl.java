package alfosan_javi.vitalnest.application.service_impl.user;

import alfosan_javi.vitalnest.application.services_port_in.user.UserService;
import alfosan_javi.vitalnest.domain.models.User;
import alfosan_javi.vitalnest.domain.repos_port_out.user.UserRepository;  // Verifica que exista este paquete
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    public Long getUserIdByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(User::getId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
}
