from django.urls import path
from .views import MealList, MealDetail

urlpatterns = [
    path('meals/', MealList.as_view(), name='meal-list'),
    path('meals/<int:pk>/', MealDetail.as_view(), name='meal-detail'),
]
