from django.urls import path
from .views import BedRoomList, BedRoomDetail

urlpatterns = [
    path('rooms/bedroom/', BedRoomList.as_view(), name='bedroom-list'),
    path('rooms/bedroom/<int:pk>/', BedRoomDetail.as_view(), name='bedroom-detail'),
]