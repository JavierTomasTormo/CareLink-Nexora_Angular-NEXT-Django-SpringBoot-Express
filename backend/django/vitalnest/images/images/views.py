from rest_framework import generics
from .models import Images
from .serializers import ImageSerializer

class ImageList(generics.ListCreateAPIView):
    queryset = Images.objects.all()
    serializer_class = ImageSerializer

class ImageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Images.objects.all()
    serializer_class = ImageSerializer
    http_method_names = ['get', 'put', 'delete']
