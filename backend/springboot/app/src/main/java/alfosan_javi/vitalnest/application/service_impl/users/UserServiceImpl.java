package alfosan_javi.vitalnest.application.service_impl.users;

import alfosan_javi.vitalnest.application.dto.users.UserDTO;
import alfosan_javi.vitalnest.application.services_port_in.users.UserService;
import alfosan_javi.vitalnest.domain.models.users.User;
import alfosan_javi.vitalnest.domain.repos_port_out.users.UserRepository;
import alfosan_javi.vitalnest.presentation.assemblers.users.UserAssembler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserAssembler userAssembler;

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userAssembler::toModel)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id)
                .map(userAssembler::toModel);
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = userAssembler.toEntity(userDTO);
        User savedUser = userRepository.save(user);
        return userAssembler.toModel(savedUser);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public Long getUserIdByEmail(String email) {
        return userRepository.findByEmail(email)
            .map(User::getId)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
