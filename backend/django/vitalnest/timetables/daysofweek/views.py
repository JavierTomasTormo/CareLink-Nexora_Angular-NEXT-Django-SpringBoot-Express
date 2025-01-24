from rest_framework import generics
from .models import Dayofweek
from .serializers import DayofweekSerializer

class DayofweekList(generics.ListCreateAPIView):
    queryset = Dayofweek.objects.all()
    serializer_class = DayofweekSerializer

class DayofweekDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Dayofweek.objects.all()
    serializer_class = DayofweekSerializer