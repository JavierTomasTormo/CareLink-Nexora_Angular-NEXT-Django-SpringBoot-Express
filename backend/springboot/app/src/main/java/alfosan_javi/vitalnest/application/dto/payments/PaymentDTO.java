package alfosan_javi.vitalnest.application.dto.payments;

import alfosan_javi.vitalnest.domain.models.payments.Payment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {
    private Long id;
    private Long idInscription;
    private String email;
    private String cardNumber;
    private String cardDate;
    private String ccv;
    private String state;
    private Long idUser;
    private String paymentMethod;
    private String transactionReference;
    private BigDecimal price;
    private Integer isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public PaymentDTO(Payment payment) {
        this.id = payment.getId();
        this.idInscription = payment.getIdInscription();
        this.email = payment.getEmail();
        this.cardNumber = payment.getCardNumber();
        this.cardDate = payment.getCardDate();
        this.ccv = payment.getCcv();
        this.state = payment.getState();
        this.idUser = payment.getIdUser();
        this.paymentMethod = payment.getPaymentMethod();
        this.transactionReference = payment.getTransactionReference();
        this.price = payment.getPrice();
        this.isActive = payment.getIsActive();
        this.createdAt = payment.getCreatedAt();
        this.updatedAt = payment.getUpdatedAt();
    }
}