from django_filters import rest_framework as filters
from .models import Meals
from django.db.models import JSONField

class MealsFilter(filters.FilterSet):
    role = filters.CharFilter(field_name='role', lookup_expr='icontains')
    allergens = filters.CharFilter(field_name='allergens', lookup_expr='icontains')
    type_meal = filters.CharFilter(field_name='type_meal', lookup_expr='icontains')

    class Meta:
        model = Meals
        fields = {
            'name': ['exact', 'icontains'],
            'calories': ['exact', 'gte', 'lte'],
        }
        filter_overrides = {
            JSONField: {
                'filter_class': filters.CharFilter,
            },
        }