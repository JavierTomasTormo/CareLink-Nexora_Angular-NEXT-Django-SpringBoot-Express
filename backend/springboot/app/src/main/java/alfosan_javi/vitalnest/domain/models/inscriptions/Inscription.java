package alfosan_javi.vitalnest.domain.models.inscriptions;

import lombok.Data;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "inscriptions")
public class Inscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_user")
    private Long idUser;

    @Column(name = "email")
    private String email;

    @Column(name = "id_activity")
    private Long idActivity;

    @Column(name = "id_hour")
    private Long idHour;

    @Column(name = "id_day")
    private Long idDay;

    @Column(name = "id_month")
    private Long idMonth;

    @Column(name = "id_year")
    private Long idYear;

    @Column(name = "id_payment")
    private Long idPayment;

    @Column(name = "id_patient")
    private Long idPatient;

    @Column(name = "isactive")
    private Integer isActive;

    @Column(name = "createdat")
    private LocalDateTime createdAt;

    @Column(name = "updatedat")
    private LocalDateTime updatedAt;

    @Column(name = "state")
    private String state;

    @Column(name = "special_request")
    private String specialRequest;
}
