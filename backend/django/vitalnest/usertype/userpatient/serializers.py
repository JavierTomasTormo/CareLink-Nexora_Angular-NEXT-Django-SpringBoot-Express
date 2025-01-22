from rest_framework import serializers
from .models import UserPatient

class UserPatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPatient
        fields = '__all__'
