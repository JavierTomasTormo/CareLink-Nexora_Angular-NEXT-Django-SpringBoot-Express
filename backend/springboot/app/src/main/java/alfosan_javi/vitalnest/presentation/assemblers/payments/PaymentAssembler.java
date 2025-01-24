package alfosan_javi.vitalnest.presentation.assemblers.payments;

import alfosan_javi.vitalnest.application.dto.payments.PaymentDTO;
import alfosan_javi.vitalnest.domain.models.payments.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentAssembler {

    public PaymentDTO toModel(Payment payment) {
        return new PaymentDTO(
            payment.getId(),
            payment.getIdInscription(),
            payment.getEmail(),
            payment.getCardNumber(),
            payment.getCardDate(),
            payment.getCcv(),
            payment.getState(),
            payment.getIdUser(),
            payment.getPaymentMethod(),
            payment.getTransactionReference(),
            payment.getPrice(),
            payment.getIsActive(),
            payment.getCreatedAt(),
            payment.getUpdatedAt()
        );
    }

    public Payment toEntity(PaymentDTO paymentDTO) {
        Payment payment = new Payment();
        payment.setId(paymentDTO.getId());
        payment.setIdInscription(paymentDTO.getIdInscription());
        payment.setEmail(paymentDTO.getEmail());
        payment.setCardNumber(paymentDTO.getCardNumber());
        payment.setCardDate(paymentDTO.getCardDate());
        payment.setCcv(paymentDTO.getCcv());
        payment.setState(paymentDTO.getState());
        payment.setIdUser(paymentDTO.getIdUser());
        payment.setPaymentMethod(paymentDTO.getPaymentMethod());
        payment.setTransactionReference(paymentDTO.getTransactionReference());
        payment.setPrice(paymentDTO.getPrice());
        payment.setIsActive(paymentDTO.getIsActive());
        payment.setCreatedAt(paymentDTO.getCreatedAt());
        payment.setUpdatedAt(paymentDTO.getUpdatedAt());
        return payment;
    }
}