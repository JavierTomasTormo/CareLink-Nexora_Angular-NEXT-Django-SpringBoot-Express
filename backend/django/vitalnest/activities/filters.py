from django_filters import rest_framework as filters
from .models import Activity
from django.db.models import JSONField, Q

class JSONContainsFilter(filters.CharFilter):
    def filter(self, qs, value):
        if not value:
            return qs
        return qs.filter(Q(**{f"{self.field_name}__icontains": value}))

class ActivityFilter(filters.FilterSet):
    caracteristics = JSONContainsFilter(field_name='caracteristics')
    
    activity_type = filters.NumberFilter(field_name='activity_type')

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
            'activity_type': ['exact'],
        }
        filter_overrides = {
            JSONField: {
                'filter_class': JSONContainsFilter,
            },
        }
