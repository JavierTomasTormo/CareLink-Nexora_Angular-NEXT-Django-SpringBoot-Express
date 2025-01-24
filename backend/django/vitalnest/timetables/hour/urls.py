from django.urls import path
from .views import HourList, HourDetail

urlpatterns = [
    path('timetables/hour/', HourList.as_view(), name='hour-list'),
    path('timetables/hour/<int:pk>/', HourDetail.as_view(), name='hour-detail'),
]