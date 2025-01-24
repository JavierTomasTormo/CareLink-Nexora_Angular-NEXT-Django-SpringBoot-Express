from rest_framework import serializers
from .models import ImagesRooms

class ImagesRoomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagesRooms
        fields = '__all__'