from rest_framework import serializers
from .models import Dayofweek

class DayofweekSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dayofweek
        fields = '__all__'