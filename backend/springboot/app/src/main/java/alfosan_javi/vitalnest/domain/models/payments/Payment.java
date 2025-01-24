package alfosan_javi.vitalnest.domain.models.payments;

import lombok.Data;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_inscription")
    private Long idInscription;

    @Column(name = "email")
    private String email;

    @Column(name = "card_number")
    private String cardNumber;

    @Column(name = "card_date")
    private String cardDate;

    @Column(name = "ccv")
    private String ccv;

    @Column(name = "state")
    private String state;

    @Column(name = "id_user")
    private Long idUser;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "transaction_reference")
    private String transactionReference;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "isactive")
    private Integer isActive;

    @Column(name = "createdat")
    private LocalDateTime createdAt;

    @Column(name = "updatedat")
    private LocalDateTime updatedAt;
}