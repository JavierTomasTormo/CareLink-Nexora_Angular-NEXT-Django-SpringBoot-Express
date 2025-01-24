from rest_framework import generics
from .models import ImagesRooms
from .serializers import ImagesRoomsSerializer

class ImagesRoomsList(generics.ListCreateAPIView):
    queryset = ImagesRooms.objects.all()
    serializer_class = ImagesRoomsSerializer

class ImagesRoomsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ImagesRooms.objects.all()
    serializer_class = ImagesRoomsSerializer