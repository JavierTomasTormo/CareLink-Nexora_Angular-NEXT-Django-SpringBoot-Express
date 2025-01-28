from django_filters import rest_framework as filters
from .models import ImagesRooms

class ImagesRoomsFilter(filters.FilterSet):
    id_room = filters.NumberFilter(field_name='id_room')

    class Meta:
        model = ImagesRooms
        fields = ['id_room']