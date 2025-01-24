package alfosan_javi.vitalnest.application.services;

import alfosan_javi.vitalnest.application.dto.ActivityDTO;
import alfosan_javi.vitalnest.domain.models.activities.Activity;
import alfosan_javi.vitalnest.domain.repos.ActivityRepository;
import alfosan_javi.vitalnest.presentation.assemblers.ActivityAssembler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private ActivityAssembler activityAssembler;

    public List<ActivityDTO> getAllActivities() {
        return activityRepository.findAll().stream()
                .map(activityAssembler::toModel)
                .collect(Collectors.toList());
    }

    public Optional<ActivityDTO> getActivityById(Long id) {
        return activityRepository.findById(id)
                .map(activityAssembler::toModel);
    }
}