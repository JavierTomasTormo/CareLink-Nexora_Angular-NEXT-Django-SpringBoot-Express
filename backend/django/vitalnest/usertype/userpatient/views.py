from rest_framework import generics
from .models import UserPatient
from .serializers import UserPatientSerializer
from .filters import UserPatientFilter
from django_filters.rest_framework import DjangoFilterBackend

class UserPatientList(generics.ListCreateAPIView):
    queryset = UserPatient.objects.all()
    serializer_class = UserPatientSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserPatientFilter

class UserPatientDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserPatient.objects.all()
    serializer_class = UserPatientSerializer
