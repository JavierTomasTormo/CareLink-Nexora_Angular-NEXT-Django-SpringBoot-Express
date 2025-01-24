package alfosan_javi.vitalnest.presentation.controllers;

import alfosan_javi.vitalnest.application.dto.ActivityDTO;
import alfosan_javi.vitalnest.application.services.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/activities")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @GetMapping
    public List<ActivityDTO> getAllActivities() {
        return activityService.getAllActivities();
    }

    @GetMapping("/{id}")
    public Optional<ActivityDTO> getActivityById(@PathVariable Long id) {
        return activityService.getActivityById(id);
    }
}