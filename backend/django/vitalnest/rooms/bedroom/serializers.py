from rest_framework import serializers
from .models import BedRoom

class BedRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = BedRoom
        fields = '__all__'