from django_filters import rest_framework as filters
from .models import ImagesActivities

class ImagesActivitiesFilter(filters.FilterSet):
    id_activity = filters.NumberFilter(field_name='id_activity')

    class Meta:
        model = ImagesActivities
        fields = ['id_activity']