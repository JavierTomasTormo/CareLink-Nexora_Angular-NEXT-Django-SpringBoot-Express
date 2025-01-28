from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import ImagesRooms
from .serializers import ImagesRoomsSerializer
from .filters import ImagesRoomsFilter
from vitalnest.images.images.models import Images
from rest_framework.response import Response

class ImagesRoomsList(generics.ListCreateAPIView):
    queryset = ImagesRooms.objects.all()
    serializer_class = ImagesRoomsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ImagesRoomsFilter

    def get_queryset(self):
        queryset = super().get_queryset()
        id_room = self.request.query_params.get('id_room')
        if id_room:
            queryset = queryset.filter(id_room=id_room)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        images_rooms = queryset.values('id', 'createdat', 'updatedat', 'id_img', 'id_room')
        images = Images.objects.filter(id__in=queryset.values_list('id_img', flat=True))
        images_dict = {image.id: image.img for image in images}
        
        for image_room in images_rooms:
            image_room['img'] = images_dict.get(image_room['id_img'], None)
        
        return Response(images_rooms)

class ImagesRoomsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ImagesRooms.objects.all()
    serializer_class = ImagesRoomsSerializer