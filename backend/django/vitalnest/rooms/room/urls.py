from django.urls import path
from .views import RoomList, RoomDetail

urlpatterns = [
    path('rooms/room/', RoomList.as_view(), name='room-list'),
    path('rooms/room/<int:pk>/', RoomDetail.as_view(), name='room-detail'),
]