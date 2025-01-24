from django.urls import path
from .views import MonthList, MonthDetail

urlpatterns = [
    path('timetables/month/', MonthList.as_view(), name='month-list'),
    path('timetables/month/<int:pk>/', MonthDetail.as_view(), name='month-detail'),
]