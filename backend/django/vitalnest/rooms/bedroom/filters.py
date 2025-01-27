from django_filters import rest_framework as filters
from .models import BedRoom
from django.db.models import JSONField, Q

class JSONContainsFilter(filters.CharFilter):
    def filter(self, qs, value):
        if not value:
            return qs
        return qs.filter(Q(**{f"{self.field_name}__icontains": value}))

class BedRoomFilter(filters.FilterSet):
    special_features = JSONContainsFilter(field_name='special_features')

    class Meta:
        model = BedRoom
        fields = {
            'type_room': ['exact', 'icontains'],
            'num_room': ['exact', 'gte', 'lte'],
            'availability': ['exact', 'icontains'],
        }
        filter_overrides = {
            JSONField: {
                'filter_class': JSONContainsFilter,
            },
        }