package alfosan_javi.vitalnest.presentation.assemblers.users;

import alfosan_javi.vitalnest.application.dto.users.UserDTO;
import alfosan_javi.vitalnest.domain.models.users.User;
import org.springframework.stereotype.Component;

@Component
public class UserAssembler {
    public UserDTO toModel(User user) {
        return new UserDTO(
            user.getId(),
            user.getEmail(),
            user.getPassword(),
            user.getName(),
            user.getIsActive(),
            user.getCreatedAt(),
            user.getUpdatedAt(),
            user.getPhoneNumber(),
            user.getAddress(),
            user.getProfileImg()
        );
    }

    public User toEntity(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setName(userDTO.getName());
        user.setIsActive(userDTO.getIsActive());
        user.setCreatedAt(userDTO.getCreatedAt());
        user.setUpdatedAt(userDTO.getUpdatedAt());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setAddress(userDTO.getAddress());
        user.setProfileImg(userDTO.getProfileImg());
        return user;
    }
}