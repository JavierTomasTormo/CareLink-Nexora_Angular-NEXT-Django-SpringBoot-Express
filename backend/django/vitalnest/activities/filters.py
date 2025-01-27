from django_filters import rest_framework as filters
from .models import Activity
from django.db.models import JSONField

class ActivityFilter(filters.FilterSet):
    class Meta:
        model = Activity
        fields = {
            'id_year': ['exact'],
            'id_month': ['exact'],
            'id_hour': ['exact'],
            'id_dayoftheweek': ['exact'],
            'id_day': ['exact'],
            'duration': ['exact', 'gte', 'lte'],
            'caracteristics': ['exact', 'contains'],
            'price': ['exact', 'gte', 'lte'],
            'name_activitie': ['exact', 'icontains'],
        }
        filter_overrides = {
            JSONField: {
                'filter_class': filters.CharFilter,
            },
        }