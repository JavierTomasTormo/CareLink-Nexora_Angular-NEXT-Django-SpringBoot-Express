package alfosan_javi.vitalnest.application.services_port_in.user;

public interface UserService {
    boolean existsByEmail(String email);
    Long getUserIdByEmail(String email);
}
