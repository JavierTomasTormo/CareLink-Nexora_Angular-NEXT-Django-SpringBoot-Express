from django_filters import rest_framework as filters
from .models import Room

class RoomFilter(filters.FilterSet):
    class Meta:
        model = Room
        fields = {
            'type_room': ['exact', 'icontains'],
            'num_room': ['exact', 'gte', 'lte'],
            'availability': ['exact', 'icontains'],
        }