from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserPatient
from .serializers import UserPatientSerializer

class UserPatientList(APIView):
    def get(self, request):
        patients = UserPatient.objects.all()
        serializer = UserPatientSerializer(patients, many=True)
        return Response(serializer.data)
