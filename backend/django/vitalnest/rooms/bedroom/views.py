from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import BedRoom
from .serializers import BedRoomSerializer
from .filters import BedRoomFilter

class BedRoomList(generics.ListCreateAPIView):
    queryset = BedRoom.objects.all()
    serializer_class = BedRoomSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = BedRoomFilter

class BedRoomDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BedRoom.objects.all()
    serializer_class = BedRoomSerializer