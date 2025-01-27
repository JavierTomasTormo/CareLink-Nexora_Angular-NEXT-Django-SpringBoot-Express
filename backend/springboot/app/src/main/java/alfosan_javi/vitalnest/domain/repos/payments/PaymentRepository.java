package alfosan_javi.vitalnest.domain.repos.payments;

import alfosan_javi.vitalnest.domain.models.payments.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // Puedes agregar métodos personalizados aquí si lo necesitas.
}