from rest_framework import serializers
from vitalnest.rooms.room.models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'