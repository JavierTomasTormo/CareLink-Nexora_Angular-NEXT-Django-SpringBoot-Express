from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import Activity
from .serializers import ActivitySerializer
from .filters import ActivityFilter

class ActivityList(generics.ListCreateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ActivityFilter
    search_fields = ['name', 'description', 'tags__name']  # Definir los campos de busqueda y aut0ocomplete para el search

class ActivityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer