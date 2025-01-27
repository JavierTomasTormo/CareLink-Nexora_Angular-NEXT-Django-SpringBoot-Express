from django_filters import rest_framework as filters
from .models import Meals
from django.db.models import JSONField

class JSONContainsFilter(filters.CharFilter):
    def filter(self, qs, value):
        if not value:
            return qs
        return qs.filter(**{f"{self.field_name}__icontains": value})

class MealsFilter(filters.FilterSet):
    role = JSONContainsFilter(field_name='role')
    allergens = JSONContainsFilter(field_name='allergens')
    type_meal = JSONContainsFilter(field_name='type_meal')

    class Meta:
        model = Meals
        fields = {
            'name': ['exact', 'icontains'],
            'calories': ['exact', 'gte', 'lte'],
        }
        filter_overrides = {
            JSONField: {
                'filter_class': JSONContainsFilter,
            },
        }