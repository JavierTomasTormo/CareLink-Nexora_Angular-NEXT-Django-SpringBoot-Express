package alfosan_javi.vitalnest.presentation.assemblers;

import alfosan_javi.vitalnest.application.dto.ActivityDTO;
import alfosan_javi.vitalnest.domain.models.activities.Activity;
import org.springframework.stereotype.Component;

@Component
public class ActivityAssembler {

    public ActivityDTO toModel(Activity activity) {
        return new ActivityDTO(
            activity.getId(),
            activity.getNameActivitie(),
            activity.getDescription(),
            activity.getCapacity(),
            activity.getDuration()
        );
    }

    public Activity toEntity(ActivityDTO activityDTO) {
        Activity activity = new Activity();
        activity.setId(activityDTO.getId());
        activity.setNameActivitie(activityDTO.getNameActivitie());
        activity.setDescription(activityDTO.getDescription());
        activity.setCapacity(activityDTO.getCapacity());
        activity.setDuration(activityDTO.getDuration());
        return activity;
    }
}
