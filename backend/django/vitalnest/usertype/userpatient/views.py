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

    def post(self, request):
        serializer = UserPatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserPatientDetail(APIView):
    def get_object(self, pk):
        try:
            return UserPatient.objects.get(pk=pk)
        except UserPatient.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        patient = self.get_object(pk)
        serializer = UserPatientSerializer(patient)
        return Response(serializer.data)

    def put(self, request, pk):
        patient = self.get_object(pk)
        serializer = UserPatientSerializer(patient, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        patient = self.get_object(pk)
        patient.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)