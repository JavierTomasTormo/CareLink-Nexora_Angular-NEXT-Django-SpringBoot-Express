from django.urls import path
from .views import MealList, MealDetail

urlpatterns = [
    path('food/meals/', MealList.as_view(), name='meal-list'),
    path('food/meals/<int:pk>/', MealDetail.as_view(), name='meal-detail'),
]
