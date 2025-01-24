package alfosan_javi.vitalnest.application.dto;

import alfosan_javi.vitalnest.domain.models.activities.Activity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityDTO {
    private Long id;
    private String nameActivitie;
    private String description;
    private Integer capacity;
    private Integer duration;

    public ActivityDTO(Activity activity) {
        this.id = activity.getId();
        this.nameActivitie = activity.getNameActivitie();
        this.description = activity.getDescription();
        this.capacity = activity.getCapacity();
        this.duration = activity.getDuration();
    }
}
