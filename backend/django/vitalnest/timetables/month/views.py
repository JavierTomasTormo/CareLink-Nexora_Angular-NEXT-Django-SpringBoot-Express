from rest_framework import generics
from .models import Month
from .serializers import MonthSerializer

class MonthList(generics.ListCreateAPIView):
    queryset = Month.objects.all()
    serializer_class = MonthSerializer

class MonthDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Month.objects.all()
    serializer_class = MonthSerializer