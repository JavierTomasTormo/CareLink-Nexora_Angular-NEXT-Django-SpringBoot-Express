from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import ImagesActivities
from .serializers import ImagesActivitiesSerializer
from .filters import ImagesActivitiesFilter
from vitalnest.images.images.models import Images
from rest_framework.response import Response

class ImagesActivitiesList(generics.ListCreateAPIView):
    queryset = ImagesActivities.objects.all()
    serializer_class = ImagesActivitiesSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ImagesActivitiesFilter

    def get_queryset(self):
        queryset = super().get_queryset()
        id_activity = self.request.query_params.get('id_activity')
        if id_activity:
            queryset = queryset.filter(id_activity=id_activity)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        images_activities = queryset.values('id', 'createdat', 'updatedat', 'id_img', 'id_activity')
        images = Images.objects.filter(id__in=queryset.values_list('id_img', flat=True))
        images_dict = {image.id: image.img for image in images}
        
        for image_activity in images_activities:
            image_activity['img'] = images_dict.get(image_activity['id_img'], None)
        
        return Response(images_activities)

class ImagesActivitiesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ImagesActivities.objects.all()
    serializer_class = ImagesActivitiesSerializer