from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import Room
from .serializers import RoomSerializer
from .filters import RoomFilter

class RoomList(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = RoomFilter

class RoomDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer