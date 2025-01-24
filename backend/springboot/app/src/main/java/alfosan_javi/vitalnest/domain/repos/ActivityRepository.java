package alfosan_javi.vitalnest.domain.repos;

import alfosan_javi.vitalnest.domain.models.activities.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    // JpaRepository ya incluye métodos básicos como findAll()
    Optional<Activity> findById(Long id);
}