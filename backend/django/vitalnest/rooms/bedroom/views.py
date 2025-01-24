from rest_framework import generics
from .models import BedRoom
from .serializers import BedRoomSerializer

class BedRoomList(generics.ListCreateAPIView):
    queryset = BedRoom.objects.all()
    serializer_class = BedRoomSerializer

class BedRoomDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BedRoom.objects.all()
    serializer_class = BedRoomSerializer