from rest_framework import generics
from .models import ImagesActivities
from .serializers import ImagesActivitiesSerializer

class ImagesActivitiesList(generics.ListCreateAPIView):
    queryset = ImagesActivities.objects.all()
    serializer_class = ImagesActivitiesSerializer

class ImagesActivitiesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ImagesActivities.objects.all()
    serializer_class = ImagesActivitiesSerializer