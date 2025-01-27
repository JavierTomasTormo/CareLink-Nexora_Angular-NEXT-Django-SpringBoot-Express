from django_filters import rest_framework as filters
from .models import Activity
from django.db.models import JSONField

class ActivityFilter(filters.FilterSet):
    caracteristics = filters.CharFilter(field_name='caracteristics', lookup_expr='icontains')

    class Meta:
        model = Activity
        fields = {
            'id_year': ['exact'],
            'id_month': ['exact'],
            'id_hour': ['exact'],
            'id_dayoftheweek': ['exact'],
            'id_day': ['exact'],
            'duration': ['exact', 'gte', 'lte'],
            'price': ['exact', 'gte', 'lte'],
            'name_activitie': ['exact', 'icontains'],
        }
        filter_overrides = {
            JSONField: {
                'filter_class': filters.CharFilter,
            },
        }