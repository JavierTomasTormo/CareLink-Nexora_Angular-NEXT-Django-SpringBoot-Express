package alfosan_javi.vitalnest.application.services.payments;

import alfosan_javi.vitalnest.application.dto.payments.PaymentDTO;

import java.util.List;
import java.util.Optional;

public interface PaymentService {
    List<PaymentDTO> getAllPayments();
    Optional<PaymentDTO> getPaymentById(Long id);
}