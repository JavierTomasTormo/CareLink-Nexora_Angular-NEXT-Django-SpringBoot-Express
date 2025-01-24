from rest_framework import serializers
from .models import ImagesActivities

class ImagesActivitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagesActivities
        fields = '__all__'