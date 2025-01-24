from django.urls import path
from .views import ImagesActivitiesList, ImagesActivitiesDetail

urlpatterns = [
    path('images/imagesactivities/', ImagesActivitiesList.as_view(), name='imagesactivities-list'),
    path('images/imagesactivities/<int:pk>/', ImagesActivitiesDetail.as_view(), name='imagesactivities-detail'),
]