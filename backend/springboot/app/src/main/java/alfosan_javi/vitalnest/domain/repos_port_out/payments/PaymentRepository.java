package alfosan_javi.vitalnest.domain.repos_port_out.payments;

import alfosan_javi.vitalnest.domain.models.payments.Payment;
import java.util.List;
import java.util.Optional;

public interface PaymentRepository {
    List<Payment> findAll();
    Optional<Payment> findById(Long id);
    Payment save(Payment payment);
    void deleteById(Long id);
}