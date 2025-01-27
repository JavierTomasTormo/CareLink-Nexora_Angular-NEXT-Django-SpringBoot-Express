from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import Meals
from .serializers import MealSerializer
from .filters import MealsFilter

class MealList(generics.ListCreateAPIView):
    queryset = Meals.objects.all()
    serializer_class = MealSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = MealsFilter

class MealDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Meals.objects.all()
    serializer_class = MealSerializer