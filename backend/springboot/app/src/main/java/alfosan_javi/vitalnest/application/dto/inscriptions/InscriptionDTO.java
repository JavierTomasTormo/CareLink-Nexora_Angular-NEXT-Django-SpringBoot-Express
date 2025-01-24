package alfosan_javi.vitalnest.application.dto.inscriptions;

import alfosan_javi.vitalnest.domain.models.inscriptions.Inscription;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InscriptionDTO {
    private Long id;
    private Long idUser;
    private String email;
    private Long idActivity;
    private Long idHour;
    private Long idDay;
    private Long idMonth;
    private Long idYear;
    private Long idPayment;
    private Long idPatient;
    private Integer isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String state;
    private String specialRequest;

    public InscriptionDTO(Inscription inscription) {
        this.id = inscription.getId();
        this.idUser = inscription.getIdUser();
        this.email = inscription.getEmail();
        this.idActivity = inscription.getIdActivity();
        this.idHour = inscription.getIdHour();
        this.idDay = inscription.getIdDay();
        this.idMonth = inscription.getIdMonth();
        this.idYear = inscription.getIdYear();
        this.idPayment = inscription.getIdPayment();
        this.idPatient = inscription.getIdPatient();
        this.isActive = inscription.getIsActive();
        this.createdAt = inscription.getCreatedAt();
        this.updatedAt = inscription.getUpdatedAt();
        this.state = inscription.getState();
        this.specialRequest = inscription.getSpecialRequest();
    }
}