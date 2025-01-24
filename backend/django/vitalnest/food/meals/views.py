from rest_framework import generics
from .models import Meals
from .serializers import MealSerializer
from rest_framework.response import Response

class MealList(generics.ListCreateAPIView):
    queryset = Meals.objects.all()
    serializer_class = MealSerializer

class MealDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Meals.objects.all()
    serializer_class = MealSerializer
    http_method_names = ['get', 'put', 'delete']
