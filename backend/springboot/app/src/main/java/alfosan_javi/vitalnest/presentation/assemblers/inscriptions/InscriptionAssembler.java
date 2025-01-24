package alfosan_javi.vitalnest.presentation.assemblers.inscriptions;

import alfosan_javi.vitalnest.application.dto.inscriptions.InscriptionDTO;
import alfosan_javi.vitalnest.domain.models.inscriptions.Inscription;
import org.springframework.stereotype.Component;

@Component
public class InscriptionAssembler {

    public InscriptionDTO toModel(Inscription inscription) {
        return new InscriptionDTO(
            inscription.getId(),
            inscription.getIdUser(),
            inscription.getEmail(),
            inscription.getIdActivity(),
            inscription.getIdHour(),
            inscription.getIdDay(),
            inscription.getIdMonth(),
            inscription.getIdYear(),
            inscription.getIdPayment(),
            inscription.getIdPatient(),
            inscription.getIsActive(),
            inscription.getCreatedAt(),
            inscription.getUpdatedAt(),
            inscription.getState(),
            inscription.getSpecialRequest()
        );
    }

    public Inscription toEntity(InscriptionDTO inscriptionDTO) {
        Inscription inscription = new Inscription();
        inscription.setId(inscriptionDTO.getId());
        inscription.setIdUser(inscriptionDTO.getIdUser());
        inscription.setEmail(inscriptionDTO.getEmail());
        inscription.setIdActivity(inscriptionDTO.getIdActivity());
        inscription.setIdHour(inscriptionDTO.getIdHour());
        inscription.setIdDay(inscriptionDTO.getIdDay());
        inscription.setIdMonth(inscriptionDTO.getIdMonth());
        inscription.setIdYear(inscriptionDTO.getIdYear());
        inscription.setIdPayment(inscriptionDTO.getIdPayment());
        inscription.setIdPatient(inscriptionDTO.getIdPatient());
        inscription.setIsActive(inscriptionDTO.getIsActive());
        inscription.setCreatedAt(inscriptionDTO.getCreatedAt());
        inscription.setUpdatedAt(inscriptionDTO.getUpdatedAt());
        inscription.setState(inscriptionDTO.getState());
        inscription.setSpecialRequest(inscriptionDTO.getSpecialRequest());
        return inscription;
    }
}