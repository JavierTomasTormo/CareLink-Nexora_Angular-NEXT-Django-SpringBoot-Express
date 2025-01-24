from django.urls import path
from .views import DayList, DayDetail

urlpatterns = [
    path('timetables/day/', DayList.as_view(), name='day-list'),
    path('timetables/day/<int:pk>/', DayDetail.as_view(), name='day-detail'),
]