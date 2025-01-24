from django.urls import path
from .views import ImagesRoomsList, ImagesRoomsDetail

urlpatterns = [
    path('images/imagesrooms/', ImagesRoomsList.as_view(), name='imagesrooms-list'),
    path('images/imagesrooms/<int:pk>/', ImagesRoomsDetail.as_view(), name='imagesrooms-detail'),
]