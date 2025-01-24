from rest_framework import generics
from .models import Hour
from .serializers import HourSerializer

class HourList(generics.ListCreateAPIView):
    queryset = Hour.objects.all()
    serializer_class = HourSerializer

class HourDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hour.objects.all()
    serializer_class = HourSerializer